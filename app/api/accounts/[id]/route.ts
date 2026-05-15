import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return new NotFoundError("Account");
    }
    try {
        await dbConnect();
        const account = await Account.findById(id);
        if (!account) return new NotFoundError("Account");
        return NextResponse.json({ success: true, data: account }, { status: 200 });
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
        const account = await Account.findByIdAndDelete(id);
        if (!account) return new NotFoundError("Account");
        return NextResponse.json({ success: true, data: account }, { status: 204 });
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
        const validatedData = AccountSchema.partial().safeParse(body);
        if (!validatedData.success) {
            throw new ValidationError(validatedData.error.flatten().fieldErrors);
        }
        const updateAccount = await Account.findByIdAndUpdate(id, validatedData.success ? validatedData.data : body, { new: true });
        if (!updateAccount) return new NotFoundError("Account");
        return NextResponse.json({ success: true, data: updateAccount }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}
