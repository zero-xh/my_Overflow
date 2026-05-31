interface Tag {
    _id: string
    name: string
    questions?: number
}

interface Author {
    _id: string
    name: string
    image: string
}

interface Question {
    map(arg0: (question: any) => JSX.Element): import("react").ReactNode
    _id: string;
    title: string;
    content: string;
    tags: Tag[];
    author: Author;
    createdAt: Date;
    upvotes: number;
    downvotes: number;
    answers: number;
    views: number;
}

type ActionResponse<T = null> = {
    success: boolean
    data?: T
    error?: {
        message: string
        details?: Record<string, string[]>
    }
    status?: number
}

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };


type APIErrorResponse = NextResponse<ErrorResponse>
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
    params: Promise<Record<string, string>>
    searchParams: Promise<Record<string, string>>
}

interface PaginatedSearchParams {
    page?: number;
    pageSize?: number;
    query?: string;
    filter?: string;
    sort?: string;
}

interface Answer {
    _id: string;
    content: string;
    author: Author;
    cratedAt: Date;
    upvotes: number;
    downvotes: number;
    question: string;
    createdAt?: Date;
}
interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    image?: string;
    bio?: string;
    location?: string;
    portfolio?: string;
    reputation?: number;
    createdAt: Date
}

interface Collection {
    _id: string;
    question: IQuestionDoc;
    author: string | Author;
}

interface Badges {
    GOLD: number;
    SILVER: number;
    BRONZE: number;
}