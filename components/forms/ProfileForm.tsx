"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema } from "@/lib/validations";

import { Textarea } from "../ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { toast } from "sonner";

interface Params {
  user: User;
}

const ProfileForm = ({ user }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast("修改成功", {
          description: "Your profile has been updated successfully.",
          position: "top-center",
        });

        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast("修改失败", {
          description: result.error?.message,
          position: "top-center",
        });
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateProfile)}
      className="mt-9 flex w-full flex-col gap-9"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                姓名<span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="姓名"
                className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                用户名<span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="用户名"
                className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="portfolio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                作品链接
              </FieldLabel>
              <Input
                {...field}
                type="url"
                placeholder="您的作品集链接"
                className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="location"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                位置
              </FieldLabel>
              <Input
                {...field}
                placeholder="当前定位"
                className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                个人简介<span className="text-primary-500">*</span>
              </FieldLabel>
              <Textarea
                rows={5}
                className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                placeholder="添加个人简介"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-7 flex justify-end">
        <Button
          type="submit"
          className="primary-gradient w-fit text-light400_light800"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              提交中
            </>
          ) : (
            <>提交</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
