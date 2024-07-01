"use client";

import Image from "next/image";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { formatAndDivideNumber } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ActionBarProps {
  upvotesCount: number;
  downvotesCount: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasBookmarked: boolean;
  questionId: string;
}

export const ActionBarQuestion = ({
  downvotesCount,
  hasBookmarked,
  hasDownvoted,
  hasUpvoted,
  upvotesCount,
  questionId,
}: ActionBarProps) => {
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const session = useSession();

  const router = useRouter();

  const { mutate: upvoteQuestion, isPending: isUpvoting } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_REQUEST_PREFIX}/questions/upvotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
        body: JSON.stringify({
          questionId,
          userId: session.data?.user.id,
        }),
      });
      const data = await response.json();
      return data;
    },
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
    onError: () => {},
  });

  const { mutate: downvoteQuestion, isPending: isDownvoting } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/questions/downvotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
          body: JSON.stringify({
            questionId,
            userId: session.data?.user.id,
          }),
        },
      );
      const data = await response.json();
      return data;
    },
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
    onError: () => {},
  });

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Upvotes count*/}
      <div className="flex items-center justify-center gap-1">
        <Button
          className="p-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => {
            if (!session.data?.user) {
              toast("You must be logged in to perform this action!", {
                action: {
                  label: "Login",
                  onClick: () => {
                    router.push("/auth/login");
                  },
                },
              });
            } else upvoteQuestion();
          }}
        >
          <Image
            src={
              hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
          />
        </Button>
        <span className="flex aspect-square items-center justify-center rounded-md bg-zinc-200 px-2 text-center dark:bg-zinc-700">
          {formatAndDivideNumber(upvotesCount)}
        </span>
      </div>

      {/* Downvotes count*/}
      <div className="flex items-center justify-center gap-1">
        <Button
          className="p-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => {
            if (!session.data?.user) {
              toast("You must be logged in to perform this action!", {
                action: {
                  label: "Login",
                  onClick: () => {
                    router.push("/auth/login");
                  },
                },
              });
            } else downvoteQuestion();
          }}
        >
          <Image
            src={
              hasDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
          />
        </Button>
        <span className="flex aspect-square items-center justify-center rounded-md bg-zinc-200 px-2 text-center dark:bg-zinc-700">
          {formatAndDivideNumber(downvotesCount)}
        </span>
      </div>

      <Image
        src={
          hasBookmarked
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        width={18}
        height={18}
        alt="star"
        className="cursor-pointer"
      />
    </div>
  );
};
