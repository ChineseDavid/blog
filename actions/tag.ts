"use server";
import { prisma } from "@/prisma";
import { svgXmlToDataUrl, dataUrlToSvgXml, dataUrlToView } from "./svgToData";
import { handleMessageError } from "@/utils";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";


export const getTags = async (query = '') => {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return {
        success: false,
        message: '用户信息已失效，请重新登录',
        data: [],
      }
    }
    const tags = await prisma.tag.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            }
          },
        ]
      },
    });
    return {
      success: true,
      data: tags.map(tag => {
        return {
          key: tag.id,
          id: tag.id,
          name: tag.name,
          code: tag.code ? dataUrlToSvgXml(tag.code) : '',
          tagImg: tag.code ? dataUrlToView(tag.code) : '',
          count: 0,
          isByMe: tag.userId === session.user?.id ? true : false,
          createdAt: tag.createdAt.toLocaleString(),
        }
      })
    };
  } catch (err: unknown) {
    return handleMessageError(err);
  }
}


const CreateTagDataSchema = z.object({
  name: z.string().min(1, '标签名不能为空'),
  code: z.string(),
})

export const createTag = async (formData: FormData) => {
  const name = formData.get('name');
  const code = formData.get('code');
  const res = CreateTagDataSchema.safeParse({
    name,
    code,
  })
  if (!res.success) {
    return {
      errors: res.error?.flatten().fieldErrors,
    }
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      message: '用户信息已失效，请重新登录',
    }
  }
  try {
    await prisma.tag.create({
      data: {
        name: res.data.name,
        code: res.data.code ? svgXmlToDataUrl(res.data.code) : '',
        userId: session.user.id!,
      }
    })
    revalidatePath('admin/tag');
  } catch (err: unknown) {
    return handleMessageError(err);
  }
  return {
    success: true,
    message: '创建成功',
  };
}

const UpdateTagDataSchema = z.object({
  name: z.string().min(1, '标签名不能为空'),
  code: z.string(),
  id: z.string(),
})

export const updateTag = async (formData: FormData) => {

  const name = formData.get('name');
  const code = formData.get('code');
  const id = formData.get('id');
  const res = UpdateTagDataSchema.safeParse({
    name,
    code,
    id,
  })
  if (!res.success) {
    return {
      success: false,
      message: res.error?.flatten().fieldErrors.name?.join(',') || '数据校验失败',
    }
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      message: '用户信息已失效，请重新登录',
    }
  }
  try {
    await prisma.tag.update({
      where: {
        id: res.data.id,
      },
      data: {
        name: res.data.name,
        code: res.data.code ? svgXmlToDataUrl(res.data.code) : undefined,
      }
    })
    revalidatePath('admin/tag');
  } catch (err: unknown) {
    return handleMessageError(err);
  }
  return {
    success: true,
    message: '更新成功',
  };
}

export const deleteTag = async (id: string) => {
  try {
    await prisma.tag.delete({
      where: {
        id,
      },
    });
    revalidatePath('admin/tag');
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