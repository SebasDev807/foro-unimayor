
'use client';

import React, { useState } from 'react';

interface PostInputProps {
  onPost: (newPost: { text: string; image: File | null }) => void;
}

const PostInput: React.FC<PostInputProps> = ({ onPost }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = () => {
    if (text || image) {
      onPost({ text, image });
      setText('');
      setImage(null);
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <textarea
        className="w-full p-2 mb-2 text-black bg-gray-100 rounded border border-gray-300"
        placeholder="¿Qué tienes en mente?"
        value={text}
        onChange={handleTextChange}
      />
      <input 
        type="file" 
        onChange={handleImageChange} 
        className="mb-2 text-black"
      />
      <button 
        className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Publicar
      </button>
    </div>
  );
};

export default PostInput;
