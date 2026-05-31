export interface SignInWithOAuthParams {
    provider: 'github',
    providerAccountId: string,
    user: {
        email: string,
        name: string,
        image: string
    }
}

export interface AuthCredentials {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface CreateQuestionParams {
    title: string;
    content: string;
    tags: string[];
}

export interface EditQuestionParams extends CreateQuestionParams {
    questionId: string;
}

export interface GetQuestionParams {
    questionId: string;
}

export interface GetTagQuestionsParams extends Omit<PaginatedSearchParams, "filter"> {
    tagId: string;
}

export interface IncrementViewsParams {
    questionId: string;
}

export interface CreateAnswerParams {
    questionId: string;
    content: string;
}

export interface CreateVoteParams {
    targetId: string;
    targetType: "question" | "answer";
    voteType: "upvote" | "downvote";
}

export interface UpdateVoteCountParams extends CreateVoteParams {
    change: 1 | -1;
}

export type HasVotedParams = Pick<CreateVoteParams, "targetId" | "targetType">;
export interface HasVotedResponse {
    hasUpvoted: boolean;
    hasDownvoted: boolean;
}

export interface CollectionBaseParams {
    questionId: string;
}

export interface GetUserParams {
    userId: string;
}

export interface GetUserQuestionsParams
    extends Omit<PaginatedSearchParams, "query | filter | sort"> {
    userId: string;
}

export interface GetUserAnswersParams extends PaginatedSearchParams {
    userId: string;
}

export interface GetAnswersParams extends Omit<PaginatedSearchParams, "query"> {
    questionId: string;
}

export interface GetUserTagsParams {
    userId: string;
}

export interface DeleteQuestionParams {
    questionId: string;
}

export interface DeleteAnswerParams {
    answerId: string;
}

export interface CreateInteractionParams {
    action:
    | "view"
    | "upvote"
    | "downvote"
    | "bookmark"
    | "post"
    | "edit"
    | "delete"
    | "search";
    actionId: string;
    authorId: string;
    actionTarget: "question" | "answer";
}


export interface UpdateReputationParams {
    interaction: IInteractionDoc;
    session: mongoose.ClientSession;
    performerId: string;
    authorId: string;
}

export interface RecommendationParams {
    userId: string;
    query?: string;
    skip: number;
    limit: number;
}