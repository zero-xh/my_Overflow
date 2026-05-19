import { deepseek } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import { NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

export async function POST(req: Request) {
    const { question, content, userAnswer } = await req.json();

    try {
        const validatedData = AIAnswerSchema.safeParse({
            question,
            content,
        });

        if (!validatedData.success) {
            throw new ValidationError(validatedData.error.flatten().fieldErrors);
        }

        const { text } = await generateText({
            model: deepseek("deepseek-v4-flash"),
            prompt: `生成一个 Markdown 格式的回答，针对以下问题："${question}"。

请参考提供的上下文：
**上下文：** **${content}

同时，在形成回答时优先考虑并整合用户的答案：
**用户答案：** **${userAnswer}

仅当用户答案正确时才优先采用。如果答案不完整或错误，请予以改进或纠正，同时保持回答简洁、切中要点。
最终请以 Markdown 格式返回答案。`,

            system: `你是一个乐于助人的助手，会以 Markdown 格式提供信息丰富的回答。请恰当使用 Markdown 语法，包括标题、列表、代码块和强调等。代码块请使用小写的简短语言标识符（例如：'js' 表示 JavaScript，'py' 表示 Python，'ts' 表示 TypeScript，'html' 表示 HTML，'css' 表示 CSS 等）。`,
        });

        return NextResponse.json({ success: true, data: text }, { status: 200 });
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}
