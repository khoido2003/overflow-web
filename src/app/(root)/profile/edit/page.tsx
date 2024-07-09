"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { EditProfilePayload, EditProfileValidator } from "@/lib/schemas/form";
import { UserProfile } from "@/types/user-profile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InfoLink from "../_components/info-link";
import { formatTimeJoined } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { EditProfileLoading } from "@/components/loading/edit-profile-loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const session = useSession();
  const router = useRouter();

  const {
    data: userInfo,
    isLoading,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: ["user-info", session.data?.user.id],
    queryFn: async () => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/users/${session.data?.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
        },
      );

      const data = await response.json();
      return data.data as UserProfile;
    },

    staleTime: 0,
    retry: 3,
  });

  const form = useForm<EditProfilePayload>({
    resolver: zodResolver(EditProfileValidator),
    defaultValues: {
      name: userInfo?.name || undefined,
      email: userInfo?.email || undefined,
      username: userInfo?.username || undefined,
      bio: userInfo?.bio || undefined,
      portfolioWebsite: userInfo?.portfolioWebsite || undefined,
      location: userInfo?.location || undefined,
    },
  });

  // Since the react hook form did not re-render so we need to force it re-render to receive the lastest data
  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name,
        email: userInfo.email,
        username: userInfo.username || undefined,
        bio: userInfo.bio || undefined,
        portfolioWebsite: userInfo.portfolioWebsite || undefined,
        location: userInfo.location || undefined,
      });
    }
  }, [userInfo, form]);

  const { mutate: submitForm, isPending: formSubmiting } = useMutation({
    mutationFn: async ({
      email,
      name,
      bio,
      location,
      portfolioWebsite,
      username,
    }: EditProfilePayload) => {
      const values = { email, name, bio, location, portfolioWebsite, username };

      const response = await fetch(
        `${API_REQUEST_PREFIX}/users/${session.data?.user.id}?userId=${session.data?.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();
      return data.data as EditProfilePayload;
    },
    retry: 3,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Update profile successfully!");
      router.push(`/profile`);
    },
  });

  const onSubmit = (values: EditProfilePayload) => {
    submitForm(values);
  };

  if (!session || isLoading || isFetching || isPending)
    return <EditProfileLoading />;

  return (
    <div className="flex items-start justify-evenly gap-3">
      <div className="flex h-full flex-col items-start justify-center gap-6">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-bold">Edit profile</h1>

          <Link
            href="/profile/edit/avatar"
            className={buttonVariants({
              className: "block text-xs sm:hidden",
              size: "sm",
            })}
          >
            Change Avatar
          </Link>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center gap-3"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="w-80 max-w-80">
                    <FormLabel>
                      Name <span className="text-primary">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={
                          isLoading || isPending || isFetching || formSubmiting
                        }
                        className="py-5"
                        {...field}
                        placeholder="Your name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="w-80 max-w-80">
                    <FormLabel>
                      Email{" "}
                      <span className="text-primary">(Can&apos;t change)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        className="py-5"
                        type="email"
                        placeholder="Your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem className="w-80 max-w-80">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading || isPending || isFetching}
                        className="py-5"
                        {...field}
                        placeholder="Your username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => {
                return (
                  <FormItem className="w-80 max-w-80">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading || isPending || isFetching}
                        className="py-5"
                        {...field}
                        placeholder="Where do you live?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => {
                return (
                  <FormItem className="w-80 max-w-80">
                    <FormLabel>
                      Bio <span className="text-primary"></span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading || isPending || isFetching}
                        className="py-5"
                        {...field}
                        placeholder="Tell us something about you...."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Portfolio */}
            <FormField
              control={form.control}
              name="portfolioWebsite"
              render={({ field }) => {
                return (
                  <FormItem className="w-80 max-w-80">
                    <FormLabel>Portfolio Link</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading || isPending || isFetching}
                        className="py-5"
                        {...field}
                        placeholder="Your portfolio link"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="mt-4 self-end">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="hidden flex-col items-center gap-4 sm:flex">
        <div className="group relative z-20 block">
          <Image
            src={userInfo?.image || "/default-avatar.png"}
            width={120}
            height={120}
            className="block aspect-square rounded-full ring-2 ring-primary"
            alt="Profile avatar"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link
              href="/profile/edit/avatar"
              className="text-sm font-semibold text-white"
            >
              Edit Avatar
            </Link>
          </div>
        </div>

        {/* <p className="text-sm font-bold">Profile picture</p> */}
        {userInfo?.joinedAt && (
          <InfoLink
            content={`Joined ${formatTimeJoined(userInfo?.joinedAt as Date)}`}
            icon={CalendarDays}
          />
        )}
      </div>
    </div>
  );
};

export default EditProfile;
