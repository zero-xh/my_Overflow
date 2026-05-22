import { z } from "zod";

export const SignInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "邮箱不能为空" })
        .email({ message: "请输入有效的邮箱地址" }),

    password: z
        .string()
        .min(6, { message: "密码长度至少为6个字符" })
        .max(100, { message: "密码长度不能超过100个字符" }),
});

export const SignUpSchema = z.object({
    username: z
        .string()
        .min(3, { message: "用户名长度至少为3个字符" })
        .max(30, { message: "用户名长度不能超过30个字符" })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "用户名只能包含字母、数字和下划线",
        }),

    name: z
        .string()
        .min(1, { message: "姓名不能为空" })
        .max(50, { message: "姓名长度不能超过50个字符" }),

    email: z
        .email({ message: "请输入有效的邮箱地址" }),

    password: z
        .string()
        .min(6, { message: "密码长度至少为6个字符" })
        .max(100, { message: "密码长度不能超过100个字符" })
        .regex(/[A-Z]/, {
            message: "密码必须包含至少一个大写字母",
        })
        .regex(/[a-z]/, {
            message: "密码必须包含至少一个小写字母",
        })
        .regex(/[0-9]/, { message: "密码必须包含至少一个数字" })
        .regex(/[^a-zA-Z0-9]/, {
            message: "密码必须包含至少一个特殊字符",
        }),
});

export const AskQuestionSchema = z.object({
    title: z
        .string()
        .min(5, { message: "请填写问题标题（至少5个字符）" })
        .max(100, { message: "标题不能超过100个字符" }),
    content: z.string().min(1, { message: "请填写问题内容" }),
    tags: z
        .array(
            z
                .string()
                .min(1, { message: "请填写标签" })
                .max(30, { message: "单个标签不能超过30个字符" })
        )
        .min(1, { message: "至少需要添加1个标签" })
        .max(3, { message: "最多只能添加3个标签" }),
});

export const UserSchema = z.object({
    name: z
        .string().min(1, { message: "姓名不能为空" }),
    username: z
        .string()
        .min(3, { message: "用户名长度至少为3个字符" })
        .max(30, { message: "用户名长度不能超过30个字符" })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "用户名只能包含字母、数字和下划线",
        }),
    email: z.email({ message: "请输入有效的邮箱地址" }),
    bio: z.string().optional(),
    image: z.url({ message: "请输入有效的图片URL" }).optional(),
    location: z.string().optional(),
    portfolio: z.url({ message: "请输入有效的个人主页URL" }).optional(),
    reputation: z.number().optional(),
});

export const AccountSchema = z.object({
    userId: z
        .string()
        .min(1, { message: "用户 ID 不能为空" }),
    name: z
        .string()
        .min(1, { message: "姓名不能为空" })
        .max(50, { message: "姓名长度不能超过50个字符" }),
    image: z.url({ message: "请输入有效的图片URL" }).optional(),
    password: z
        .string()
        .min(6, { message: "密码长度至少为6位" })
        .max(100, { message: "密码长度不能超过100位" })
        .regex(/[A-Z]/, {
            message: "密码必须包含至少一个大写字母",
        })
        .regex(/[a-z]/, {
            message: "密码必须包含至少一个小写字母",
        })
        .regex(/[0-9]/, { message: "密码必须包含至少一个数字" })
        .regex(/[^a-zA-Z0-9]/, {
            message: "密码必须包含至少一个特殊字符",
        })
        .optional(),
    provider: z.string().min(1, { message: "认证提供方不能为空" }),
    providerAccountId: z.string().min(1, { message: "第三方账号 ID不能为空" }),
});

