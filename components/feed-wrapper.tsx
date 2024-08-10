type Props = {
  children: React.ReactNode;
};

export const FeedWrapper = ({ children }: Props) => {
  return <div className="flex-1 relative top-0 pb-10">{children}</div>;
};

// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import PostInput from './PostInput';
// import Post from './Post';

// type Props = {
//   children: React.ReactNode;
// };

// export const FeedWrapper = ({ children }: Props) => {
//   const [posts, setPosts] = useState([
//     {
//       avatar: '/avatar.png',
//       username: 'Deporte Colombiano',
//       handle: 'DeportColombia',
//       time: '55min',
//       content: 'Esta nos va a doler. Fallan China y Venezuela en los Olímpicos.',
//       image: '',
//     },
//     {
//       avatar: '/avatar.png',
//       username: 'Unimayor',
//       handle: 'Unimayor',
//       time: '2h',
//       content: '¡Bienvenidos a UNIMAYOR! Queridos admitidos a primer semestre, tengan en cuenta los pasos a seguir para descargar el recibo y pagar la matrícula financiera HASTA o ANTES del 30 de julio de 2024, para garantizar tu cupo.',
//       image: '/GTWzvGvW8AAfkuT.jpeg',
//     },
//   ]);

//   const router = useRouter();

//   const handlePost = (newPost: { text: string; image: File | null }) => {
//     setPosts([
//       {
//         avatar: '/avatar.png',
//         username: 'Usuario',
//         handle: 'usuario',
//         time: 'Just now',
//         content: newPost.text,
//         image: newPost.image ? URL.createObjectURL(newPost.image) : '',
//       },
//       ...posts,
//     ]);
//   };

//   const handleCommentClick = (post: any) => {
//     // Convertir el post a una cadena JSON
//     const postString = encodeURIComponent(JSON.stringify(post));
//     // Navegar a la página de comentarios con la URL construida
//     router.push(`/comments?post=${postString}`);
//   };

//   return (
//     <div className="flex-1 relative top-0 pb-10">
//       <PostInput onPost={handlePost} />
//       {posts.map((post, index) => (
//         <Post
//           key={index}
//           avatar={post.avatar}
//           username={post.username}
//           handle={post.handle}
//           time={post.time}
//           content={post.content}
//           image={post.image}
//           onCommentClick={() => handleCommentClick(post)}
//         />
//       ))}
//       {children}
//     </div>
//   );
// };
