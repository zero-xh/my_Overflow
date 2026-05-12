import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import TagCard from "./TagCard";
import Metric from "../Metric";

interface Props {
  question: Question;
}
const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <div className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            <span>{getTimeStamp(createdAt)}</span>
          </div>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:hh3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag) => (
          <TagCard key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={`发布于${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />
        <div className="flex items-center gap-3 max-sm:flex-warp max-sm:justify-start">
          <Metric
            imgUrl="/icons/like.svg"
            alt="点赞"
            value={upvotes}
            title="点赞"
            textStyles="body-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="回复"
            value={answers}
            title="回复"
            textStyles="body-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/eye.svg"
            alt="浏览量"
            value={views}
            title="浏览量"
            textStyles="body-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
