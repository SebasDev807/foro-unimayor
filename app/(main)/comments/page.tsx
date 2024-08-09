'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';


// Comments type
interface Comment {
  id: string;
  username: string;
  content: string;
  time: string;
}

const CommentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [post, setPost] = useState<any | null>(null); 
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const postParam = searchParams.get('post');
    if (postParam) {
      const decodedPost = JSON.parse(decodeURIComponent(postParam));
      setPost(decodedPost);
      
    }
  }, [searchParams]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="p-4 bg-white max-w-2xl mx-auto">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleGoBack}
      >
        Volver
      </button>
      {post && (
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg mt-4">
          <div className="flex items-center mb-2">
            <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
            <div>
              <div className="font-bold">{post.username}</div>
              <div className="text-gray-600">@{post.handle}</div>
              <div className="text-gray-400 text-sm">{post.time}</div>
            </div>
          </div>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post Image" className="mt-2 w-full h-auto rounded" />}
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-bold">Comentarios</h2>
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="p-4 bg-gray-100 border border-gray-300 rounded-lg mt-2">
              <div className="flex items-center mb-2">
                <div className="font-bold">{comment.username}</div>
                <div className="text-gray-400 text-sm ml-2">{comment.time}</div>
              </div>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
