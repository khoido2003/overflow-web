"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AnswerQuestionParams } from "@/types/question.types";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnswerQuestionPayload,
  AnswerQuestionValidator,
} from "@/lib/schemas/form";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CommentEditorProps {
  questionId: string | number;
}

export const CommentEditor = ({ questionId }: CommentEditorProps) => {
  const queryClient = useQueryClient();

  const { resolvedTheme } = useTheme();
  const editorRef = useRef(null);
  const session = useSession();

  const form = useForm<AnswerQuestionPayload>({
    resolver: zodResolver(AnswerQuestionValidator),
    defaultValues: {
      content: "",
    },
  });

  const { mutate: answerQuestion, isPending } = useMutation({
    mutationFn: async ({
      content,
      author,
      questionId,
    }: AnswerQuestionParams) => {
      const response = await fetch(`${API_REQUEST_PREFIX}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
        body: JSON.stringify({
          content,
          author,
          questionId,
        }),
      });

      const data = await response.json();

      return data;
    },

    onError: () => {
      toast.error("There is something wrong when create your answer!", {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["answer-list", questionId],
      });

      // form.setValue("content", "");
      form.resetField("content");
      form.clearErrors("content");

      // Clear the TinyMCE editor content
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent("");
      }

      toast.success("Successfully create answer!", {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    },
  });

  const onSubmit = ({ content }: AnswerQuestionParams) => {
    if (!session.data?.user) {
      toast.error("Please login to answer questions!", {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      return;
    }
    const data: AnswerQuestionParams = {
      content,
      author: session.data?.user.id,
      questionId,
    };

    answerQuestion(data);
  };

  return (
    <div className="mt-9 flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2">
        <h3 className="text-lg font-semibold">Write your answer here</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Quality answers help everyone! Please be specific and thorough in your
          response.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-3"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem>
                  <Editor
                    apiKey="572slfg7yk94tvprugt23fjzx1w4pxo38fa8clbmvra6krux"
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
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
                    initialValue=""
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                  />

                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />

          <Button disabled={isPending} className="self-end">
            Create new answer
          </Button>
        </form>
      </Form>
    </div>
  );
};
