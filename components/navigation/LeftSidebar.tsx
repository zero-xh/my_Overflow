import React from "react";
import NavLinks from "./navbar/NavLinks";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import ROUTES from "@/constants/routes";

const LeftSidebar = () => {
  return (
    <section
      className="custom-scrollbar background-light900_dark200 
    light-border sticky left-0 top-0 flex h-screen flex-col justify-between 
    overflow-y-auto border-r p-6 pt-6 shadow-light-300 dark:shadow-none 
    max-sm:hidden lg:w-66.5"
    >
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          className="small-medium btn-secondary min-h-10.25 w-full rounded-lg 
                px-4 py-3 shadow-none"
          asChild
        >
          <Link href={ROUTES.SIGN_IN}>
            <Image
              src="/icons/account.svg"
              alt="Account"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="primary-text-gradient max-lg:hidden">登录</span>
          </Link>
        </Button>

        <Button
          className="small-medium light-border-2 btn-secondary 
                text-dark-400 min-h-10.25 w-full rounded-lg px-4 py-3 shadow-none"
        >
          <Link href={ROUTES.SIGN_UP}>
            <Image
              src="/icons/account.svg"
              alt="Account"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className=" max-lg:hidden">注册</span>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LeftSidebar;
