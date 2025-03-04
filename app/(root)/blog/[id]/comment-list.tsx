import React from "react";
import CommentShow from "./comment-show";
import { fetchCommentsByblogId } from "@/actions";

interface CommentListProps {
  blogId: string;
}

export default async function CommentList({ blogId }: CommentListProps) {
  const comments = await fetchCommentsByblogId(blogId);
  const topLevelComments = comments.filter(comment => comment.parentId === null)
  return (
    <div className="space-y-3 pb-12 !mt-8">
      <h1 className="text-lg font-bold">共 {comments.length} 条评论</h1>
      {topLevelComments.map((comment) => (
        <CommentShow key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
