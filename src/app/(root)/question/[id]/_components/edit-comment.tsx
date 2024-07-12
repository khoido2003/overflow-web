"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetAllAnswers } from "@/types/answer-question";
import { EllipsisVerticalIcon, PencilIcon, Trash2 } from "lucide-react";
import { EditorEditComment } from "./editor-comment";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { toast } from "sonner";

interface EditCommentProps {
  answer: GetAllAnswers;
}

const EditComment = ({ answer }: EditCommentProps) => {
  const session = useSession();
  const router = useRouter();

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const { mutate: deleteAnswer, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/answers/${answer.id}`,
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
      toast.success("Delete answer successfully!");
      router.push("/profile");
      setIsOpenDelete(false);
    },
    onError: () => {
      toast.error("Failed to delete answer!");
      setIsOpenDelete(false);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer hover:text-white/80" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <Dialog
            open={isOpenEdit}
            onOpenChange={() => setIsOpenEdit((open) => !open)}
          >
            <DialogTrigger className="flex w-full cursor-pointer items-center gap-1.5">
              <PencilIcon className="h-4 w-4" />
              <span>Edit</span>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>Edit comment</DialogTitle>
              <EditorEditComment
                answer={answer}
                handleCloseModel={setIsOpenEdit}
              />
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <Dialog
            open={isOpenDelete}
            onOpenChange={() => setIsOpenDelete((open) => !open)}
          >
            <DialogTrigger className="flex w-full cursor-pointer items-center gap-1.5">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                answers and remove relevant data from our servers.
              </DialogDescription>

              <DialogFooter className="flex gap-1">
                <DialogClose>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button
                  onClick={() => deleteAnswer()}
                  type="submit"
                  disabled={isPending}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditComment;
