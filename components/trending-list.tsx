import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Trend = {
  topic: string;
  posts: string;
  url: string;
};

const trends: Trend[] = [
  {
    topic: "MATEMATICA",
    posts: "180 mil posts",
    url: "/topic/matematica",
  },
  {
    topic: "PROGRAMACION",
    posts: "224 mil posts",
    url: "/topic/programacion",
  },
  {
    topic: "SISTEMAS",
    posts: "34,9 mil posts",
    url: "/topic/sistemas",
  },
];

const Trend = ({ topic, posts, url }: Trend) => {
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

export function TrendingList() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <h2 className="text-xl font-bold p-4  text-[#3fa7f3] text-center">
        Módulos
      </h2>
      <ul>
        {trends.map((trend, index) => (
          <li key={index} className="last:border-b-0">
            <Trend topic={trend.topic} posts={trend.posts} url={trend.url} />
          </li>
        ))}
      </ul>
    </div>
  );
}
