"use client";
import { useState } from "react";

import { Bell, UserPlus, MessageSquare, PinIcon, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type {
  Notification as NotificationType,
  NotificationType as NotificationEnum,
} from "@prisma/client";

type Props = {
  notifications: (NotificationType & {
    user: { name: string; image: string };
  })[];
};

export function Notifications({ notifications }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const getIcon = (type: NotificationEnum) => {
    switch (type) {
      case "LIKE":
        return <Heart className="h-5 w-5" />;
      // case "POST":
      //   return <PinIcon className="h-5 w-5" />;
      case "FOLLOW":
        return <UserPlus className="h-5 w-5" />;
      case "COMMENT":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const filterNotifications = (type: string) => {
    switch (type) {
      case "LIKE":
        return notifications.filter(
          (notification) => notification.type === "LIKE"
        );
      case "COMMENT":
        return notifications.filter(
          (notification) => notification.type === "COMMENT"
        );
      case "FOLLOW":
        return notifications.filter(
          (notification) => notification.type === "FOLLOW"
        );
      default:
        return notifications;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
          <TabsTrigger value="seguidores">Seguidores</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filterNotifications("all").map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-4 border-b border-gray-200"
            >
              <div className="bg-blue-100 p-2 rounded-full">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar>
                    <AvatarImage
                      src={notification.user.image ?? undefined}
                      alt={notification.user.name ?? undefined}
                    />
                    <AvatarFallback>
                      {notification.user.name
                        ? notification.user.name[0]
                        : undefined}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">
                    {notification.user.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notification.body}</p>
                <span className="text-xs text-gray-400">
                  {notification.createdAt.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="likes">
          {filterNotifications("LIKE").map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-4 border-b border-gray-200"
            >
              <div className="bg-blue-100 p-2 rounded-full">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar>
                    <AvatarImage
                      src={notification.user.image ?? undefined}
                      alt={notification.user.name ?? undefined}
                    />
                    <AvatarFallback>
                      {notification.user.name
                        ? notification.user.name[0]
                        : undefined}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">
                    {notification.user.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notification.body}</p>
                <span className="text-xs text-gray-400">
                  {notification.createdAt.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="comentarios">
          {filterNotifications("COMMENT").map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-4 border-b border-gray-200"
            >
              <div className="bg-blue-100 p-2 rounded-full">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar>
                    <AvatarImage
                      src={notification.user.image ?? undefined}
                      alt={notification.user.name ?? undefined}
                    />
                    <AvatarFallback>
                      {notification.user.name
                        ? notification.user.name[0]
                        : undefined}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">
                    {notification.user.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notification.body}</p>
                <span className="text-xs text-gray-400">
                  {notification.createdAt.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="seguidores">
          {filterNotifications("FOLLOW").map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-4 border-b border-gray-200"
            >
              <div className="bg-blue-100 p-2 rounded-full">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar>
                    <AvatarImage
                      src={notification.user.image ?? undefined}
                      alt={notification.user.name ?? undefined}
                    />
                    <AvatarFallback>
                      {notification.user.name
                        ? notification.user.name[0]
                        : undefined}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">
                    {notification.user.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notification.body}</p>
                <span className="text-xs text-gray-400">
                  {notification.createdAt.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
