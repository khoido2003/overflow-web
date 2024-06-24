"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import React, { useRef } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { useTheme } from "next-themes";

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
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Badge } from "./ui/badge";

export const EditorComponent = () => {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef(null);

  const form = useForm<AskQuestionPayload>({
    resolver: zodResolver(AskQuestionValiadator),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  // Handle submit form to the database
  const onSubmit = (values: AskQuestionPayload) => {
    console.log(values);
  };

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
      }

      // Handle the case when user type the same tag value twice or more, if the tag already exists then not save to the current tags list
      if (!field.value.includes(tagValue as never)) {
        form.setValue("tags", [...field.value, tagValue]);
        tagInput.value = "";
        form.clearErrors("tags");
      } else {
        form.trigger();
      }
    }
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
                        resolvedTheme === "dark" ? "dark" : "default",
                      height: 450,
                      menubar: true,
                      elementpath: false,
                    }}
                    initialValue="Write your question here..."
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
                      {...field}
                      placeholder="Add tags..."
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />

                    {/* {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 flex gap-2.5">
                        {field.value.map((tag: any) => {
                          return <Badge key={tag}>{tag}</Badge>;
                        })}
                      </div>
                    )} */}
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

        <Button className="rounded-lg py-6">
          Ask question <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};
