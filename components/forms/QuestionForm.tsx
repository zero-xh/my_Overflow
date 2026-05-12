"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={form.handleSubmit(handleCreateQuestion)}
    >
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
            {/* Editor */}
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
                {...field}
                placeholder="添加标签"
                className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-14  border"
              />
              Tags
            </div>
            <FieldDescription className="body-regular mt-2.5 text-light-500">
              最多添加 3 个标签来描述你的问题，按回车键即可添加标签。
            </FieldDescription>
          </Field>
        )}
      />
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
