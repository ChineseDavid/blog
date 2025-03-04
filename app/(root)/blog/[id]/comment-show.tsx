import Image from "next/image";
import React from "react";
import CommentCreateForm from "./comment-create-form";
import { CommentWithUser, fetchCommentsByblogId } from "@/actions";
import { formatDate } from "@/utils";

export default async function CommentShow({
  comment,
}: {
  comment: CommentWithUser;
}) {
  // 从所有的评论列表中找！找谁的 parentId 等于当前的 comment.id，找到的那个谁就是儿子
  const comments = await fetchCommentsByblogId(comment.blogId);
  return (
    <div className={`border mt-2 p-4 rounded dark:border-purple-600 ${ comment.parentId !== null && 'border-dashed' }`}>
      <div className="flex gap-3">
        <Image
          src={comment.user.image || "/avatar.jpg"}
          alt="User Avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="flex justify-between items-center">
            <span className="flex-1 text-gray-900">{comment.content}</span>
            <span className="w-[150px] text-right text-gray-400 text-sm">
              {formatDate(comment.createdAt)}
            </span>
          </p>
          <CommentCreateForm blogId={comment.blogId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-12">
        {comments
          .filter((item) => item.parentId === comment.id)
          .map((comment) => {
            return <CommentShow key={comment.id} comment={comment} />;
          })}
      </div>
    </div>
  );
}
