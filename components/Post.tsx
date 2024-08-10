import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon, ShareIcon, ChatBubbleLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';

interface PostProps {
  avatar: string;
  username: string;
  handle: string;
  time: string;
  content: string;
  image: string;
  category: string; 
  currentUser: string;
  onCommentClick: (post: any) => void;
  onEditClick: (newContent: string) => void;
  onDeleteClick: () => void;
  onReportClick: () => void;
  onPreviewImage?: (image: string) => void;
  onClosePreview?: () => void;
}

const Post: React.FC<PostProps> = ({
  avatar,
  username,
  handle,
  time,
  content,
  image,
  category, 
  currentUser,
  onCommentClick,
  onEditClick,
  onDeleteClick,
  onReportClick,
  onPreviewImage,
  onClosePreview
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [shared, setShared] = useState(false);
  const [shares, setShares] = useState(0);
  const [commented, setCommented] = useState(false);
  const [comments, setComments] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const categoryStyles: { [key: string]: string } = {
    'Ciencias básicas': 'bg-blue-100 border-blue-500 text-blue-700',
    'Ciencias de computación': 'bg-green-100 border-green-500 text-green-700',
    'Habilidades comunicativas': 'bg-red-100 border-red-500 text-red-700',
    'Emprendimiento': 'bg-yellow-100 border-yellow-500 text-yellow-700',
    'Decanatura': 'bg-purple-100 border-purple-500 text-purple-700',
  };

  const handleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const handleShare = () => {
    setShared(!shared);
    setShares(shares + (shared ? -1 : 1)); 
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
    setCommented(!commented);
    setComments(comments + (commented ? -1 : 1)); 
  };

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() !== '') {
      onEditClick(editContent); 
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(content); 
    setIsEditing(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDeleteClick();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setEditContent(content);
  }, [content]);

  const openImagePreview = () => {
    if (image) {
      setPreviewImage(image);
    }
  };

  return (
    <div className="relative p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-2xl mx-auto mb-4">
      {/* Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      {/* Modal */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onClose={handleCloseModal} className="fixed inset-0 flex items-center justify-center z-50">
          <Dialog.Panel className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
            <Dialog.Title className="text-lg font-bold mb-2">Confirmar Eliminación</Dialog.Title>
            <Dialog.Description className="mb-4">
              ¿Estás seguro de que deseas eliminar este post? Esta acción no se puede deshacer.
            </Dialog.Description>
            <div className="flex space-x-2">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Eliminar
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancelar
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}

      <div className="flex items-center mb-3">
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-1">
          <div className="flex items-center">
            <div className="font-bold">{username}</div>
            <span className={`ml-2 text-sm py-1 px-2 rounded ${categoryStyles[category] || 'bg-gray-100 border-gray-500 text-gray-700'}`}>{category}</span>
          </div>
          <div className="text-gray-600">@{handle}</div>
          <div className="text-gray-400 text-sm">{time}</div>
        </div>
        <button
          className="absolute top-2 right-2 p-2"
          onClick={handleOptionsClick}
        >
          <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
        </button>
        {showOptions && (
          <div
            ref={optionsRef}
            className={`absolute top-10 right-2 bg-white border border-gray-300 rounded-lg shadow-md p-2 transition-transform transition-opacity duration-300 ease-in-out transform ${
              showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ zIndex: 40 }} 
          >
            {username === currentUser ? (
              <>
                <button className="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded font-bold" onClick={handleEdit}>Editar</button>
                <button className="block w-full text-left px-2 py-1 text-red-700 hover:bg-red-100 rounded font-bold" onClick={handleOpenModal}>Eliminar</button>
              </>
            ) : (
              <button className="block w-full text-left px-2 py-1 text-red-700 hover:bg-red-100 rounded font-bold" onClick={onReportClick}>Denunciar</button>
            )}
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="mb-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex space-x-2 mt-2">
            <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
            <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 text-black rounded">Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-2">{content}</p>
          {image && (
            <img
              src={image}
              alt="Post Image"
              className="w-full h-auto cursor-pointer"
              onClick={openImagePreview}
            />
          )}
          {previewImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
              <div className="relative">
                <img src={previewImage} alt="Preview" className="max-w-full max-h-screen" />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 bg-white text-black p-2 rounded"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </>
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
          <span className="text-sm">{shares}</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer" onClick={handleComment}>
          <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500" />
          <span className="text-sm">{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
