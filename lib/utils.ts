import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDeviconClassName(techName: string) {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();


  return `${techMap[normalizedTech] || "devicon-devicon-plain"} colored`;
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