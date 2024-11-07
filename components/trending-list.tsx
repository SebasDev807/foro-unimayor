import React from "react";
import { Trend } from "./trend";

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
