import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Trend = {
  topic: string
  posts: string
  url: string
}

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
]

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
  )
}

export  function TrendingList() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <h2 className="text-xl font-bold p-4  text-[#3fa7f3] text-center">Módulos</h2>
      <ul>
        {trends.map((trend, index) => (
          <li key={index} className="last:border-b-0">
            <Trend topic={trend.topic} posts={trend.posts} url={trend.url} />
          </li>
        ))}
      </ul>
    </div>
  )
}
