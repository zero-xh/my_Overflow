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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z, ZodType } from "zod";
import { Button } from "../ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const FIELD_LABELS: Record<string, string> = {
  email: "邮箱地址",
  password: "密码",
  username: "用户名",
  name: "姓名",
};

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {};

  const buttonText = formType === "SIGN_IN" ? "登录" : "注册";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      {buttonText}
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
            </Field>
          )}
        />
      ))}
      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900!"
      >
        {form.formState.isSubmitting
          ? formType === "SIGN_IN"
            ? "登录中..."
            : "注册中..."
          : buttonText}
      </Button>
      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.SIGN_UP}
            className="paragraph-semibold primary-text-gradient"
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          已经有账户?{" "}
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
