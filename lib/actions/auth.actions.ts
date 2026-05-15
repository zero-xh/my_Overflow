"use server";
import mongoose from "mongoose";
import { ActionResponse, ErrorResponse } from "@/types/global";
import handleError from "../handlers/error";
import { SignUpSchema, SignInSchema } from "../validations";
import action from "../handlers/action";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { signIn } from "@/auth";
import { NotFoundError } from "../http-errors";

export async function signUpWithCredentials(
    params: AuthCredentials
): Promise<ActionResponse> {
    const validationResult = await action({
        params,
        schema: SignUpSchema,
    });
    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }
    const { name, username, email, password } = validationResult.params!;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const existingUser = await User.findOne({ email }).session(session)
        if (existingUser) {
            throw new Error("用户已注册")
        }
        const existingUsername = await User.findOne({ username }).session(session)
        if (existingUsername) {
            throw new Error("用户名已存在")
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const [newUser] = await User.create([{ name, username, email }], { session });
        await Account.create(
            [{
                userId: newUser._id,
                name,
                provider: "credentials",
                providerAccountId: email,
                password: hashedPassword,
            }],
            { session }
        )
        await session.commitTransaction();

        try {
            await signIn("credentials", { email, password, redirect: false });
        } catch (signInError) {
            return handleError(signInError) as ErrorResponse;
        }

        return { success: true };

    } catch (error) {
        await session.abortTransaction();
        return handleError(error) as ErrorResponse;
    } finally {
        await session.endSession();
    }
}

export async function signInWithCredentials(
    params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
    const validationResult = await action({
        params,
        schema: SignInSchema,
    });
    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }
    const { email, password } = validationResult.params!;

    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new NotFoundError("用户不存在")
        }

        const existingAccount = await Account.findOne({ providerAccountId: email })

        if (!existingAccount) {
            throw new NotFoundError("账号不存在")
        }

        const passwordMatch = await bcrypt.compare(password, existingAccount.password)
        if (!passwordMatch) {
            throw new Error("密码错误")
        }

        try {
            await signIn("credentials", { email, password, redirect: false });
        } catch (signInError) {
            return handleError(signInError) as ErrorResponse;
        }

        return { success: true };

    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}