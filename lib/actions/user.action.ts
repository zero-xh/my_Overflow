"use server"
import { QueryFilter } from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { PaginatedSearchSchema } from "../validations";
import { User } from "@/database";

export async function getUsers(
    params: PaginatedSearchParams
): Promise<ActionResponse<{ users: User[]; isNext: boolean; }>> {
    const validationReault = await action({
        params,
        schema: PaginatedSearchSchema
    })

    if (validationReault instanceof Error) {
        return handleError(validationReault) as ErrorResponse
    }

    const { page = 1, pageSize = 10, query, filter } = params
    const skip = (page - 1) * pageSize
    const limit = pageSize

    const filterQuery: QueryFilter<typeof User> = {}
    if (query) {
        filterQuery.$or = [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
        ]
    }

    let sortCriter = {}

    switch (filter) {
        case "newest":
            sortCriter = { createdAt: -1 }
            break;
        case "oldest":
            sortCriter = { createdAt: 1 }
            break;
        case "popular":
            sortCriter = { reputation: -1 }
            break;
        default:
            sortCriter = { createdAt: -1 }
            break;
    }

    try {
        const totalUsers = await User.countDocuments(filterQuery)
        const users = await User.find(filterQuery)
            .sort(sortCriter)
            .skip(skip)
            .limit(limit)
        const isNext = skip + limit < totalUsers
        return {
            success: true,
            data: { users: users, isNext }
        }
    } catch (error) {
        return handleError(error as Error) as ErrorResponse
    }
}