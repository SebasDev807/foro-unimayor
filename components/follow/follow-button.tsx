"use client";
import { useState, useTransition, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { followUserToggle } from "@/actions/user-follow";
import { toast } from "sonner";
import { User } from "@prisma/client";

interface FollowButtonProps {
  user: User;
  currentUser: User | null;
}

export const FollowButton = ({ user, currentUser }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.followingIds.includes(user.id) ?? false
  );
  const [pending, startTransition] = useTransition();

  const handleFollowClick = useCallback(() => {
    startTransition(() => {
      followUserToggle(user)
        .then((result) => {
          if (result.error) {
            toast.error(result.message);
            // eslint-disable-next-line brace-style
          } else {
            setIsFollowing((prev) => !prev);
            toast.success(result.message);
          }
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    });
  }, [user]);

  return (
    <Button
      variant={isFollowing ? "danger" : "default"}
      className="text-sm px-3 py-1"
      onClick={handleFollowClick}
      disabled={pending}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
