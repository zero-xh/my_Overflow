import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import TagCard from "./TagCard";
import Metric from "../Metric";
import EditDeleteAction from "../user/EditDeleteAction";
import type { IQuestionDoc } from "@/database/question.model";

interface Props {
  question: IQuestionDoc;
  showActionBtns?: boolean;
}
const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
  showActionBtns = false,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div className="flex-1">
          <div className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            <span>{createdAt ? getTimeStamp(createdAt) : ""}</span>
          </div>
          <Link href={ROUTES.QUESTION(_id.toString())}>
            <h3 className="sm:hh3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {showActionBtns && <EditDeleteAction type="Question" itemId={_id.toString()} />}
      </div>
      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag) => {
          const tagId = typeof tag === 'object' && '_id' in tag ? tag._id : tag;
          const tagName = typeof tag === 'object' && 'name' in tag ? tag.name : '';
          return (
            <TagCard key={tagId.toString()} name={tagName} _id={tagId.toString()} compact={true} />
          );
        })}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={(typeof author === 'object' && 'image' in author ? author.image : '') || ''}
          alt={typeof author === 'object' && 'name' in author ? author.name : ''}
          value={typeof author === 'object' && 'name' in author ? author.name : ''}
          title={`发布于${createdAt ? getTimeStamp(createdAt) : ""}`}
          href={ROUTES.PROFILE(typeof author === 'object' && '_id' in author ? author._id.toString() : '')}
          textStyles="body-medium text-dark400_light700"
          isAuthor
          titleStyle="mx-sm:hidden"
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
