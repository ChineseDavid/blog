"use server";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { handleMessageError } from "@/utils";
import { auth } from "@/auth";
import { dataUrlToView } from "./svgToData";

export const getBlogs = async (query = '') => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            }
          },
          {
            describe: {
              contains: query,
            }
          },
        ]
      },
      include: {
        tags: true,
        user: true,
      }
    });
    return {
      success: true,
      message: '获取成功',
      data: blogs.map(blog => {
        return {
          ...blog,
          tags: blog.tags.map(tag => {
            return {
              ...tag,
              tagImg: tag.code ? dataUrlToView(tag.code) : '',
            }
          }),
        }
      })
    };
  } catch (err: unknown) {
    return handleMessageError(err);
  }
}

export const revalidateBlog = async () => {
  revalidatePath(`blog`);
  revalidatePath(`admin/blog`);
}

export const getBlogById = async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
    include: {
      tags: true,
    }
  })
  return blog && {
    ...blog,
    tags: blog.tags.map(tag => {
      return {
        ...tag,
        tagImg: tag.code ? dataUrlToView(tag.code) : '',
      }
    }),
  }
}

const CreatedBlogDataSchema = z.object({
  title: z.string().min(3, "文章标题不能少于3个字符"),
  describe: z.string(),
  tags: z.string(),
  content: z.string().min(3, "文章内容不能少于3个字符"),
})

const UpdatedBlogDataSchema = CreatedBlogDataSchema.extend({
  id: z.string(),
})


export const createBlog = async (formData: FormData) => {

  const title = formData.get('title');
  // tagId用','拼接
  const tags = formData.get('tags');
  const describe = formData.get('describe');
  const content = formData.get('content');
  const res = CreatedBlogDataSchema.safeParse({
    title,
    tags,
    describe,
    content,
  })
  if (!res.success) {
    return {
      success: false,
      data: [],
      message: res.error.flatten().fieldErrors.title?.join(',') || res.error.flatten().fieldErrors.content?.join(',') || '数据校验失败',
    };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      data: [],
      message: '用户信息已失效，请重新登录',
    };
  }
  try {
    await prisma.blog.create({
      data: {
        title: res.data.title,
        content: res.data.content,
        describe: res.data.describe,
        userId: session.user.id!,
        tags: {
          ...(res.data.tags && {
            connect: res.data.tags.split(',').map(id => ({ id }))
          })
        }
      },
      include: {
        tags: true
      }
    })
    revalidateBlog();
    return {
      success: true,
      message: '创建成功',
    }
  } catch (error: unknown) {
    return handleMessageError(error);
  }
}

export const updateBlog = async (formData: FormData) => {
  const id = formData.get('id');
  const title = formData.get('title');
  // tagId用','拼接
  const tags = formData.get('tags') || '';
  const describe = formData.get('describe');
  const content = formData.get('content');
  const res = UpdatedBlogDataSchema.safeParse({
    id,
    title,
    tags,
    describe,
    content,
  })
  if (!res.success) {
    return {
      success: false,
      data: [],
      message: res.error.flatten().fieldErrors.title?.join(',') || res.error.flatten().fieldErrors.content?.join(',') || '数据校验失败',
    };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      data: [],
      message: '用户信息已失效，请重新登录',
    };
  }
  try {
    const existingBlog = await prisma.blog.findUnique({
      where: { id: res.data.id },
      include: { tags: true }
    });
    if (!existingBlog) {
      throw new Error('博客不存在');
    }
    await prisma.blog.update({
      where: { id: res.data.id },
      data: {
        title: res.data.title,
        content: res.data.content,
        describe: res.data.describe,
        tags: {
          set: res.data.tags
            .split(',')
            .filter(id => id.trim() !== '')
            .map(id => ({ id }))
        }
      },
      include: { tags: true }
    });
    revalidateBlog();
    return {
      success: true,
      message: '更新成功',
    }
  } catch (error: unknown) {
    return handleMessageError(error);
  }
}

export const deleteBlog = async (id: string) => {
  try {
    await prisma.blog.delete({
      where: {
        id,
      },
    });
    revalidateBlog();
    return {
      success: true,
      message: '删除成功',
    };
  } catch {
    return {
      success: false,
      message: '删除失败'
    }
  }
}