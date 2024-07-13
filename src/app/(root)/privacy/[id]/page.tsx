"use client";

import { Button } from "@/components/ui/button";
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
  PrivacyCenterOauthPayload,
  PrivacyCenterOauthValidator,
  PrivacyCenterCredentialsValidator,
  PrivacyCenterCrendetialsPayload,
} from "@/lib/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DeleteAccount } from "../_components/delete-account";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const session = useSession();

  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [toggleOldPassword, setToggleOldPassword] = useState<boolean>(false);

  const router = useRouter();

  if (session.status !== "loading" && session.data?.user.id !== params.id) {
    router.push("/");
  }

  // Form for user login in with oauth
  const formOauth = useForm<PrivacyCenterOauthPayload>({
    resolver: zodResolver(PrivacyCenterOauthValidator),
    defaultValues: {
      newPassword: "",
      passwordConfirm: "",
    },
  });

  // Form for user using credentials
  const formCredentials = useForm<PrivacyCenterCrendetialsPayload>({
    resolver: zodResolver(PrivacyCenterCredentialsValidator),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
  });

  // Check is the current user using Oaut or Credentials
  const {
    data: userOauth,
    isPending,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      "privacy",
      params.id,
      session.data?.user.token,
      session.data?.user.id,
    ],
    queryFn: async () => {
      const response = await fetch(`${API_REQUEST_PREFIX}/oauth/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
      });
      const data = await response.json();
      return data;
    },
    staleTime: 0,
    retry: 3,
  });

  // Credentials
  const {
    mutate: updatePasswordCredentials,
    isPending: updateCredentialsLoading,
  } = useMutation({
    mutationFn: async (values: PrivacyCenterCrendetialsPayload) => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/newPassword/credentials/${session.data?.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json();
      return data;
    },

    retry: 3,

    onError: () => {
      toast.error("Failed to change password. Please try again later!");
    },

    onSuccess: (data) => {
      if (data?.error && data?.error.code === 401) {
        toast.error("Invalid old password. Please try again!");
        return;
      }

      if (data?.error && data?.error.code === 404) {
        toast.error("User no longer exists. Please try again!");
        return;
      }

      toast.success("Change password sucessfully!");
      formCredentials.reset({
        oldPassword: "",
        newPassword: "",
        passwordConfirm: "",
      });
    },
  });

  const { mutate: updatePasswordOauth, isPending: updateOauthLoading } =
    useMutation({
      mutationFn: async (values: PrivacyCenterOauthPayload) => {
        const response = await fetch(
          `${API_REQUEST_PREFIX}/newPassword/oauth/${session.data?.user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.data?.user.token}`,
            },
            body: JSON.stringify(values),
          },
        );
        const data = await response.json();
        return data;
      },

      retry: 3,

      onError: () => {
        toast.error("Failed to change password. Please try again later!");
      },

      onSuccess: () => {
        toast.success("Change password sucessfully!");
        formOauth.reset({
          newPassword: "",
          passwordConfirm: "",
        });
      },
    });

  const togglePasswordMode = () => {
    setTogglePassword((mode) => !mode);
  };

  const toggleOldPasswordMode = () => {
    setToggleOldPassword((mode) => !mode);
  };

  // Submit form if user login with credentials
  const onSubmitCredentials = (values: PrivacyCenterCrendetialsPayload) => {
    updatePasswordCredentials(values);
  };

  // Submit form if user login with Oauth
  const onSubmitOauth = (values: PrivacyCenterOauthPayload) => {
    console.log(formOauth);

    updatePasswordOauth(values);
  };

  return (
    <div className="flex flex-col gap-7">
      <h1 className="w-fit rounded-lg bg-zinc-200 px-5 py-2 text-2xl font-bold dark:bg-zinc-900">
        Privacy center
      </h1>

      <div className="h-[1px] w-full rounded-lg bg-zinc-200 dark:bg-zinc-700"></div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Change password</h3>

        {isPending ||
          isLoading ||
          isFetching ||
          (session.status === "loading" && (
            <div>
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ))}

        {!!userOauth?.data ? (
          // Form for user sign in with Oauth
          <Form {...formOauth}>
            <form
              onSubmit={formOauth.handleSubmit(onSubmitOauth)}
              className="flex max-w-96 flex-col gap-3"
            >
              <FormField
                control={formOauth.control}
                name="newPassword"
                render={({ field }) => {
                  // console.log(field);

                  console.log(formOauth.getValues());

                  return (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={togglePassword ? "text" : "password"}
                            disabled={isPending || updateCredentialsLoading}
                            placeholder="Enter your new password"
                          />
                          {togglePassword ? (
                            <EyeIcon
                              onClick={togglePasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          ) : (
                            <EyeOff
                              onClick={togglePasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={formOauth.control}
                name="passwordConfirm"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password Confirm</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={togglePassword ? "text" : "password"}
                            disabled={isPending || updateOauthLoading}
                            placeholder="Re-enter your new password"
                          />
                          {togglePassword ? (
                            <EyeIcon
                              onClick={togglePasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          ) : (
                            <EyeOff
                              onClick={togglePasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  );
                }}
              />

              <Button
                disabled={updateOauthLoading || isPending}
                type="submit"
                className="mt-3"
              >
                Submit
              </Button>
            </form>
          </Form>
        ) : (
          //////////////////////////////////////////////

          // Form for user sign in with Credentials
          <Form {...formCredentials}>
            <form
              onSubmit={formCredentials.handleSubmit(onSubmitCredentials)}
              className="flex max-w-96 flex-col gap-3"
            >
              <FormField
                control={formCredentials.control}
                name="oldPassword"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={toggleOldPassword ? "text" : "password"}
                            disabled={isPending || updateCredentialsLoading}
                            placeholder="Enter your old password"
                          />
                          {toggleOldPassword ? (
                            <EyeIcon
                              onClick={toggleOldPasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          ) : (
                            <EyeOff
                              onClick={toggleOldPasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={formCredentials.control}
                name="newPassword"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={togglePassword ? "text" : "password"}
                            disabled={isPending || updateCredentialsLoading}
                            placeholder="Enter your new password"
                          />
                          {togglePassword ? (
                            <EyeIcon
                              onClick={togglePasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          ) : (
                            <EyeOff
                              onClick={togglePasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={formCredentials.control}
                name="passwordConfirm"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password Confirm</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={togglePassword ? "text" : "password"}
                            disabled={isPending || updateCredentialsLoading}
                            placeholder="Re-enter your new password"
                          />
                          {togglePassword ? (
                            <EyeIcon
                              onClick={togglePasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          ) : (
                            <EyeOff
                              onClick={togglePasswordMode}
                              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  );
                }}
              />

              <Button
                disabled={isPending || updateCredentialsLoading}
                type="submit"
                className="mt-3"
              >
                Submit
              </Button>
            </form>
          </Form>
        )}
      </div>

      <div className="h-[2px] w-full rounded-lg bg-zinc-200 dark:bg-zinc-700"></div>

      <DeleteAccount />
    </div>
  );
};

export default Page;
