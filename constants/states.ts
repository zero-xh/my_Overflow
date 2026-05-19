import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
    title: "暂无数据",
    message: "数据库好像休息啦，快去添加新内容唤醒它吧～",
    button: {
        text: "添加数据",
        href: ROUTES.HOME,
    },
};

export const DEFAULT_ERROR = {
    title: "出错啦",
    message: "代码偶尔也会闹小情绪，刷新重试一下吧～",
    button: {
        text: "重新请求",
        href: ROUTES.HOME,
    },
};

export const EMPTY_QUESTION = {
    title: "还没有任何问题哦",
    message: "问题面板空空如也，期待你的精彩提问开启讨论～",
    button: {
        text: "发起提问",
        href: ROUTES.ASK_QUESTION,
    },
};

export const EMPTY_TAGS = {
    title: "暂无标签",
    message: "标签库还是空的，快去添加关键词丰富内容吧～",
    button: {
        text: "创建标签",
        href: ROUTES.TAGS,
    },
};

export const EMPTY_ANSWERS = {
    title: "暂无回答",
    message: "还没有人回答，快来分享你的精彩见解吧～",
    button: {
        text: "回答",
        href: ROUTES.HOME,
    },
};

export const EMPTY_COLLECTIONS = {
    title: "暂无收藏",
    message: "你还没有创建任何收藏，快去收藏喜欢的内容吧～",
};

export const EMPTY_USERS = {
    title: "暂无用户",
    message: "这里还没有其他用户哦，新用户正在陆续加入～",
};
