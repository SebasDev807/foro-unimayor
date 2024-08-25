import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type UserProfileProps = {
  name: string | null;
  bio: string | null;
  image: string | null;
  coverImage: string | null;
  username: string | null;
};

export const Info = ({
  name,
  bio,
  image,
  coverImage,
  username,
}: UserProfileProps) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-0">
        <div className="relative">
          {/* Banner image */}
          <div className="relative w-full h-48">
            <Image
              src={
                coverImage
                  ? coverImage
                  : "/placeholder.svg?height=200&width=600"
              }
              alt={`${name}'s cover`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          {/* Profile picture */}
          <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 border-4 border-white">
            <AvatarImage
              src={image ? image : "/placeholder.svg?height=128&width=128"}
              alt={`${name}'s profile`}
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>

        <div className="pt-16 px-4 pb-4 mt-5">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-500">{username}</p>
          <p className="text-gray-500">{bio}</p>
          <div className="flex mt-4 space-x-4 text-sm text-gray-500">
            <span>
              <strong className="text-gray-900">1,234</strong> Following
            </span>
            <span>
              <strong className="text-gray-900">5,678</strong> Followers
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
