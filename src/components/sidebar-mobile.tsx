"use client";

import { useMobileSidebar } from "@/stores/use-mobile-sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { logOut } from "@/actions/logout";
import Image from "next/image";

export const SidebarMobile = () => {
  const { isOpen, onClose, onOpen } = useMobileSidebar();

  const session = useSession();
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={() => onClose()}>
      <SheetContent>
        <SheetContent className="flex flex-col gap-16">
          <Link
            href="/"
            className="mt-5 flex items-center justify-center gap-2"
          >
            <Image
              src="/assets/logo.svg"
              width={23}
              height={23}
              alt="OverFlow"
            />

            <p className="font-spaceGrotesk text-2xl font-extrabold text-black dark:text-white">
              {" "}
              Code<span className="text-primary">Overflow</span>
            </p>
          </Link>

          <div className="flex flex-col items-center justify-between gap-12">
            {/* Navbar */}
            <div className="flex flex-col items-start gap-2">
              {sidebarLinks.map((link) => {
                return (
                  <Link
                    onClick={() => onClose()}
                    href={link.route}
                    className={cn(
                      "flex w-full items-center justify-start gap-4 rounded-lg p-4 hover:no-underline",
                      {
                        "active-link-btn": pathname === link.route,
                      },
                    )}
                    key={link.label}
                  >
                    <link.img
                      className={cn("h-6 w-6", {
                        "text-white": pathname === link.route,
                      })}
                    />
                    <span
                      className={cn(
                        "font-spaceGrotesk text-lg font-extrabold",
                        {
                          "text-white": pathname === link.route,
                        },
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

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
                    onClick={() => onClose()}
                  >
                    Sign In
                  </Link>

                  <Link
                    onClick={() => onClose()}
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
                  className="mt-10 w-full"
                  variant="tertiary"
                  onClick={async () => {
                    await logOut();
                    onClose();
                    window.location.reload();
                  }}
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </SheetContent>
    </Sheet>
  );
};
