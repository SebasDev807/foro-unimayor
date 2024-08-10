import React from "react";
import Link from "next/link";

type Trend = {
  topic: string;
  posts: string;
  url: string;
};

const trends: Trend[] = [
  {
    topic: "Ciencias básicas",
    posts: "180 mil posts",
    url: "@/ciencias-basicas",
  },
  {
    topic: "Ciencias de computación",
    posts: "224 mil posts",
    url: "/ciencias-computacion",
  },
  {
    topic: "Habilidades comunicativas",
    posts: "34,9 mil posts",
    url: "/habilidades-comunicativas",
  },
  {
    topic: "Emprendimiento",
    posts: "59,3 mil posts",
    url: "/emprendimiento",
  },
  { topic: "Decanatura", posts: "40 posts", url: "/decanatura" },
];

const Trend = ({ topic, posts, url }: Trend) => {
  return (
    <div className="flex flex-col items-start justify-between gap-x-2 w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-2xl mx-auto mb-4">
      <Link href={url} legacyBehavior>
        <a className="font-bold text-blue-500 hover:underline">{topic}</a>
      </Link>
      <span className="text-sm text-gray-400">{posts}</span>
    </div>
  );
};

export const TrendingList = () => {
  return (
    <ul className="space-y-4">
      {trends.map((trend, index) => (
        <li key={index} className="text-gray-700">
          <Trend topic={trend.topic} posts={trend.posts} url={trend.url} />
        </li>
      ))}
    </ul>
  );
};
