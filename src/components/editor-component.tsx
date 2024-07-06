"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect, useRef } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Editor } from "@tinymce/tinymce-react";

import { AskQuestionPayload, AskQuestionValiadator } from "@/lib/schemas/form";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { CreateQuestionParams } from "@/types/question.types";

import { Button } from "./ui/button";
import { Loader2, Send, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditorComponentProps {
  type: string;
}

export const EditorComponent = ({ type }: EditorComponentProps) => {
  // Create a ref to store the timeout ID so we an clear it later
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { resolvedTheme } = useTheme();
  const editorRef = useRef(null);

  const router = useRouter();

  // The current login user
  const session = useSession();

  // Declare form hook
  const form = useForm<AskQuestionPayload>({
    resolver: zodResolver(AskQuestionValiadator),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  // Handle submit form
  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: async ({
      content,
      tags,
      title,
      author,
    }: CreateQuestionParams) => {
      const values = { content, tags, title, author };

      const response = await fetch(`${API_REQUEST_PREFIX}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      return data;
    },

    onError: () => {
      toast.error("There is something wrong when create your question!", {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    },

    onSuccess: () => {
      toast.success("Successfully create question!", {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
            router.push("/");
          },
        },
      });

      // Set the timeout and store the ID in the ref
      redirectTimeoutRef.current = setTimeout(() => {
        router.push("/");
      }, 2000);
    },
  });

  //  function to clear the timeout if needed
  const clearRedirectTimeout = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }
  };

  // Clear the timeout function
  useEffect(() => {
    return () => {
      clearRedirectTimeout();
    };
  }, []);

  // Handle submit form to the database
  const onSubmit = (values: CreateQuestionParams) => {
    const data = { ...values, author: session.data?.user.id };

    submitForm(data);
  };

  // When user type Enter key then save the tag to the list and display it
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
    //Only in the tags field and using enter key
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      // If Tag value is longer than 15 characters then return error message
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }

        // Handle the case when user type the same tag value twice or more, if the tag already exists then not save to the current tags list
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        // Trigger the validation to popp error message
        form.trigger();
      }
    }
  };

  // Delete a single tag
  const handelDeleteTag = (
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
    const newTagsList = field.value.filter((v: string) => tag !== v);

    form.setValue("tags", newTagsList);
  };

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
                    className="rounded-lg dark:bg-[#222F3E] dark:placeholder:text-slate-200"
                    {...field}
                    placeholder="Your question's title"
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
                  Detailed explanation of your problem{" "}
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

        <FormField
          name="tags"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="">
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
                                onClick={() => handelDeleteTag(tag, field)}
                              />
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </>
                </FormControl>

                <FormDescription>
                  {" "}
                  Add up to 3 tags to describe what your question is about. You
                  need to press enter to add a tag.
                </FormDescription>

                <FormMessage className="text-red-500" />
              </FormItem>
            );
          }}
        />

        <Button disabled={isPending} className="rounded-lg py-6">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span className="flex items-center justify-center">
              Ask question <Send className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};
