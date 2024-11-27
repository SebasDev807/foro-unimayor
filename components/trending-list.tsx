import React from "react";
import { Trend } from "./trend";
import { Category } from "@prisma/client";

type TrendType = {
  topic: Category;
  posts: string;
  url: string;
};

const trends: TrendType[] = [
  {
    topic: Category.MATEMATICA,
    posts: "5 posts",
    url: "/topic/matematica",
  },
  {
    topic: Category.PROGRAMACION,
    posts: "10 posts",
    url: "/topic/programacion",
  },
  {
    topic: Category.SISTEMAS,
    posts: "0 posts",
    url: "/topic/sistemas",
  },
];

export function TrendingList() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <h2 className="text-xl font-bold p-4 text-[#3fa7f3] text-center">
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