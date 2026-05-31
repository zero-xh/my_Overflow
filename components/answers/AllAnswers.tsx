/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnswerFilters } from "@/constants/filters";
import { EMPTY_ANSWERS } from "@/constants/states";

import AnswerCard from "../cards/AnswerCard";
import DataRenderer from "../DataRenderer";
import CommonFilter from "../filters/CommonFilter";
import Pagination from "../Pagination";

interface Props extends ActionResponse<any> {
  page: number;
  isNext: boolean;
  totalAnswers: number;
}

const AllAnswers = ({
  page,
  isNext,
  data = [],
  success,
  error,
  totalAnswers,
}: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "回答" : "回答列表"}
        </h3>
        <CommonFilter
          filters={AnswerFilters}
          otherClasses="sm:min-w-32"
          containerClasses="max-xs:w-full"
        />
      </div>

      <DataRenderer
        data={data}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          answers.map((answer: any) => <AnswerCard key={answer._id} {...answer} />)
        }
      />

      {data?.length > 0 && <Pagination page={page} isNext={isNext} />}
    </div>
  );
};

export default AllAnswers;
