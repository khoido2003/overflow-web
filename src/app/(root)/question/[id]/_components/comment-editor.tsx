import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  AnswerQuestionPayload,
  AnswerQuestionValidator,
} from "@/lib/schemas/form";
import { AnswerQuestionParams } from "@/types/question.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export const CommentEditor = () => {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef(null);

  const form = useForm<AnswerQuestionPayload>({
    resolver: zodResolver(AnswerQuestionValidator),
    defaultValues: {
      content: "",
    },
  });

  const {} = useMutation({
    mutationFn: async ({ content }: AnswerQuestionParams) => {},
  });

  const handleSubmitForm = () => {};

  return (
    <div className="mt-9 flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2">
        <h3 className="text-lg font-semibold">Write your answer here</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Quality answers help everyone! Please be specific and thorough in your
          response.
        </p>
      </div>

      <form>
        <Form {...form}>
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
                        resolvedTheme === "dark" ? "dark" : "default",
                      height: 450,
                      menubar: true,
                      elementpath: false,
                    }}
                    initialValue=""
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                  />
                </FormItem>
              );
            }}
          />
        </Form>
      </form>
    </div>
  );
};
