"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { toast } from "sonner";

const SaveQuestion = ({
  questionId,
  hasSavedQuestionPromise,
}: {
  questionId: string;
  hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
}) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const { data } = use(hasSavedQuestionPromise);

  const { saved: hasSaved } = data || {};

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    if (!userId)
      return toast("登录提醒", {
        description: "请登录后再保存",
        position: "top-center",
      });

    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });

      if (!success) throw new Error(error?.message || "An error occurred");

      toast("操作成功", {
        description: `${data?.saved ? "已保存到收藏夹" : "已从收藏夹移除"}`,
        position: "top-center",
      });
    } catch (error) {
      toast("操作失败", {
        description: error instanceof Error ? error.message : "请稍后再试",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && "opacity-50"}`}
      aria-label="Save question"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
