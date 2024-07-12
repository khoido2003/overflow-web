"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import {
  DeleteAccountPayload,
  DeleteAccountValidator,
} from "@/lib/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const DeleteAccount = () => {
  const session = useSession();
  const router = useRouter();

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: async (values: DeleteAccountPayload) => {
      const resposne = await fetch(
        `${API_REQUEST_PREFIX}/account/${session.data?.user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
          body: JSON.stringify(values),
        },
      );

      const data = await resposne.json();

      return data;
    },

    retry: 3,

    onError() {
      toast.error("Something went wrong! Try again later.");
    },

    async onSuccess(data) {
      if (data.error.code === 401) {
        toast.error("Invalid password. Please try again.");
        return;
      }

      toast.success("Your account has been deleted!");
      await signOut();
      router.push("/");
    },
  });

  const form = useForm<DeleteAccountPayload>({
    resolver: zodResolver(DeleteAccountValidator),

    defaultValues: {
      password: "",
    },
  });

  if (session.status === "loading") {
    return (
      <div>
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const onSubmit = (values: DeleteAccountPayload) => {
    deleteAccount(values);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-red-600">Delete account</h3>

      <div className="flex flex-col gap-3">
        <p>
          Once you delete your account, there is no going back. Please be
          certain
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-fit bg-zinc-200 text-red-600 dark:bg-zinc-900"
            >
              Delete your account
            </Button>
          </DialogTrigger>

          <Form {...form}>
            <DialogContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem className="mt-5">
                        <FormLabel>
                          {" "}
                          To confirm, enter your password in the box below:
                        </FormLabel>
                        <FormControl>
                          <div className="mt-2 flex flex-col gap-2">
                            <Input {...field} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    );
                  }}
                />

                <DialogFooter className="mt-2">
                  <DialogClose>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button type="submit" variant="destructive">
                    Delete Account
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Form>
        </Dialog>
      </div>
    </div>
  );
};
