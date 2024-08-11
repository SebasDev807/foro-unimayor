import { getAllUsers } from "@/prisma/queries";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const FollowBar = async () => {
  const users = await getAllUsers();

  return (
    <div className="px-6 py-6 hidden lg:block">
      <div className="rounded-xl p-4">
        <h2 className="text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user) => (
            <div key={user.id} className="flex flex-row gap-4 justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-gray-700 font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                </div>
              </div>
              <Button variant="primaryOutline">Follow</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
