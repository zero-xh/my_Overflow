import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

//获取用户信息
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return new NotFoundError("User");
    }
    try {
        await dbConnect();
        const user = await User.findById(id);
        if (!user) return new NotFoundError("User");
        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return new NotFoundError("User");
    }
    try {
        await dbConnect();
        const user = await User.findByIdAndDelete(id);
        if (!user) return new NotFoundError("User");
        return NextResponse.json({ success: true, data: user }, { status: 204 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return new NotFoundError("User");
    }
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = UserSchema.partial().safeParse(body);
        const updateUser = await User.findByIdAndUpdate(id, validatedData.success ? validatedData.data : body, { new: true });
        if (!updateUser) return new NotFoundError("User");
        return NextResponse.json({ success: true, data: updateUser }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}
