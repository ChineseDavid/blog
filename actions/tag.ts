"use server";
import { db } from "@/db";
import { verifyToken } from "./auth";
import { cookies } from "next/headers";

export const getTags = async () => {
  const token = cookies().get('auth_token')?.value;
  const errorData = {
    success: false,
    message: '用户信息已失效，请重新登录',
    data: [],
  }
  if (!token) return errorData;

  try {
    const payload = await verifyToken(token);
    if (!payload) return errorData;
    const tags = await db.tag.findMany();
    return {
      success: true,
      data: tags.map(tag => {
        return {
          key: tag.tagId,
          name: tag.name,
          tagCode: tag.code,
          count: 0,
          isByMe: tag.creator === payload.payload.userId ? true : false,
          createdAt: tag.createdAt.toLocaleString(),
        }
      })
    };
  } catch (error) {
    console.error(error);
    return errorData;
  }
}

interface createTagsProps {
  tagName: string;
  tagCode?: string;
  tagId: string;
}
export const createTag = async ({ tagName, tagCode, tagId }: createTagsProps) => {
  const token = cookies().get('auth_token')?.value;
  const errorData = {
    success: false,
    message: '用户信息已失效，请重新登录',
  }
  if (!token) return errorData;

  try {
    const payload = await verifyToken(token);
    if (!payload) return errorData;

    const tag = await db.tag.findFirst({
      where: {
        tagId,
      },
    });

    if (tag) return {
      success: false,
      message: '标签ID已存在',
    }
    console.log('ydw tag', tagId, tagName, tagCode, payload.payload.userId);
    await db.tag.create({
      data: {
        tagId,
        name: tagName,
        code: tagCode,
        creator: payload.payload.userId as string,
      },
    });
    return {
      success: true,
      message: '创建成功',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: '创建错误'
    }
  }
}