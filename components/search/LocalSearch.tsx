"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
  iconPosition?: "left" | "right";
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  otherClasses,
  iconPosition = "left",
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const searchParamsString = searchParams.toString();
  const currentUrl = `${pathname}${searchParamsString ? `?${searchParamsString}` : ""}`;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParamsString,
          key: "query",
          value: searchQuery,
        });
        if (newUrl !== currentUrl) {
          router.push(newUrl, { scroll: false });
        }
      } else if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParamsString,
          keysToRemove: ["query"],
        });
        if (newUrl !== currentUrl) {
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, route, pathname, searchParamsString, currentUrl, router]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center gap-4 rouned-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition == "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
      {iconPosition == "right" && (
        <Image
          src={imgSrc}
          width={15}
          height={15}
          alt="Search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