export const SignInWithOAuthSchema = z.object({
    provider: z.enum(["github"]),
    providerAccountId: z.string().min(1, { message: "第三方账号 ID不能为空" }),
    user: z.object({
        name: z.string().min(1, { message: "姓名不能为空" }),
        username: z.string()
            .min(3, { message: "用户名长度至少为3个字符" })
            .max(30, { message: "用户名长度不能超过30个字符" }),
        email: z.email({ message: "请输入有效的邮箱地址" }),
        image: z.url({ message: "请输入有效的图片URL" }).optional(),
    }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
    questionId: z.string().min(1, { message: "问题 ID 不能为空" }),
});

export const GetQuestionSchema = z.object({
    questionId: z.string().min(1, { message: "问题 ID 不能为空" }),
});

export const PaginatedSearchParamsSchema = z.object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().default(10),
    query: z.string().optional(),
    filter: z.string().optional(),
    sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
    tagId: z.string().min(1, { message: "标签 ID 不能为空" }),
});

export const AnswerSchema = z.object({
    content: z.string().min(50, { message: "回答内容不能少于50个字符" }),
});

export const AnswerServerSchema = AnswerSchema.extend({
    questionId: z.string().min(1, { message: "问题 ID 不能为空" }),
});

export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
    questionId: z.string().min(1, { message: "问题 ID 不能为空" }),
});

export const AIAnswerSchema = z.object({
    question: z.string().min(5, { message: "问题不能为空" }).max(130, { message: "问题不能超过130个字符" }),
    content: z.string().min(50, { message: "回答内容不能少于50个字符" }),
    userAnswer: z.string().optional()
})

export const CreateVoteSchema = z.object({
    targetId: z.string().min(1, { message: "目标 ID 不能为空" }),
    targetType: z.enum(["question", "answer"], {
        message: "必须指定投票目标类型，'question' 或 'answer'",
    }),
    voteType: z.enum(["upvote", "downvote"], {
        message: "必须指定投票类型，'upvote' 或 'downvote'",
    }),
});

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
    change: z
        .number()
        .int()
        .min(-1, { message: "变更值必须为 -1 或 1" })
        .max(1, { message: "变更值必须为 -1 或 1" }),
});

export const HasVotedSchema = CreateVoteSchema.pick({
    targetId: true,
    targetType: true,
});

export const CollectionBaseSchema = z.object({
    questionId: z.string().min(1, "问题 ID 不能为空"),
});

export const CreateInteractionSchema = z.object({
    action: z.enum([
        "view",
        "upvote",
        "downvote",
        "bookmark",
        "post",
        "edit",
        "delete",
        "search",
    ]),
    actionTarget: z.enum(["question", "answer"]),
    actionId: z.string().min(1),
    authorId: z.string().min(1),
});

export const GetUserSchema = z.object({
    userId: z.string().min(1, "用户 ID 不能为空"),
});

export const GetUserQuestionsSchema = PaginatedSearchParamsSchema.extend({
    userId: z.string().min(1, "用户 ID 不能为空"),
});

export const GetUsersAnswersSchema = PaginatedSearchParamsSchema.extend({
    userId: z.string().min(1, "用户 ID 不能为空"),
});

export const GetUserTagsSchema = z.object({
    userId: z.string().min(1, "用户 ID 不能为空"),
});

export const DeleteQuestionSchema = z.object({
    questionId: z.string().min(1, "Question ID is required"),
});

export const DeleteAnswerSchema = z.object({
    answerId: z.string().min(1, "Answer ID is required"),
});

export const ProfileSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "名字不能少于3个字符",
        })
        .max(130, { message: "名字不能超过130个字符" }),
    username: z
        .string()
        .min(3, { message: "用户名不能少于3个字符" }),
    portfolio: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().min(3, {
        message: "个人简介必须至少有3个字符。",
    }),
});

export const UpdateUserSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "名字不能少于3个字符",
        })
        .max(130, { message: "名字不能超过130个字符" }),
    username: z
        .string()
        .min(3, { message: "用户名不能少于3个字符" }),
    portfolio: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().min(3, {
        message: "个人简介必须至少有3个字符。",
    }),
});