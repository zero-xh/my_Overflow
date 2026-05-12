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
        .max(50, { message: "姓名长度不能超过50个字符" })
        .regex(/^[a-zA-Z\s]+$/, {
            message: "姓名只能包含字母和空格",
        }),

    email: z
        .string()
        .min(1, { message: "邮箱不能为空" })
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