"use client";
import { useState } from "react";
import { Bell, UserPlus, MessageSquare, PinIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { TrendingList } from "@/components/trending-list";

type Notification = {
  id: string;
  type: "login" | "post" | "follow" | "mention" | "like";
  content: string;
  timestamp: string;
  user?: {
    name: string;
    image: string;
  };
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "login",
    content:
      "Se ha iniciado sesión en tu cuenta @ago samti desde un dispositivo nuevo el 25 oct. 2024. Compruébalo ahora.",
    timestamp: "1h",
  },
  {
    id: "2",
    type: "post",
    content: "Nuevo post fijado en 1337: AI, ML, Py, Data Science",
    timestamp: "2h",
  },
  {
    id: "3",
    type: "follow",
    content: "te siguió",
    timestamp: "3h",
    user: {
      name: "Maria Victoria",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "4",
    type: "post",
    content: "Nuevo post fijado en Trump Is My President",
    timestamp: "4h",
  },
  {
    id: "6",
    type: "like",
    content: "Jorge ha dado like a tu post",
    timestamp: "4h",
  },
  {
    id: "6",
    type: "like",
    content: "Sam ha dado like a tu post",
    timestamp: "4h",
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "login":
        return <Bell className="h-5 w-5" />;
      case "post":
        return <PinIcon className="h-5 w-5" />;
      case "follow":
        return <UserPlus className="h-5 w-5" />;
      case "mention":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-row gap-[48px] px-6">
      <FeedWrapper>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 p-4 border-b border-gray-200"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    {notification.user && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar>
                          <AvatarImage
                            src={notification.user.image}
                            alt={notification.user.name}
                          />
                          <AvatarFallback>
                            {notification.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">
                          {notification.user.name}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-600">
                      {notification.content}
                    </p>
                    <span className="text-xs text-gray-400">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="likes">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 p-4 border-b border-gray-200"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    {notification.user && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar>
                          <AvatarImage
                            src={notification.user.image}
                            alt={notification.user.name}
                          />
                          <AvatarFallback>
                            {notification.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">
                          {notification.user.name}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-600">
                      {notification.content}
                    </p>
                    <span className="text-xs text-gray-400">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="comentarios">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 p-4 border-b border-gray-200"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    {notification.user && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar>
                          <AvatarImage
                            src={notification.user.image}
                            alt={notification.user.name}
                          />
                          <AvatarFallback>
                            {notification.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">
                          {notification.user.name}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-600">
                      {notification.content}
                    </p>
                    <span className="text-xs text-gray-400">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <TrendingList />
      </StickyWrapper>
    </div>
  );
}
