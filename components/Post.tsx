'use client';

import React, { useState } from 'react';
import { HeartIcon, ShareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'; // if it doesn't work, u can install npm install @heroicons/react

interface PostProps {
  avatar: string;
  username: string;
  handle: string;
  time: string;
  content: string;
  image: string;
  onCommentClick: (post: any) => void; 
}

const Post: React.FC<PostProps> = ({
  avatar,
  username,
  handle,
  time,
  content,
  image,
  onCommentClick,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [shared, setShared] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const handleShare = () => {
    setShared(!shared);
  };

  const handleComment = () => {
    onCommentClick({
      avatar,
      username,
      handle,
      time,
      content,
      image,
    });
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-2xl mx-auto mb-4">
      <div className="flex items-center mb-3">
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <div className="font-bold">{username}</div>
          <div className="text-gray-600">@{handle}</div>
          <div className="text-gray-400 text-sm">{time}</div>
        </div>
      </div>
      <p className="mb-2">{content}</p>
      {image && (
        <div className="relative">
          <img
            src={image}
            alt="Post Image"
            className="w-full h-auto rounded cursor-pointer"
            onClick={() => setPreviewImage(image)}
          />
          {previewImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
              onClick={() => setPreviewImage(null)}
            >
              <img src={previewImage} alt="Preview" className="max-w-full max-h-full" />
            </div>
          )}
        </div>
      )}
      <div className="flex space-x-4 mt-3">
        <div className="flex items-center space-x-1 cursor-pointer" onClick={handleLike}>
          <HeartIcon
            className={`h-6 w-6 ${liked ? 'icon-heart liked' : 'icon-heart'}`}
          />
          <span className="text-sm">{likes}</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShare}>
          <ShareIcon
            className={`h-6 w-6 transition-transform duration-300 ${
              shared ? 'text-green-500 scale-125' : 'text-gray-500'
            }`}
          />
          <span className="text-sm">{shared ? '' : ''}</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer" onClick={handleComment}>
          <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500" />
          <span className="text-sm"></span>
        </div>
      </div>
    </div>
  );
};

export default Post;
