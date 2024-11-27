"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HeartIcon,
  MoreVertical,
  Flag,
  UserPlus,
  VolumeX,
} from "lucide-react";
import { likeCommentToggle } from "@/actions/user-comment";
import { toast } from "sonner";

type CommentProps = {
  comment: {
    id: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    authUserId: string;
    postId: string;
    likedIds?: string[];
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  };
  currentUserId: string;
};

const getInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names.map((n) => n[0]).join("");
  return initials.toUpperCase();
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

export const Comment = ({ comment, currentUserId }: CommentProps) => {
  const [isLiked, setIsLiked] = useState(comment.likedIds?.includes(currentUserId) ?? false);
  const [likeCount, setLikeCount] = useState(comment.likedIds?.length ?? 0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pending, startTransition] = useTransition();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleHeartClick = () => {
    startTransition(() => {
      likeCommentToggle(comment.id)
        .then(() => {
          setIsLiked((prev) => !prev);
          setLikeCount((prev) => isLiked ? prev - 1 : prev + 1);
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex justify-between gap-1">
          <div className="flex gap-1 items-center">
            <Avatar>
              <AvatarImage
                src={comment.user.image || "/placeholder.svg?height=40&width=40"}
                alt={`@${comment.user.name}`}
              />
              <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 ml-2">
                {comment.user.name}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {comment.user.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {formatDate(comment.createdAt)}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Report</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Follow</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <VolumeX className="mr-2 h-4 w-4" />
                  <span>Mute</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex-1 space-y-1">
          <p
            className={`text-gray-700 ${
              !isExpanded ? "line-clamp-3" : "line-clamp-none"
            } whitespace-pre-wrap break-words`}
          >
            {comment.body}
          </p>
          {!isExpanded && comment.body.length > 100 && (
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
      </CardContent>

      <CardFooter className="border-t border-gray-200 pt-4">
        <div className="flex justify-between w-full text-gray-500">
          <Button
            disabled={pending}
            variant="ghost"
            size="sm"
            onClick={handleHeartClick}
          >
            <HeartIcon
              className={`h-5 w-5 mr-1 transition-colors duration-300 ${
                isLiked ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
            />
            <span className="text-xs">{likeCount}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};