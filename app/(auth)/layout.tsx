import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Image from "next/image";
import { ReactNode } from "react";

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-auth-light
     bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark"
    >
      <section
        className="light-border background-light800_dark200 shadow-light100-dark100
       min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-130 sm:px-8"
      >
        <div className="flex items-center justify-center  gap-2">
          <Image
            src="images/site-logo.svg"
            alt="logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <div className="space-y-2 5">
            <h1 className="h2-bold text-dark200_light900">加入社区</h1>
            <p>问题，自有答案</p>
          </div>
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default Rootlayout;
