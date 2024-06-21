import { auth } from "@/auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

export const UserAvatar = async () => {
  const session = await auth();

  if (!session) return null;

  console.log(session.user.image);

  return (
    <Link href="/profile">
      <Avatar className="h-9 w-9 bg-white">
        <AvatarImage src={session?.user.image || ""} />
        <AvatarFallback>
          <Image src="/assets/images/user.png" fill alt="User avatar" />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};
