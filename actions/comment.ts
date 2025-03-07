"use server";
import { prisma } from "@/prisma";
import type { Comment } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { handleMessageError } from "@/utils";

export type CommentWithUser = {
  user: {
    name: string | null;
    image: string | null;
  };
} & Comment;

export const fetchCommentsByblogId = async (blogId: string) => {
  return prisma.comment.findMany({
    where: {
      blogId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}

interface CreateCommentFormState {
  message?: string;
  success?: boolean
}

const createCommentSchema = z.object({
  content: z.string().min(2, '评论至少包含两个字符'),
});

export async function createComment(
  { blogId, parentId }: { blogId: string, parentId?: string },
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const content = formData.get("content");
  const result = createCommentSchema.safeParse({
    content,
  });
  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors.content?.[0] || "未知错误",
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      message: "登录后才能进行评论哦"
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id!,
        blogId,
        parentId
      },
    });
  } catch (err: unknown) {
    return handleMessageError(err);
  }
  const blog = await prisma.blog.findFirst({
    where: {
      id: blogId,
    },
  });
  if (!blog) {
    return {
      success: false,
      message: "查找博客失败",
    };
  }
  revalidatePath(``);
  return {
    success: true,
    message: "评论成功",
  };
}

export const getMyComment = async (query = '') => {
  const session = await auth();
  if (!session ||!session.user) {
    return {
      success: false,
      message: "未登录无法查询评论"
    };
  }
  
  const data = await prisma.comment.findMany({
    where: {
      userId: session.user.id,
      OR: [
        {
          content: {
            contains: query,
          }
        },
      ]
    },
    include: {
      user: true,
      blog: true,
    },
  });
  return {
    success: true,
    data,
  }
}

export const deleteComment = async (id: string) => {
  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
    revalidatePath('/admin/comment');
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