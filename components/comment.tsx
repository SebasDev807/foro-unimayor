'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface CommentProps {
  comment: {
    id: string;
    body: string;
    createdAt: Date;
    user: {
      name: string;
      image: string;
    };
  };
}

export function Comment({ comment }: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150; // Número de caracteres antes de mostrar "leer más"

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center space-x-2 mb-2">
        <Avatar>
          <AvatarImage src={comment.user.image} alt={comment.user.name || ''} />
          <AvatarFallback>{comment.user.name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{comment.user.name}</p>
          <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div>
        {comment.body.length > maxLength && !isExpanded ? (
          <>
            <p>{comment.body.slice(0, maxLength)}...</p>
            <Button 
              variant="ghost" 
              onClick={toggleExpand}
              className="p-0 h-auto font-normal text-blue-500"
            >
              Leer más
            </Button>
          </>
        ) : (
          <p>{comment.body}</p>
        )}
        {isExpanded && (
          <Button 
            variant="ghost" 
            onClick={toggleExpand}
            className="p-0 h-auto font-normal text-blue-500"
          >
            Leer menos
          </Button>
        )}
      </div>
    </div>
  );
}