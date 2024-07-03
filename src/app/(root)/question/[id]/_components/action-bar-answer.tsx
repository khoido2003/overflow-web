"use client";

import { Button } from "@/components/ui/button";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { formatAndDivideNumber } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ActionBarAnswerProps {
  upvotesCount: number;
  downvotesCount: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  answerId: string;
}

export const ActionBarAnswer = ({
  downvotesCount,
  hasDownvoted,
  hasUpvoted,
  upvotesCount,
  answerId,
}: ActionBarAnswerProps) => {
  const session = useSession();
  const router = useRouter();

  const [hasUpvotedState, setHasUpvotedState] = useState(hasUpvoted);
  const [hasDownvotedState, setHasDownvotedState] = useState(hasDownvoted);
  const [upvotesCountState, setUpvotesCountState] = useState(upvotesCount);
  const [downvotesCountState, setDownvotesCountState] =
    useState(downvotesCount);

  const { mutate: upvotesAnswer } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_REQUEST_PREFIX}/answers/upvotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
        body: JSON.stringify({
          userId: session.data?.user.id,
          questionAnsweredId: answerId,
        }),
      });

      const data = await response.json();

      return data;
    },

    onSuccess() {
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

    onError() {
      toast("Something went wrong! Try again later");
    },

    retry: 3,
  });

  const { mutate: downvotesAnswer } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_REQUEST_PREFIX}/answers/downvotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
        body: JSON.stringify({
          userId: session.data?.user.id,
          questionAnsweredId: answerId,
        }),
      });

      const data = await response.json();

      return data;
    },

    onSuccess() {
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

    onError() {
      toast("Something went wrong! Try again later");
    },

    retry: 3,
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
            } else upvotesAnswer();
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
            } else downvotesAnswer();
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
    </div>
  );
};