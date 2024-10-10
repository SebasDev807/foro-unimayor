'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PaperClipIcon, XMarkIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const PostInput = ({ onPost }: { onPost: (post: { text: string; image: File | null; category: string }) => void }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const categories = [
    { name: 'Ciencias básicas', color: 'bg-blue-100 border-blue-500 text-blue-700' },
    { name: 'Ciencias de computación', color: 'bg-green-100 border-green-500 text-green-700' },
    { name: 'Habilidades comunicativas', color: 'bg-red-100 border-red-500 text-red-700' },
    { name: 'Emprendimiento', color: 'bg-yellow-100 border-yellow-500 text-yellow-700' },
    { name: 'Decanatura', color: 'bg-purple-100 border-purple-500 text-purple-700' },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
  };

  const handlePost = () => {
    if (!category) {
      setError('Por favor seleccione una categoría');
      return;
    }
    setError(null);
    onPost({ text, image, category });
    setText('');
    setImage(null);
    setCategory('');
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-2xl mx-auto mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="¿Qué tienes en mente?"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex items-center space-x-2 mt-2">
        <label htmlFor="file-upload" className="flex items-center cursor-pointer">
          <PaperClipIcon className="h-6 w-6 text-gray-500" />
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {image && (
          <div className="relative">
            <img src={URL.createObjectURL(image)} alt="Selected" className="w-20 h-20 object-cover rounded" />
            <button
              onClick={() => setImage(null)}
              className="absolute top-0 right-0 p-1 bg-gray-500 text-white rounded-full"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
            <span className="ml-2 text-gray-700">{category || 'Módulo'}</span>
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-48 z-50"
            >
              <ul className="list-none p-2">
                {categories.map((cat) => (
                  <li
                    key={cat.name}
                    className={`p-2 border rounded-lg cursor-pointer hover:bg-gray-100 ${category === cat.name ? 'ring-2 ring-opacity-50' : ''} ${cat.color}`}
                    onClick={() => handleCategorySelect(cat.name)}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={handlePost}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PostInput;
