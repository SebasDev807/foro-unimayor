'use client';

import React, { useState } from 'react';
import PostInput from './PostInput';
import Post from './Post';
import { useRouter } from 'next/navigation'; 

const FeedWrapper = () => {
  const router = useRouter(); 
  const currentUser = 'Usuario'; // Make the logic in the backend so that this is the value of the user making the post.

  const [posts, setPosts] = useState([
    {
      avatar: '/avatar.png',
      username: 'Deporte Colombiano',
      handle: 'DeportColombia',
      time: '55min',
      content: 'Esta nos va a doler. Fallan China y Venezuela en los Olímpicos.',
      image: '',
      category: 'Ciencias Básicas',
      likes: 10, 
      shares: 5, 
    },
    {
      avatar: '/avatar.png',
      username: 'Unimayor',
      handle: 'Unimayor',
      time: '2h',
      content: '¡Bienvenidos a UNIMAYOR! Queridos admitidos a primer semestre...',
      image: '/GTWzvGvW8AAfkuT.jpeg',
      category: 'Ciencias de Computación',
      likes: 20, 
      shares: 8, 
    },
  ]);

  const handlePost = (newPost: { text: string; image: File | null; category: string }) => {
    setPosts([
      {
        avatar: '/avatar.png',
        username: 'Usuario',
        handle: 'usuario',
        time: 'Just now',
        content: newPost.text,
        image: newPost.image ? URL.createObjectURL(newPost.image) : '',
        category: newPost.category,
        likes: 0, 
        shares: 0, 
      },
      ...posts,
    ]);
  };

  const handleCommentClick = (post: any) => {
    const postString = encodeURIComponent(JSON.stringify(post));
    router.push(`/comments?post=${postString}`);
  };

  const handleEditPost = (index: number, newContent: string) => {
    setPosts(posts.map((post, i) => i === index ? { ...post, content: newContent } : post));
  };

  const handleDeletePost = (index: number) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handleReportPost = (index: number) => {
    alert('Post denunciado');
  };

  return (
    <div className="flex-1 relative top-0 pb-10">
      <PostInput onPost={handlePost} />
      {posts.map((post, index) => (
        <Post
          key={index}
          avatar={post.avatar}
          username={post.username}
          handle={post.handle}
          time={post.time}
          content={post.content}
          image={post.image}
          category={post.category}
          currentUser={currentUser}
          onCommentClick={() => handleCommentClick(post)}
          onEditClick={(newContent) => handleEditPost(index, newContent)}
          onDeleteClick={() => handleDeletePost(index)}
          onReportClick={() => handleReportPost(index)}
        />
      ))}
    </div>
  );
};

export default FeedWrapper;
