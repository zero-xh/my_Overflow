"use client";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { AnswerSchema } from "@/lib/validations";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";
import Image from "next/image";
import z from "zod";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

const Editor = dynamic(() => import("../editor"), {
  ssr: false,
});

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}
const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);

  const session = useSession();

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });
      if (result.success) {
        form.reset();
        toast("提交成功", {
          description: "回答发布成功",
          position: "top-center",
        });
        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast("提交失败", {
          description: "提交失败，请稍后重试",
          position: "top-center",
        });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast("登录提醒", {
        description: "请登录后使用",
        position: "top-center",
      });
    }
    setIsAISubmitting(true);
    const userAnswer = editorRef.current?.getMarkdown();
    try {
      const { success, data, error } = await api.ai.getAnswer(
        questionTitle,
        questionContent,
        userAnswer,
      );

      if (!success) {
        return toast("请求失败", {
          description: error?.message,
          position: "top-center",
        });
      }

      const formattedAnswer = data.replace(/<br>/g, "").toString().trim();

      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);
        form.setValue("content", formattedAnswer);
        form.trigger("content");
      }
      toast("请求成功", {
        description: "AI成功生成回答",
        position: "top-center",
      });
    } catch (error) {
      toast("错误提醒", {
        description: error instanceof Error ? error.message : "请求错误",
        position: "top-center",
      });
    } finally {
      setIsAISubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          写下你的回答
        </h4>
        <Button
          className="btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          disabled={isAISubmitting}
          onClick={generateAIAnswer}
        >
          {isAISubmitting ? (
            <>
              <RotateCw className="mr-2 size-4 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="AI"
                width={12}
                height={12}
                className="object-contain"
              />
              生成AI回答
            </>
          )}
        </Button>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-6 flex w-full flex-col gap-10"
      >
        <Controller
          // key={field}
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col gap-3"
            >
              <Editor
                editorRef={editorRef}
                value={field.value}
                fieldChange={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="primary-gradient w-fit">
            {isAnswering ? (
              <>
                <RotateCw className="mr-2 size-4 animate-spin" />
                提交中...
              </>
            ) : (
              "提交回答"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AnswerForm;
