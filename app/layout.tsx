import type { Metadata } from "next";
import { Noto_Sans_SC, JetBrains_Mono, Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/context/Theme";
import { cn } from "@/lib/utils";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ReactNode } from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// 配置中文字体：Noto Sans SC
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"], // 注意：Noto Sans SC 默认包含中文，这里保留 latin 以防万一
  weight: ["400", "500", "700"], // 指定需要的字重
});

// 配置代码字体：JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "编程问答社区 - Stack Overflow 风格技术问答平台",
  description:
    "Stack Overflow 风格编程技术问答社区，为开发者提供提问、回答、技术交流服务，覆盖前端、后端、算法、全栈开发等领域。",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html
      lang="zh-CN"
      className={cn(
        "h-full",
        "antialiased",
        notoSansSC.variable,
        jetbrainsMono.variable,
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <SessionProvider session={session}>
        <body className="min-h-full flex flex-col">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
