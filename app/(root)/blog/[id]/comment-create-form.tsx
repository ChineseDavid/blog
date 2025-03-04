"use client";

import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Chip, Textarea } from "@heroui/react";
import { createComment } from "@/actions";

interface CommentCreateFormProps {
  blogId: string;
  isOpen?: boolean
  parentId?: string
}
export default function CommentCreateForm({ blogId, isOpen, parentId }: CommentCreateFormProps) {
  const [open, setOpen] = useState(isOpen);
  const [state, formAction, isPending] = useActionState(
    createComment.bind(null, { blogId, parentId }),
    {
      message: ''
    }
  );
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => formAction(formData));
  }
  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);
  return (
    <div className="space-y-3 mt-3">
      <Button color="default" size="sm" variant="faded" onPress={() => {
        setOpen(!open)
      }}>
        回复
      </Button>
      {open && (
        <form
          className="space-y-3"
          onSubmit={handleSubmit}
          noValidate
          ref={formRef}
        >
          <Textarea
            name="content"
            labelPlacement="inside"
            placeholder="输入你的想法"
          />
          {!state.success && state.message ? (
            <Chip color="warning" className="max-w-full" variant="light">
              {state.message}
            </Chip>
          ) : null}
          <div className="text-right">
            <Button
              isLoading={isPending}
              type="submit"
              size="sm"
              color="primary"
            >
              发送
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
