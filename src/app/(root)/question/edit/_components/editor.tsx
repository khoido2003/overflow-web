"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { AskQuestionPayload, AskQuestionValiadator } from "@/lib/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { CreateQuestionParams, GetQuestion } from "@/types/question.types";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, X } from "lucide-react";
import { EditQuestionLoading } from "@/components/loading/edit-question-loading";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const EditorEdit = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { resolvedTheme } = useTheme();
  const editorRef = useRef(null);
  const session = useSession();
  const params = useParams<{ id: string }>();

  const {
    data: currentQuestion,
    isPending,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["edit-question", params.id],
    queryFn: async () => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/questions/${params.id}`,
      );

      const data = await response.json();
      return data.data as GetQuestion;
    },
    retry: 3,
    staleTime: 0,
  });

  // Store the state of the tags list
  const [tagsList, setTagsList] = useState<string[]>([]);

  // Since the data return fro the database have a weird format so we have reconstruct it to an array form
  useEffect(() => {
    if (currentQuestion) {
      setTagsList(currentQuestion.tagOnQuestion.map((tag) => tag.tag.name));
    }
  }, [currentQuestion]);

  // Edit question
  const { mutate: editQuestionFn, isPending: isEditing } = useMutation({
    mutationFn: async ({
      content,
      tags,
      title,
      author,
    }: CreateQuestionParams) => {
      const values = { content, tags, title, author };

      const response = await fetch(
        `${API_REQUEST_PREFIX}/questions/${params.id}`,
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

    retry: 3,

    onSuccess: () => {
      toast.success("Update question successfully!");
      router.push(`/profile`);
      queryClient.invalidateQueries({
        queryKey: ["edit-question", params.id],
      });
    },
    onError: () => {
      toast.error("Update question failed! Please try again later.");
    },
  });

  // Init the form
  const form = useForm<AskQuestionPayload>({
    resolver: zodResolver(AskQuestionValiadator),
    defaultValues: {
      title: currentQuestion?.title || "",
      content: currentQuestion?.content || "",
      tags: tagsList || [],
    },
  });

  // Make sure the form receives the correct data from the server
  useEffect(() => {
    form.reset({
      content: currentQuestion?.content,
      tags: tagsList,
      title: currentQuestion?.title,
    });
  }, [currentQuestion, form, tagsList]);

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        title: string;
        content: string;
        tags: string[];
      },
      "tags"
    >,
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;

      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }
      }

      // If the tags did not exist then save to the current tags list
      if (!field.value.includes(tagValue)) {
        form.setValue("tags", [...field.value, tagValue]);
        tagInput.value = "";
        form.clearErrors("tags");
      } else {
        // Trigger the validation to popp error message
        form.trigger();
      }
    }
  };

  // Delete the tags from the tags list
  const handleDeleteTag = (
    tag: string,
    field: ControllerRenderProps<
      {
        title: string;
        content: string;
        tags: string[];
      },
      "tags"
    >,
  ) => {
    const newTagList = field.value.filter((v: string) => tag !== v);

    form.setValue("tags", newTagList);
  };

  const onSubmit = (values: CreateQuestionParams) => {
    const data = { ...values, author: session.data?.user.id };

    editQuestionFn(data);
  };

  if (isLoading || isPending || isFetching) {
    return <EditQuestionLoading />;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>
                  Title <span className="text-primary">*</span>
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Your question's title"
                    className="rounded-lg dark:bg-[#222f3e] dark:placeholder:text-slate-200"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  {" "}
                  Be specific and imagine you&apos;re asking a question to
                  another person.
                </FormDescription>

                <FormMessage className="text-red-500" />
              </FormItem>
            );
          }}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Detailed explaination of your problem{" "}
                  <span className="text-primary">*</span>
                </FormLabel>

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
                    initialValue={currentQuestion?.content || ""}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormDescription>
                  {" "}
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            );
          }}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Tags <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      className="rounded-lg dark:bg-[#222F3E] dark:placeholder:text-slate-200"
                      placeholder="Add tags..."
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />

                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 flex gap-2.5">
                        {field.value.map((tag: any) => {
                          return (
                            <Badge key={tag}>
                              {tag}

                              <X
                                className="ml-1 h-4 w-4 cursor-pointer"
                                onClick={() => handleDeleteTag(tag, field)}
                              />
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </>
                </FormControl>
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
