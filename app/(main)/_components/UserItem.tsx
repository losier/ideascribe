"use client";

import { useEffect, useState } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";

import { ChevronsLeftRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { avtMessage } from "@/assets/textMsg";

export const UserItem = () => {
  const user = useUser();

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let storedMessage = sessionStorage.getItem("avtMessage");
    if (!storedMessage) {
      storedMessage = avtMessage[Math.floor(Math.random() * avtMessage.length)];
      sessionStorage.setItem("avtMessage", storedMessage);
    }
    setMessage(storedMessage);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={user.user?.imageUrl}
                alt={`${user.user?.firstName}'s Avatar`}
              />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              <strong>{user.user?.firstName}</strong> {message}
            </span>
          </div>
          <ChevronsLeftRight className="w-5 h-5 ml-2 text-muted-foreground rotate-90" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex items-center gap-x-2">
          <div className="rounded-md bg-secondary p-1">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.user?.imageUrl}
                alt={`${user.user?.firstName}'s Avatar`}
              />
            </Avatar>
          </div>
          <div className="space-y-1">
            <p className="font-medium">
              {user.user?.firstName} {user.user?.lastName}
            </p>
            <p className="text-sm line-clamp-1 text-muted-foreground">
              {user.user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="w-full cursor-pointer">
          <SignOutButton>
            <Button variant="destructive" className="w-full">
              Sign Out
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
