"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const LeftSidebar = () => {
  const pathname = usePathname();
  const session = useSession();

  // Cool but annoy 😥

  // useEffect(() => {
  //   if (session.data?.user) {
  //     toast.message(`Welcome back, ${session.data.user.name}`, {
  //       action: {
  //         label: "Close",
  //         onClick: () => {
  //           toast.dismiss();
  //         },
  //       },
  //     });
  //   }
  // });

  return (
    <section className="sticky left-0 top-0 hidden h-screen flex-col justify-between overflow-y-auto bg-zinc-100 p-4 pt-36 dark:bg-zinc-900 sm:flex lg:w-[266px]">
      <div className="flex h-full flex-col items-center justify-between gap-12">
        {/* Navbar */}

        <TooltipProvider>
          <div className="flex flex-col items-start gap-2">
            {sidebarLinks.map((link) => {
              return (
                <Tooltip delayDuration={100} key={link.label}>
                  <TooltipTrigger
                    asChild
                    className={cn(
                      "flex w-full items-center justify-start rounded-lg p-4 hover:no-underline",
                      {
                        "active-link-btn": pathname === link.route,
                      },
                    )}
                  >
                    <Link
                      href={link.route}
                      className={cn(
                        "flex w-full items-center justify-start gap-4 rounded-lg hover:no-underline",
                        {
                          "active-link-btn": pathname === link.route,
                        },
                      )}
                    >
                      <link.img
                        className={cn("h-6 w-6", {
                          "text-white": pathname === link.route,
                        })}
                      />
                      <span
                        className={cn(
                          "hidden font-spaceGrotesk text-lg font-extrabold lg:block",
                          {
                            "text-white": pathname === link.route,
                          },
                        )}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </TooltipTrigger>

                  <TooltipContent
                    side="right"
                    align="center"
                    sideOffset={5}
                    className="block lg:hidden"
                  >
                    {link.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>

        {/* Authentication */}
        <div className="flex w-full flex-col">
          {!session.data?.user ? (
            <div className="flex w-full flex-col items-start justify-center gap-2">
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full",
                })}
              >
                Sign In
              </Link>

              <Link
                href="/auth/register"
                className={buttonVariants({
                  variant: "tertiary",
                  className: "w-full",
                })}
              >
                Sign Up
              </Link>
            </div>
          ) : null}

          {session.data?.user && (
            <Button
              className="w-full"
              variant="tertiary"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
