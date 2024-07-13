"use client";

import { formatTimeToNow } from "@/lib/utils";
import { GetQuestion } from "@/types/question.types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MetricComponent } from "./metric";
import {
  EllipsisVerticalIcon,
  Eye,
  MessageCircle,
  PencilIcon,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import TagCard from "./tag-card";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface QuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question: GetQuestion;
  isBookmarked?: boolean;
}

export const QuestionCard = ({
  question,
  isBookmarked,
  onClick,
  ...props
}: QuestionCardProps) => {
  const session = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Delete question
  const { mutate: deleteQuestion, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/questions/${question.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
        },
      );

      const data = await response.json();

      return data;
    },

    retry: 3,
    onSuccess: () => {
      toast.success("Delete question successfully!");
      router.push("/profile");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete question!");
      setIsOpen(false);
    },
  });

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <div
      {...props}
      onClick={onClick}
      className="flex flex-col gap-6 rounded-lg bg-zinc-100 p-9 dark:bg-zinc-900 sm:px-11"
    >
      <div className="flex flex-col items-start gap-3">
        {/*  */}

        {/* Link to detail question by Id */}
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/question/${question.id}`}
            className="block cursor-pointer"
          >
            <h3 className="line-clamp-1 text-xl font-bold">{question.title}</h3>
          </Link>

          {session.data?.user.id === question.author.id && (
            <Dialog
              open={isOpen}
              onOpenChange={() => setIsOpen((open) => !open)}
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer hover:text-white/80" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="">
                  <DropdownMenuItem>
                    <Link
                      className="flex w-full items-center gap-1.5"
                      href={`/question/edit/${question.id}`}
                    >
                      <PencilIcon className="h-4 w-4" />

                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <DialogTrigger className="flex w-full cursor-pointer items-center gap-1.5">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your questions and remove relevant data from our
                        servers.
                      </DialogDescription>

                      <DialogFooter className="flex gap-1">
                        <DialogClose>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button
                          onClick={() => deleteQuestion()}
                          type="submit"
                          disabled={isPending}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Dialog>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {question.tagOnQuestion.map((item) => {
            return <TagCard key={item.tag.id} tag={item.tag} />;
          })}
        </div>
      </div>

      <div className="mt-2 flex w-full flex-wrap justify-between gap-4">
        {/* Link to user profile */}
        <Link
          href={`/profile/${question.author.id}`}
          className="cursor-pointer"
        >
          <div className="flex flex-wrap items-center justify-start gap-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={question.author.image!} className="" />
              <AvatarFallback>
                <Image src="/assets/images/user.png" fill alt="User avatar" />
              </AvatarFallback>
            </Avatar>
            <p className="text-xs font-bold">{question.author.name}</p>
            <span className="hidden sm:block">•</span>
            <p className="hidden text-xs sm:block">
              asked {formatTimeToNow(question.createdAt)}
            </p>
          </div>
        </Link>

        {/* Likes count */}
        <div className="flex items-center justify-start gap-4">
          <MetricComponent
            Icon={ThumbsUp}
            title="Votes"
            value={question.userUpvotes.length}
          />

          {/* Comments count */}
          <MetricComponent
            Icon={MessageCircle}
            title="Answers"
            value={question.userAnswers.length}
          />

          {/* View counts */}
          <MetricComponent Icon={Eye} title="Views" value={question.views} />
        </div>
      </div>
    </div>
  );
};
