"use server";
import { prisma } from "@/prisma";
// import { verifyToken } from "./auth";
import { cookies } from "next/headers";
import { svgXmlToDataUrl, dataUrlToSvgXml, dataUrlToView } from "./svgToData";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

export const getTags = async (query = '') => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const errorData = {
    success: false,
    message: '用户信息已失效，请重新登录',
    data: [],
  }
  if (!token) return errorData;

  try {
    // const payload = await verifyToken(token);
    // if (!payload) return errorData;
    const tags = await prisma.tag.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            }
          },
          {
            tagId: {
              contains: query,
            }
          }
        ]
      },
    });
    return {
      success: true,
      data: tags.map(tag => {
        return {
          key: tag.tagId,
          tagId: tag.tagId,
          name: tag.name,
          tagCode: tag.code ? dataUrlToSvgXml(tag.code) : '',
          tagImg: tag.code ? dataUrlToView(tag.code) : '',
          count: 0,
          // isByMe: tag.creatorId === payload.payload.userId ? true : false,
          createdAt: tag.createdAt.toLocaleString(),
        }
      })
    };
  } catch {
    return errorData;
  }
}

interface CreateTagsProps {
  tagName: string;
  tagCode?: string;
  tagId: string;
}

interface CreateTagData {
  tagId: string;
  name: string;
  code?: string;
  creatorId: string;
}

const TagDataSchema = z.object({
  title: z.string(),
  describe: z.string(),
  tags: z.string(),
  content: z.string(),
})

export const createTag = async (formData: FormData) => {

  try {
    const session = await auth();
    // const payload = await verifyToken(token);
    // if (!payload) return errorData;

    const tag = await prisma.tag.findFirst({
      where: {
        tagId,
      },
    });

    if (tag) return {
      success: false,
      message: '标签ID已存在',
    }

    // const createTagData: CreateTagData = {
    //   tagId,
    //   name: tagName,
    //   creatorId: payload.payload.userId as string,
    // }
    // if (tagCode) {
    //   createTagData.code = svgXmlToDataUrl(tagCode);
    // }
    // await prisma.tag.create({
    //   data: createTagData,
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
}


export const updateTag = async (formData: FormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const errorData = {
    success: false,
    message: '用户信息已失效，请重新登录',
  }
  if (!token) return errorData;

  try {
    // const payload = await verifyToken(token);
    // if (!payload) return errorData;

    // const tag = await prisma.tag.findFirst({
    //   where: {
    //     tagId,
    //   },
    // });

    // if (!tag) return {
    //   success: false,
    //   message: '标签不存在',
    // }

    // if (tag.creatorId !== payload.payload.userId) return {
    //   success: false,
    //   message: '你没有权限编辑该标签',
    // }

    // const updateTagData: UpdateTagData = {
    //   name: tagName,
    // }

    // if (tagCode) {
    //   updateTagData.code = svgXmlToDataUrl(tagCode);
    // }

    // await prisma.tag.update({
    //   where: {
    //     tagId,
    //   },
    //   data: updateTagData,
    // });
    revalidatePath('admin/tag');
    return {
      success: true,
      message: '编辑成功',
    };
  } catch {
    return {
      success: false,
      message: '编辑错误'
    }
  }
}

export const deleteTag = async ({ tagId }: { tagId: string }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const errorData = {
    success: false,
    message: '用户信息已失效，请重新登录',
  }
  if (!token) return errorData;

  try {
    // const payload = await verifyToken(token);
    // if (!payload) return errorData;

    // const tag = await prisma.tag.findFirst({
    //   where: {
    //     tagId,
    //   },
    // });

    // if (!tag) return {
    //   success: false,
    //   message: '标签不存在',
    // }

    // if (tag.creatorId !== payload.payload.userId) return {
    //   success: false,
    //   message: '你没有权限删除该标签',
    // }

    // await prisma.tag.delete({
    //   where: {
    //     tagId,
    //   },
    // });
    // revalidatePath('admin/tag');
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