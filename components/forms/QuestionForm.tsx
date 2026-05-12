"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TagCard from "../cards/TagCard";

const Editor = dynamic(() => import("../editor"), {
  ssr: false,
});
const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = (data: z.infer<typeof QuestionForm>) => {
    console.log(data);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();
      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "标签应当小于15个字",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "标签已经存在",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);
    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "请输入标签",
      });
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={form.handleSubmit(handleCreateQuestion)}
    >
      <FieldGroup>
        <Controller
          //   key={}
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="flex w-full flex-col gap-2.5">
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                标题<span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-14  border"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                请描述得具体一些，向他人提问。
              </FieldDescription>
            </Field>
          )}
        />
        <Controller
          //   key={}
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="flex w-full flex-col gap-2.5">
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                详细描述你的问题<span className="text-primary-500">*</span>
              </FieldLabel>
              <Editor
                editorRef={editorRef}
                value={field.value}
                fieldChange={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                请介绍问题，并补充标题之外的细节。
              </FieldDescription>
            </Field>
          )}
        />
        <Controller
          //   key={}
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="flex w-full flex-col gap-3">
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                标签<span className="text-primary-500">*</span>
              </FieldLabel>
              <div>
                <Input
                  placeholder="添加标签"
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-14  border"
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                />
                {field.value.length > 0 && (
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {field.value.map((tag: string) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        isButton
                        handleRemove={() => handleTagRemove(tag, field)}
                      />
                    ))}
                  </div>
                )}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                最多添加 3 个标签来描述你的问题，按回车键即可添加标签。
              </FieldDescription>
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-16 flex justify-end">
        <Button
          type="submit"
          className="primary-gradient w-fit text-light-900!"
        >
          发布问题
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
