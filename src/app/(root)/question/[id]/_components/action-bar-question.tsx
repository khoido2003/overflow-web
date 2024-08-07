"use client";

import Image from "next/image";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { formatAndDivideNumber } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const session = useSession();

  const router = useRouter();

  // Upvote question state
  const [hasUpvotedState, setHasUpvotedState] = useState(hasUpvoted);
  const [upvotesCountState, setUpvotesCountState] = useState(upvotesCount);

  // Downvote question state
  const [hasDownvotedState, setHasDownvotedState] = useState(hasDownvoted);
  const [downvotesCountState, setDownvotesCountState] =
    useState(downvotesCount);

  // Bookmark question state
  const [bookmarkState, setBookmarkState] = useState(hasBookmarked);

  // Upvote question
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
      if (hasUpvotedState === true) {
        setHasUpvotedState(false);
        setUpvotesCountState((upvotesCountState) => upvotesCountState - 1);
      } else {
        setHasUpvotedState(true);
        setUpvotesCountState((upvotesCountState) => upvotesCountState + 1);
        if (hasDownvotedState === true) {
          setHasDownvotedState(false);
          setDownvotesCountState(
            (downvotesCountState) => downvotesCountState - 1,
          );
        }
      }
    },
    onError: () => {
      toast("Something went wrong! Try again later");
    },
  });

  // Downvote question
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
      if (hasDownvotedState === true) {
        setHasDownvotedState(false);
        setDownvotesCountState(
          (downvotesCountState) => downvotesCountState - 1,
        );
      } else {
        setHasDownvotedState(true);
        setDownvotesCountState(
          (downvotesCountState) => downvotesCountState + 1,
        );
        if (hasUpvotedState === true) {
          setHasUpvotedState(false);
          setUpvotesCountState(
            (downvotesCountState) => downvotesCountState - 1,
          );
        }
      }
    },
    onError: () => {
      toast("Something went wrong! Try again later");
    },
  });

  // Bookmark question
  const { mutate: bookmark, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_REQUEST_PREFIX}/questions/bookmark`, {
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
      return data.message;
    },

    retry: 3,

    onError: () => {
      toast.error(
        "An error occurred while trying to bookmark question! Try again later.",
      );
    },

    onSuccess: () => {
      if (bookmarkState === true) {
        setBookmarkState(false);
      } else setBookmarkState(true);
    },
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
              hasUpvotedState
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
          />
        </Button>
        <span className="flex aspect-square h-6 w-6 items-center justify-center rounded-md bg-zinc-200 px-2 text-center dark:bg-zinc-700">
          {formatAndDivideNumber(upvotesCountState)}
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
              hasDownvotedState
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
          />
        </Button>
        <span className="flex aspect-square h-6 w-6 items-center justify-center rounded-md bg-zinc-200 px-2 text-center dark:bg-zinc-700">
          {formatAndDivideNumber(downvotesCountState)}
        </span>
      </div>

      <Image
        src={
          bookmarkState
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        width={18}
        height={18}
        alt="star"
        className="cursor-pointer"
        onClick={() => bookmark()}
      />
    </div>
  );
};
