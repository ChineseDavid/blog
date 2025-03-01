"use server";
import { prisma } from "@/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getBlogs = async (query = '') => {
  return [];
  // const token = cookies().get('auth_token')?.value;
  // const errorData = {
  //   success: false,
  //   message: '用户信息已失效，请重新登录',
  //   data: [],
  // }
  // if (!token) return errorData;

  // try {
  //   const payload = await verifyToken(token);
  //   if (!payload) return errorData;
  //   const tags = await db.tag.findMany({
  //     where: {
  //       OR: [
  //         {
  //           name: {
  //             contains: query,
  //           }
  //         },
  //         {
  //           tagId: {
  //             contains: query,
  //           }
  //         }
  //       ]
  //     },
  //   });
  //   return {
  //     success: true,
  //     data: tags.map(tag => {
  //       return {
  //         key: tag.tagId,
  //         tagId: tag.tagId,
  //         name: tag.name,
  //         tagCode: tag.code ? dataUrlToSvgXml(tag.code) : '',
  //         tagImg: tag.code ? dataUrlToView(tag.code) : '',
  //         count: 0,
  //         isByMe: tag.creator === payload.payload.userId ? true : false,
  //         createdAt: tag.createdAt.toLocaleString(),
  //       }
  //     })
  //   };
  // } catch (error) {
  //   return errorData;
  // }
}

interface CreateTagsProps {
  tagName: string;
  tagCode?: string;
  tagId: string;
}

interface CreateBlogData {
  tagId: string;
  name: string;
  code?: string;
  creator: string;
}
const BlogDataSchema = z.object({
  title: z.string(),
  describe: z.string(),
  tags: z.string(),
  content: z.string(),
})

interface CreateBlogFormState {
  errors: {
    title?: string[];
    describe?: string[];
    _form?: string[];
  }
}
export const createBlog = async (prevState: CreateBlogFormState, formData: FormData) => {
  
  const title = formData.get('title');
  const tags = formData.get('tags');
  const describe = formData.get('describe');
  const content = formData.get('content');
  const res = BlogDataSchema.safeParse({
    title,
    tags,
    describe, 
    content,
  })
  if (!res.success) {
    return {
      errors: res.error.flatten().fieldErrors,
    };
  }
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const errorData = {
    errors: {
      _form: ["用户信息已失效，请重新登录"],
    },
  }
  if (!token) return errorData;

  try {
    // const payload = await verifyToken(token);
    // if (!payload) return errorData;

    // await db.blog.create({
    //   data: {
    //     title: res.data.title,
    //     describe: res.data.describe,
    //     content: res.data.content,
    //     createrId: payload.payload.userId,
    //     tags: {
    //       create: res.data.tags.split(',').map((tagId) => ({
    //         Tag: {
    //           connect: { tagId },
    //         },
    //       })),
    //     },
    //   },
    //   include: {
    //     tags: {
    //       include: {
    //         tag: true,
    //       },
    //     },
    //   },
    // });
    revalidatePath('admin/tag');
    return {
      success: true,
      message: '创建成功',
    };
  } catch {
    return {
      success: false,
      message: '创建错误'
    }
  }
  
  return {
    errors: {}
  }
}

interface UpdateBlogData {
  name: string;
  code?: string;
}

export const updateBlog = async ({ tagName, tagCode, tagId }: CreateTagsProps) => {
  // const token = cookies().get('auth_token')?.value;
  // const errorData = {
  //   success: false,
  //   message: '用户信息已失效，请重新登录',
  // }
  // if (!token) return errorData;

  // try {
  //   const payload = await verifyToken(token);
  //   if (!payload) return errorData;

  //   const tag = await db.tag.findFirst({
  //     where: {
  //       tagId,
  //     },
  //   });

  //   if (!tag) return {
  //     success: false,
  //     message: '标签不存在',
  //   }

  //   if (tag.creator !== payload.payload.userId) return {
  //     success: false,
  //     message: '你没有权限编辑该标签',
  //   }

  //   const updateTagData: UpdateTagData = {
  //     name: tagName,
  //   }

  //   if (tagCode) {
  //     updateTagData.code = svgXmlToDataUrl(tagCode);
  //   }

  //   await db.tag.update({
  //     where: {
  //       tagId,
  //     },
  //     data: updateTagData,
  //   });
  //   revalidatePath('admin/tag');
  //   return {
  //     success: true,
  //     message: '编辑成功',
  //   };
  // } catch {
  //   return {
  //     success: false,
  //     message: '编辑错误'
  //   }
  // }
}

export const deleteBlog = async ({ tagId }: { tagId: string }) => {
  // const token = cookies().get('auth_token')?.value;
  // const errorData = {
  //   success: false,
  //   message: '用户信息已失效，请重新登录',
  // }
  // if (!token) return errorData;

  // try {
  //   const payload = await verifyToken(token);
  //   if (!payload) return errorData;

  //   const tag = await db.tag.findFirst({
  //     where: {
  //       tagId,
  //     },
  //   });

  //   if (!tag) return {
  //     success: false,
  //     message: '标签不存在',
  //   }

  //   if (tag.creator !== payload.payload.userId) return {
  //     success: false,
  //     message: '你没有权限删除该标签',
  //   }

  //   await db.tag.delete({
  //     where: {
  //       tagId,
  //     },
  //   });
  //   revalidatePath('admin/tag');
  //   return {
  //     success: true,
  //     message: '删除成功',
  //   };
  // } catch {
  //   return {
  //     success: false,
  //     message: '删除失败'
  //   }
  // }
}