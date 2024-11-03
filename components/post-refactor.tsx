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
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
} from "lucide-react";

import { likePostToggle } from "@/actions/user-post";

type PostProps = {
  post: {
    id: string;
    body: string;
    category: "MATEMATICA" | "PROGRAMACION" | "SISTEMAS";
    createdAt: Date;
    updatedAt: Date;
    authUserId: string;
    likedIds: string[];
  };
};

export const Post = ({ post }: PostProps) => {
  const [pending, startTransition] = useTransition();

  const handleHartClike = () => {
    startTransition(() => {
      likePostToggle(post)
        .then((response) => {
          // if (response?.error === "hearts") {
          // }
          console.log("like: ", response.message);
        })
        .catch((error) => console.error(error));
    });
  };

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
          <Button variant="ghost" size="sm">
            <HeartIcon onClick={handleHartClike} className="h-5 w-5 mr-1" />
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
