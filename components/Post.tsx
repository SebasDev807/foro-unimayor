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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
  MoreVertical,
  Flag,
  UserPlus,
  VolumeX,
  Trash,
} from "lucide-react";

import { deletePost, likePostToggle } from "@/actions/user-post";
import { toast } from "sonner";
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
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
      bio: string;
      followerCount: number;
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

export const Post = ({ post, currentUserId }: Props) => {
  const [isLiked, setIsLiked] = useState(post.stats?.likes.isLiked ?? false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [pending, startTransition] = useTransition();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleHeartClick = useCallback(() => {
    startTransition(() => {
      likePostToggle(post)
        .then(() => {
          setIsLiked((prev) => !prev);
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    });
  }, [post]);

  const handleDeletePost = async () => {
    startTransition(() => {
      deletePost(post)
        .then((response) => {
          if (response?.error === "unexisting") {
            toast.error("Post does not exist.");
            return;
          }
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    });
  };

  return (
    <Card key={post.id} className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between gap-1">
          <div className="flex gap-1 items-center">
            <Avatar>
              <AvatarImage
                src={post.user.image || "/placeholder.svg?height=40&width=40"}
                alt={`@${post.user.name}`}
              />
              <AvatarFallback>{getInitials(post.user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 ml-2">
                {post.user.name}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {post.user.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
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
                {post.authUserId === currentUserId && (
                  <DropdownMenuItem onClick={handleDeletePost}>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Remove</span>
                  </DropdownMenuItem>
                )}
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
            {post.body}
          </p>

          {!isExpanded && post.body.length > 100 && (
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

          {/* Renderiza la imagen si está disponible */}
          {post.image && (
            <img
              src={post.image}
              alt="Imagen del post"
              className="w-full max-h-80 object-cover rounded-md mt-4"
            />
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
            <span className="text-xs">{post.likedIds.length}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircleIcon className="h-5 w-5 mr-1" />
            {/* <span className="text-xs">{post.likedIds.length}</span> */}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    text: post.body.slice(0, 100),
                    url: window.location.href,
                  })
                  .then(() => console.log("Contenido compartido"))
                  .catch(console.error);
                // eslint-disable-next-line brace-style
              } else {
                alert(
                  "La funcionalidad de compartir no es compatible en este navegador."
                );
              }
            }}
          >
            <ShareIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
