import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";

import { CalendarDays, Link, MapPin } from "lucide-react";
import { formatTimeJoined } from "@/lib/utils";

import InfoLink from "./info-link";

const ProfileCard = ({ userInfo }: { userInfo: User }) => {
  return (
    <div>
      <div className="flex flex-col gap-3 text-[#212734] dark:text-whiteSecondary lg:flex-row lg:items-center lg:gap-5">
        <div>
          <Image
            src={userInfo.image || "/assets/images/user-pro.png"}
            alt="Avatar Image"
            width={140}
            height={140}
            className="h-[100px] w-[100px] rounded-full border-[3px] border-primary object-center lg:h-[140px] lg:w-[140px]"
          />
        </div>
        <div className="relative flex flex-col gap-5 lg:gap-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0F1117] dark:text-whitePrimary lg:text-3xl">
              {userInfo.name}
            </h1>
            {userInfo.username && (
              <p className="profile-link text-sm font-semibold lg:text-base">
                @{userInfo.username}
              </p>
            )}
          </div>

          <ul className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4 lg:gap-6">
            {userInfo.portfolioWebsite && (
              <InfoLink
                content={userInfo.portfolioWebsite}
                icon={Link}
                isLink
                link={userInfo.portfolioWebsite}
              />
            )}

            {userInfo.location && (
              <InfoLink content={userInfo.location} icon={MapPin} />
            )}
            <InfoLink
              content={`Joined ${formatTimeJoined(userInfo.joinedAt as Date)}`}
              icon={CalendarDays}
            />
          </ul>
        </div>
      </div>
      {userInfo.bio && (
        <p className="mt-5 max-w-3xl text-base lg:text-base">{userInfo.bio}</p>
      )}
    </div>
  );
};

export default ProfileCard;
