import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "./follow-button";

export const Cart = ({ user, currentUser }) => {
  return (
    <div
      key={user.id}
      className="flex flex-row gap-4 justify-between items-center"
    >
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={user.image ?? "/default-avatar.png"}
            alt={user.name ?? ""}
          />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-gray-700 font-semibold text-sm">{user.name}</p>
          <p className="text-gray-500 text-sm">@{user.username}</p>
        </div>
      </div>
      <FollowButton user={user} currentUser={currentUser} />
    </div>
  );
};
