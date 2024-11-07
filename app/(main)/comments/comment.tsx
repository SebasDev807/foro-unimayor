// "use client";
// import { useState } from "react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";

// type Props = {
//   comment: string;
//   currentUserId: string;
//   onLikeToggle: () => void;
// };

// export function Comment({ comment, currentUserId, onLikeToggle }: Props) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isLiked, setIsLiked] = useState(
//     comment.likedIds.includes(currentUserId)
//   );
//   const [likeCount, setLikeCount] = useState(comment.likedIds.length);
//   const maxLength = 100; // Maximum number of characters to show initially

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const handleLikeClick = async () => {
//     try {
//       await onLikeToggle(comment.id);
//       setIsLiked(!isLiked);
//       setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
//     } catch (error) {
//       console.error("Error toggling like:", error);
//     }
//   };

//   return (
//     <li className="border-b border-gray-200 py-4">
//       <div className="flex items-center space-x-2 mb-2">
//         <Avatar>
//           <AvatarImage src={comment.user.image} alt={comment.user.name || ""} />
//           <AvatarFallback>{comment.user.name?.[0]}</AvatarFallback>
//         </Avatar>
//         <div>
//           <p className="font-semibold">{comment.user.name}</p>
//           <p className="text-sm text-gray-500">
//             {new Date(comment.createdAt).toLocaleString()}
//           </p>
//         </div>
//       </div>
//       <div className="break-words overflow-hidden">
//         <p
//           className={`text-gray-700 ${
//             !isExpanded ? "line-clamp-3" : "line-clamp-none"
//           } whitespace-pre-wrap break-words`}
//         >
//           {comment.body}
//         </p>
//         {!isExpanded && comment.body.length > maxLength && (
//           <span
//             onClick={toggleExpand}
//             className="text-blue-500 cursor-pointer text-sm"
//           >
//             más...
//           </span>
//         )}
//         {isExpanded && (
//           <span
//             onClick={toggleExpand}
//             className="text-blue-500 cursor-pointer text-sm"
//           >
//             menos
//           </span>
//         )}
//       </div>
//       <div className="mt-2">
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={handleLikeClick}
//           className="p-0"
//         >
//           <HeartIco
//             className={`h-5 w-5 mr-1 ${
//               isLiked ? "text-red-500 fill-red-500" : "text-gray-500"
//             }`}
//           />
//           <span className="text-xs">{likeCount}</span>
//         </Button>
//       </div>
//     </li>
//   );
// }

"use client";
import { useState, useTransition, useEffect } from "react";
import { notFound } from "next/navigation";
import { Post } from "@/components/post";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPost, getCurrentUser, createComment } from "@/actions/user-comment";

export function Comment({ comment }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Maximum number of characters to show initially

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="border-b border-gray-200 py-4">
      <div className="flex items-center space-x-2 mb-2">
        <Avatar>
          <AvatarImage src={comment.user.image} alt={comment.user.name || ""} />
          <AvatarFallback>{comment.user.name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{comment.user.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="break-words overflow-hidden">
        <p
          className={`text-gray-700 ${
            !isExpanded ? "line-clamp-3" : "line-clamp-none"
          } whitespace-pre-wrap break-words`}
        >
          {comment.body}
        </p>
        {!isExpanded && comment.body.length > maxLength && (
          <span
            onClick={toggleExpand}
            className="text-blue-500 cursor-pointer text-sm"
          >
            más...
          </span>
        )}
        {isExpanded && (
          <span
            onClick={toggleExpand}
            className="text-blue-500 cursor-pointer text-sm"
          >
            menos
          </span>
        )}
      </div>
    </li>
  );
}
