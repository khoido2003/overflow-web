"use client";

import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { LogInIcon, LogOut, Settings, User, VenetianMask } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export const UserAvatar = () => {
  const session = useSession();

  // If current user is not logged in then show anonymous browsing session
  if (!session.data?.user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-9 w-9 cursor-pointer bg-white">
            <AvatarFallback className="">
              <Image
                src="/assets/images/user.png"
                className=""
                fill
                alt="User avatar"
              />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={15}
          className="mr-5 w-56 rounded-md px-4 py-2"
        >
          <DropdownMenuLabel className="flex items-center justify-start">
            <VenetianMask className="mr-2 h-4 w-4" />
            <span> Anonymous Browsing</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link href="/auth/login">
              <DropdownMenuItem className="cursor-pointer">
                <LogInIcon className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  //////////////////////////////////////////

  //If user has already logged in then show their profile
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer bg-white">
          <AvatarImage src={session?.data?.user.image || ""} />
          <AvatarFallback>
            <Image src="/assets/images/user.png" fill alt="User avatar" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={15}
        className="mr-5 w-56 rounded-md px-4 py-2"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href={`/profile/${session.data.user.id}`}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/profile/edit">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              await signOut();
              window.location.reload();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
