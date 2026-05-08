import ROUTES from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import TagCard from "../cards/TagCard";

const hotQuestions = [
  { _id: "1", title: "如何在 React 中自定义自定义钩子？" },
  { _id: "2", title: "React Query 怎么使用？" },
  { _id: "3", title: "Redux 状态管理使用教程" },
  { _id: "4", title: "React Router 路由配置详解" },
];

const popularTags = [
  { _id: "1", name: "react", questions: 100 },
  { _id: "2", name: "javascript", questions: 200 },
  { _id: "3", name: "typeScript", questions: 150 },
  { _id: "4", name: "nextjs", questions: 50 },
  { _id: "4", name: "react-query", questions: 75 },
];

const RightSidebar = () => {
  return (
    <section
      className="pt-6 custom-scrollbar 
    background-light900_dark200 light-border sticky right-0 
    top-0 flex h-screen w-87.5 flex-col gap-6 
    overflow-y-auto border-l p-6 shadow-light-300 
    dark:shadow-none max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">热门热议</h3>
        <div className="mt-7 flex w-full flex-col gap-7.5">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">热门话题标签</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, questions, name }) => (
            <TagCard
              key={_id}
              _id={_id}
              questions={questions}
              name={name}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
