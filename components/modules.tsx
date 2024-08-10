import React from 'react';
import Link from 'next/link';

type Trend = {
  topic: string;
  posts: string;
  url: string;
};

const TrendingList = () => {
  const trends: Trend[] = [
    { topic: 'Ciencias básicas', posts: '180 mil posts', url: '@/ciencias-basicas' },
    { topic: 'Ciencias de computación', posts: '224 mil posts', url: '/ciencias-computacion' },
    { topic: 'Habilidades comunicativas', posts: '34,9 mil posts', url: '/habilidades-comunicativas' },
    { topic: 'Emprendimiento', posts: '59,3 mil posts', url: '/emprendimiento' },
    { topic: 'Decanatura', posts: '40 posts', url: '/decanatura' },
  ];

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-2xl mx-auto mb-4">
      <h2 className="mb-4 text-xl font-bold text-black">Módulos</h2>
      <ul className="space-y-4">
        {trends.map((trend, index) => (
          <li key={index} className="flex flex-col text-gray-700">
            <Link href={trend.url} legacyBehavior>
              <a className="font-bold text-blue-500 hover:underline">
                {trend.topic}
              </a>
            </Link>
            <span className="text-sm text-gray-400">{trend.posts}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingList;
