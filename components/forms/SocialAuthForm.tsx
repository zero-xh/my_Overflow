"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark-200 light800 rounded-2 min-h-12 flex-1 px-4 py-3.5";

  const handeleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        // redirect: false,
      });
    } catch (error) {
      console.log(error);
      toast("登录失败", {
        description: error instanceof Error ? error.message : "登录过程有错误",
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
        <span>Github 登录</span>
      </Button>
      {/* <Button className={buttonClass}>
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className=" mr-2.5 object-contain"
        />
        <span>Google 登录</span>
      </Button> */}
    </div>
  );
};

export default SocialAuthForm;
