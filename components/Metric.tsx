import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
interface Props {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyle?: string;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
  imgStyles,
  titleStyle,
}: Props) => {
  const initials = alt
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const metricContent = (
    <>
      {imgUrl ? (
        <Image
          src={imgUrl}
          width={16}
          height={16}
          alt={alt}
          className={`rounded-full object-contain ${imgStyles}`}
        />
      ) : (
        <Avatar size="sm" className="rounded-full">
          <AvatarFallback
            className={cn(
              "primary-gradient font-space-grotesk font-bold tracking-wider text-white",
            )}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      )}
      <p className={`${textStyles} flex items-center gap-1 `}>
        <span className="flex items-center leading-none">{value}</span>

        {title ? (
          <span
            className={cn(
              `small-regular line-clamp-1 leading-none`,
              titleStyle,
            )}
          >
            {title}
          </span>
        ) : null}
      </p>
    </>
  );
  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
