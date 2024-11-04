"use client";
import { useCallback, useState, useTransition } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
} from "lucide-react";

import { likePostToggle } from "@/actions/user-post";
import { toast } from "sonner"; // Importa la función toast
import { Category } from "@prisma/client";

type Props = {
  post: {
    id: string;
    body: string;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
    authUserId: string;
    likedIds: string[];
    stats?: {
      likes: {
        length: number;
        isLiked: boolean;
      };
      comments: number;
    };
    comments: {
      id: string;
      body: string;
      createdAt: Date;
      updatedAt: Date;
      authUserId: string;
      postId: string;
      likedIds: string[];
    }[];
  };
};

export const Post = ({ post }: Props) => {
  const [isLiked, setIsLiked] = useState(post.stats?.likes?.isLiked ?? false);
  const [pending, startTransition] = useTransition();

  const handleHeartClick = useCallback(() => {
    startTransition(() => {
      likePostToggle(post)
        .then(() => {
          setIsLiked((prev) => !prev);
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    });
  }, [post]);

  return (
    <Card key={post.id} className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between gap-1">
          <div className="flex gap-1 items-center">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={`@${post.authUserId}`}
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500 ml-2">
              @{post.authUserId.slice(0, 5)}
            </span>
          </div>

          <span className="text-sm text-gray-500">
            {post.createdAt.toLocaleString()}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex-1 space-y-1">
          <p className="text-gray-700">{post.body}</p>
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
            <span className="text-xs">{post.likedIds.length}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircleIcon className="h-5 w-5 mr-1" />
            <span className="text-xs">Comments</span>
          </Button>
          <Button variant="ghost" size="sm">
            <RepeatIcon className="h-5 w-5 mr-1" />
            <span className="text-xs">Shares</span>
          </Button>
          <Button variant="ghost" size="sm">
            <ShareIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
