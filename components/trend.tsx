import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Trend = {
  topic: string;
  posts: string;
  url: string;
};

export const Trend = ({ topic, posts, url }: Trend) => {
  return (
    <Link
      href={url}
      className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">{topic}</span>
        <span className="text-sm text-gray-500">{posts}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </Link>
  );
};
