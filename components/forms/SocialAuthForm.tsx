"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark-200 light800 rounded-2 min-h-12 flex-1 px-4 py-3.5 cursor-pointer";

  const handeleSignIn = async (provider: "github" | "visitor") => {
    if (provider === "visitor") {
      // 跳转到首页
      window.location.href = ROUTES.HOME;
      return;
    }
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      toast("登录失败", {
        description: error instanceof Error ? error.message : "登录失败",
        position: "top-center",
      });
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handeleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span className="text-dark300_light700">Github 登录</span>
      </Button>
      <Button
        className={buttonClass}
        onClick={() => {
          handeleSignIn("visitor");
        }}
      >
        <Image
          src="/icons/avatar.svg"
          alt="Visitor Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span className="text-dark300_light700">游客模式</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
