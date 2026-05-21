export const sidebarLinks = [
    {
        imgURL: "/icons/home.svg",
        route: "/",
        label: "首页",
    },
    {
        imgURL: "/icons/users.svg",
        route: "/community",
        label: "社区",
    },
    {
        imgURL: "/icons/star.svg",
        route: "/collection",
        label: "收藏",
    },
    // {
    //     imgURL: "/icons/suitcase.svg",
    //     route: "/jobs",
    //     label: "找工作",
    // },
    {
        imgURL: "/icons/tag.svg",
        route: "/tags",
        label: "标签",
    },
    {
        imgURL: "/icons/user.svg",
        route: "/profile",
        label: "个人中心",
    },
    {
        imgURL: "/icons/question.svg",
        route: "/ask-question",
        label: "发布问题",
    },
];

export const BADGE_CRITERIA = {
    QUESTION_COUNT: {
        BRONZE: 10,
        SILVER: 50,
        GOLD: 100,
    },
    ANSWER_COUNT: {
        BRONZE: 10,
        SILVER: 50,
        GOLD: 100,
    },
    QUESTION_UPVOTES: {
        BRONZE: 10,
        SILVER: 50,
        GOLD: 100,
    },
    ANSWER_UPVOTES: {
        BRONZE: 10,
        SILVER: 50,
        GOLD: 100,
    },
    TOTAL_VIEWS: {
        BRONZE: 1000,
        SILVER: 10000,
        GOLD: 100000,
    },
};
