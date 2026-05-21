import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BADGE_CRITERIA } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDeviconClassName(techName: string) {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();

  const techMap: { [key: string]: string } = {
    javascript: "devicon-javascript-plain",
    js: "devicon-javascript-plain",

    typescript: "devicon-typescript-plain",
    ts: "devicon-typescript-plain",

    react: "devicon-react-original",
    reactjs: "devicon-react-original",

    nextjs: "devicon-nextjs-plain",
    next: "devicon-nextjs-plain",

    nodejs: "devicon-nodejs-plain",
    node: "devicon-nodejs-plain",

    bun: "devicon-bun-plain",
    bunjs: "devicon-bun-plain",

    deno: "devicon-denojs-original",
    denojs: "devicon-denojs-plain",

    python: "devicon-python-plain",

    java: "devicon-java-plain",

    "c++": "devicon-cplusplus-plain",
    cpp: "devicon-cplusplus-plain",

    "c#": "devicon-csharp-plain",
    csharp: "devicon-csharp-plain",

    php: "devicon-php-plain",

    html: "devicon-html5-plain",
    html5: "devicon-html5-plain",

    css: "devicon-css3-plain",
    css3: "devicon-css3-plain",

    git: "devicon-git-plain",

    docker: "devicon-docker-plain",

    mongodb: "devicon-mongodb-plain",
    mongo: "devicon-mongodb-plain",

    mysql: "devicon-mysql-plain",

    postgresql: "devicon-postgresql-plain",
    postgres: "devicon-postgresql-plain",

    aws: "devicon-amazonwebservices-original",
    "amazon web services": "devicon-amazonwebservices-original",

    tailwind: "devicon-tailwindcss-original",
    tailwindcss: "devicon-tailwindcss-original",
  };

  return `${techMap[normalizedTech] || "devicon-devicon-plain"} colored`;
}

export function getTechDescription(techName: string): string {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();

  // 技术名称对应描述
  const techDescriptionMap: { [key: string]: string } = {
    javascript:
      "JavaScript 是一门功能强大的编程语言，用于构建动态、交互式的现代化 Web 应用。",
    typescript:
      "TypeScript 为 JavaScript 增加了强类型系统，非常适合开发可扩展、易维护的大型项目。",
    react:
      "React 是一款流行的前端库，用于构建高效、组件化的用户界面与 Web 应用。",
    nextjs:
      "Next.js 是基于 React 的前端框架，用于构建高性能、对 SEO 友好的生产级 Web 应用。",
    nodejs:
      "Node.js 是一个 JavaScript 运行时，用于构建高性能、可扩展的服务端应用程序。",
    python:
      "Python 是一门入门友好的编程语言，以简洁易用和多场景适用性著称。",
    java:
      "Java 是一门跨平台通用语言，广泛应用于企业级开发与 Android 应用开发。",
    "c++":
      "C++ 是一门高性能编程语言，适用于系统开发、游戏开发与大型应用项目。",
    git:
      "Git 是一款版本控制系统，帮助开发者高效追踪代码变更并进行团队协作。",
    docker:
      "Docker 通过容器化环境简化应用部署，确保项目在不同平台上保持一致运行。",
    mongodb:
      "MongoDB 是一款灵活的 NoSQL 数据库，适合处理非结构化数据与高并发项目。",
    mysql:
      "MySQL 是一款流行的开源关系型数据库，以稳定可靠和高性能著称。",
    postgresql:
      "PostgreSQL 是一款功能强大的开源关系型数据库，具备优秀的可扩展性与稳定性。",
    aws:
      "亚马逊云科技（AWS）是全球领先的云计算平台，提供丰富的服务用于构建、部署和管理各类 Web 与移动应用。",
  };

  return (
    techDescriptionMap[normalizedTech] ||
    `${techName} 是软件开发中广泛使用的技术或工具，具备丰富实用的功能与特性。`
  );
}

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 如果时间是未来的，或者无效，返回空或特定标识
  if (seconds < 0) {
    return "刚刚"; // 或者处理未来时间的逻辑
  }

  const interval = seconds;

  const intervals = [
    { label: "年", seconds: 31536000 },
    { label: "个月", seconds: 2592000 },
    { label: "天", seconds: 86400 },
    { label: "小时", seconds: 3600 },
    { label: "分钟", seconds: 60 },
    { label: "秒", seconds: 1 },
  ];

  for (const { label, seconds: secThreshold } of intervals) {
    const count = Math.floor(interval / secThreshold);
    if (count >= 1) {
      return `${count}${label}前`;
    }
  }

  return "刚刚";
}

export const formatNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

export function assignBadges(params: {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}) {
  const badgeCounts: Badges = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level as keyof typeof badgeLevels]) {
        badgeCounts[level as keyof Badges] += 1;
      }
    });
  });

  return badgeCounts;
}