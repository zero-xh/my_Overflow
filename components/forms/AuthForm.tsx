"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "../ui/button";

const FIELD_LABELS: Record<string, string> = {
  email: "邮箱地址",
  password: "密码",
  username: "用户名",
  name: "姓名",
};

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const buttonText = formType === "SIGN_IN" ? "登录" : "注册";
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;
    if (result?.success) {
      toast(buttonText, {
        description: `${buttonText}成功`,
        position: "top-center",
      });
      router.push(ROUTES.HOME);
    } else {
      toast(buttonText, {
        description: result?.error?.message,
        position: "top-center",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      {/* {buttonText} */}
      {Object.keys(defaultValues).map((field) => (
        <Controller
          key={field}
          name={field as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col gap-2.5"
            >
              <FieldLabel htmlFor={field.name}>
                {FIELD_LABELS[field.name]}
              </FieldLabel>
              <Input
                required
                type={field.name === "password" ? "password" : "text"}
                {...field}
                className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}
      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        className="cursor-pointer primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900!"
      >
        {form.formState.isSubmitting
          ? formType === "SIGN_IN"
            ? "登录中..."
            : "注册中..."
          : buttonText}
      </Button>
      {formType === "SIGN_IN" ? (
        <p>
          没有账号?{" "}
          <Link
            href={ROUTES.SIGN_UP}
            className="paragraph-semibold primary-text-gradient"
          >
            注册
          </Link>
        </p>
      ) : (
        <p>
          已经有账号?{" "}
          <Link
            href={ROUTES.SIGN_IN}
            className="paragraph-semibold primary-text-gradient"
          >
            登录
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;