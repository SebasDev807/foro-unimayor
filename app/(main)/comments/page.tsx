"use client";
// TODO: Ii's ugly, you can provide a better style Sam jeje.

import React, { useState } from "react";
import { TrendingList } from "@/components/trending-list";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "@/components/post";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

interface Comment {
  id: number;
  parentId: number | null;
  avatar: string;
  username: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  liked: boolean;
  shared: boolean;
}

const CommentsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postString = searchParams.get("post");

  // Mock post data in case no post is found in the URL parameters
  const defaultPost = {
    avatar: "/avatar.png",
    username: "UsuarioDemo",
    handle: "usuario_demo",
    time: "1h",
    content: "Este es un post de ejemplo.",
    image: null,
    category: "General",
  };

  const post = postString
    ? JSON.parse(decodeURIComponent(postString))
    : defaultPost;

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      parentId: null,
      avatar: "/avatar.png",
      username: "Usuario1",
      handle: "usuario1",
      time: "1h",
      content: "¡Gran publicación! Me encantó.",
      likes: 0,
      liked: false,
      shared: false,
    },
    {
      id: 2,
      parentId: null,
      avatar: "/avatar.png",
      username: "Usuario2",
      handle: "usuario2",
      time: "2h",
      content: "Estoy de acuerdo, muy informativo.",
      likes: 0,
      liked: false,
      shared: false,
    },
  ]);

  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const currentUser = "Usuario1";

  const handleLike = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleReplyClick = (id: number | null) => {
    setReplyTo(id === replyTo ? null : id);
  };

  const handleSubmitReply = () => {
    if (newComment.trim() === "") return;
    setComments((prevComments) => [
      ...prevComments,
      {
        id: Date.now(),
        parentId: replyTo,
        avatar: "/avatar.png",
        username: "UsuarioNuevo",
        handle: "usuario_nuevo",
        time: "justo ahora",
        content: newComment,
        likes: 0,
        liked: false,
        shared: false,
      },
    ]);
    setNewComment("");
    setReplyTo(null); // Hide the replies.
  };

  const handleEditClick = (id: number, content: string) => {
    setEditCommentId(id);
    setEditContent(content);
  };

  const handleSaveEdit = () => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === editCommentId
          ? { ...comment, content: editContent }
          : comment
      )
    );
    setEditCommentId(null);
    setEditContent("");
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditContent("");
  };

  const handleDeleteClick = (id: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const toggleReplies = (id: number) => {
    setShowReplies((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderComments = (parentId: number | null, level: number = 0) =>
    comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => {
        const hasReplies = comments.some((c) => c.parentId === comment.id);
        return (
          <div key={comment.id} className="relative mb-4 pl-4">
            <div
              className={`bg-white border border-gray-200 rounded-lg p-4 ${
                level > 0 ? "ml-4 border-l-2 border-gray-300" : ""
              }`}
            >
              <div className="flex items-center mb-3">
                <img
                  src={comment.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-bold">{comment.username}</div>
                    <span className="ml-2 text-sm py-1 px-2 rounded bg-gray-100 border-gray-500 text-gray-700">
                      Comentario
                    </span>
                  </div>
                  <div className="text-gray-600">@{comment.handle}</div>
                  <div className="text-gray-400 text-sm">{comment.time}</div>
                </div>
                {comment.username === currentUser && (
                  <button
                    className="absolute top-2 right-2 p-2"
                    onClick={() => handleEditClick(comment.id, comment.content)}
                  >
                    <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
                  </button>
                )}
              </div>
              {editCommentId === comment.id ? (
                <div className="mb-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-300 text-black rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mb-2">{comment.content}</p>
              )}
              <div className="flex space-x-4 mt-3">
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => handleLike(comment.id)}
                >
                  <HeartIcon
                    className={`h-6 w-6 transition-transform duration-300 ${
                      comment.liked ? "text-red-500 scale-125" : "text-gray-500"
                    }`}
                    style={{ fill: comment.liked ? "red" : "none" }}
                  />
                  <span className="text-sm">{comment.likes}</span>
                </div>
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => handleReplyClick(comment.id)}
                >
                  <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              {replyTo === comment.id && (
                <div className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Escribe tu respuesta..."
                  />
                  <button
                    onClick={handleSubmitReply}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Enviar
                  </button>
                </div>
              )}
              {hasReplies && (
                <button
                  className="text-blue-500 mt-2"
                  onClick={() => toggleReplies(comment.id)}
                >
                  {showReplies[comment.id]
                    ? "Ocultar respuestas"
                    : "Ver respuestas"}
                </button>
              )}
              {showReplies[comment.id] && renderComments(comment.id, level + 1)}
            </div>
          </div>
        );
      });

  if (!post) {
    return <div>No se encontró el post.</div>;
  }

  return (
    <div className="flex flex-row gap-[48px] px-6">
      <div className="w-3/4">
        {/* <Comments /> */}
        <div className="p-4 bg-white max-w-2xl mx-auto">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => router.back()}
          >
            Volver
          </button>
          <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md mb-4 relative">
            {/* TODO: solve post error, I remove multiple post files and keeps only one called "post.tsx" */}
            {/* <Post
              avatar={post.avatar}
              username={post.username}
              handle={post.handle}
              time={post.time}
              content={post.content}
              image={post.image}
              category={post.category}
              currentUser={currentUser}
              onCommentClick={() => setReplyTo(null)}
              onEditClick={() => {}}
              onDeleteClick={() => {}}
              onReportClick={() => {}}
            /> */}
            <div className="border-t border-gray-300 p-4">
              <h2 className="text-xl font-bold mb-2">Comentarios:</h2>
              {replyTo === null && (
                <div className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Escribe tu comentario..."
                  />
                  <button
                    onClick={handleSubmitReply}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Enviar
                  </button>
                </div>
              )}
              {renderComments(null)}
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/4">
        <div className="sticky top-4">
          <TrendingList />
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
