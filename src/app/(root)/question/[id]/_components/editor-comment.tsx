"use client";

import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { AnswerQuestionParams } from "@/types/question.types";
import { Loader2, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GetAllAnswers } from "@/types/answer-question";
import {
  AnswerQuestionPayload,
  AnswerQuestionValidator,
} from "@/lib/schemas/form";

interface EditorEditCommentProps {
  answer: GetAllAnswers;
  handleCloseModel: Dispatch<SetStateAction<boolean>>;
}

export const EditorEditComment = ({
  answer,
  handleCloseModel,
}: EditorEditCommentProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { resolvedTheme } = useTheme();
  const editorRef = useRef(null);
  const session = useSession();
  const params = useParams<{ id: string }>();

  // edit answer
  const { mutate: editAnswerFn, isPending: isEditing } = useMutation({
    mutationFn: async ({
      author,
      content,
      questionId,
    }: AnswerQuestionParams) => {
      const values = { content, questionId, author };

      const response = await fetch(
        `${API_REQUEST_PREFIX}/answers/${answer.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Edit comment successfully!");

      handleCloseModel(false);
      // after 1s, invalidate the cache
      setTimeout(() => {
        queryClient.invalidateQueries([
          "answer-list",
          params.id,
        ] as InvalidateQueryFilters);
      }, 1000);
    },
    onError: () => {
      toast.error("Edit comment failed!");
      handleCloseModel(false);
    },
  });

  const form = useForm<AnswerQuestionPayload>({
    resolver: zodResolver(AnswerQuestionValidator),
    defaultValues: {
      content: answer.content,
    },
  });

  useEffect(() => {
    form.reset({
      content: answer.content,
    });
  }, [answer.content, form]);

  const onSubmit = (values: AnswerQuestionParams) => {
    const data = {
      ...values,
      author: session.data?.user.id,
      questionId: params.id,
    };

    editAnswerFn(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormControl>
                  <Editor
                    apiKey="572slfg7yk94tvprugt23fjzx1w4pxo38fa8clbmvra6krux"
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    init={{
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],

                      skin: resolvedTheme === "dark" ? "oxide-dark" : "oxide",
                      content_css:
                        resolvedTheme === "dark" ? "tinymce-5-dark" : "default",
                      height: 450,
                      menubar: true,
                      elementpath: false,
                    }}
                    initialValue={answer.content || ""}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            );
          }}
        />

        <Button disabled={isEditing} className="rounded-lg py-6">
          {isEditing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span className="flex items-center justify-center">
              Edit Question <Send className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};
