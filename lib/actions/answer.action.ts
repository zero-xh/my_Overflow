"use server";

import mongoose from "mongoose";
import action from "../handlers/action";
import { AnswerServerSchema, DeleteAnswerSchema, GetAnswersSchema } from "../validations";
import handleError from "../handlers/error";
import Answer, { IAnswerDoc } from "@/database/answer.model";
import { Question, Vote } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";
import { createInteraction } from "./interaction.action";
import { after } from "next/server";
import type { CreateAnswerParams, GetAnswersParams, DeleteAnswerParams } from "@/types/action";

export async function createAnswer(
    params: CreateAnswerParams
): Promise<ActionResponse<IAnswerDoc>> {
    const validationResult = await action({
        params,
        schema: AnswerServerSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    if (!validationResult.params) {
        return handleError(new Error("参数验证失败")) as ErrorResponse;
    }

    const { content, questionId } = validationResult.params;
    const userId = validationResult?.session?.user?.id;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            throw new Error("问题不存在");
        }
        const [newAnswer] = await Answer.create(
            [
                {
                    content,
                    author: userId,
                    question: questionId,
                },
            ],
            { session }
        );
        if (!newAnswer) {
            throw new Error("回答创建失败");
        }
        question.answers += 1;
        await question.save({ session });
        await session.commitTransaction();
        revalidatePath(ROUTES.QUESTION(questionId));
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newAnswer)),
        };
    } catch (error) {
        await session.abortTransaction();
        return handleError(error) as ErrorResponse;
    } finally {
        session.endSession();
    }
}

export async function getAnswers(params: GetAnswersParams): Promise<
    ActionResponse<{ answers: IAnswerDoc[]; isNext: boolean, totalAnswers: number }>
> {
    const validationResult = await action({
        params,
        schema: GetAnswersSchema,
    });
    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { questionId, page = 1, pageSize = 10, filter } = params;
    const skip = (Number(page) - 1) * pageSize;
    const limit = pageSize + 1;
    let sortCriteria = {};

    switch (filter) {
        case "latest":
            sortCriteria = { createdAt: -1 };
            break;
        case "oldest":
            sortCriteria = { createdAt: 1 };
            break;
        case "popular":
            sortCriteria = { upvotes: -1 };
            break;
        default:
            sortCriteria = { createdAt: -1 };
            break;


    }
    try {
        const totalAnswers = await Answer.countDocuments({ question: questionId });
        const answers = await Answer.find({ question: questionId })
            .populate("author", "_id name image")
            .sort(sortCriteria)
            .skip(skip)
            .limit(limit)
        const isNext = totalAnswers > skip + pageSize;
        return {
            success: true,
            data: {
                answers: JSON.parse(JSON.stringify(answers.slice(0, pageSize))),
                isNext,
                totalAnswers,
            },
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}

export async function deleteAnswer(
    params: DeleteAnswerParams
): Promise<ActionResponse> {
    const validationResult = await action({
        params,
        schema: DeleteAnswerSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { answerId } = validationResult.params!;
    const { user } = validationResult.session!;

    try {
        const answer = await Answer.findById(answerId);
        if (!answer) throw new Error("Answer not found");

        if (answer.author.toString() !== user?.id)
            throw new Error("You're not allowed to delete this answer");

        // reduce the question answers count
        await Question.findByIdAndUpdate(
            answer.question,
            { $inc: { answers: -1 } },
            { new: true }
        );

        // delete votes associated with answer
        await Vote.deleteMany({ actionId: answerId, actionType: "answer" });

        // delete the answer
        await Answer.findByIdAndDelete(answerId);

        // log the interaction
        after(async () => {
            await createInteraction({
                action: "delete",
                actionId: answerId,
                actionTarget: "answer",
                authorId: user?.id as string,
            });
        });

        revalidatePath(`/profile/${user?.id}`);

        return { success: true };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}