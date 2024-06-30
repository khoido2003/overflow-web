import { CalendarDays, Link, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import InfoLink from "./info-link";
import { UserProfile } from "@/types/user-profile.types";
import { formatTimeJoined, formatTimeToNow } from "@/lib/utils";

const ProfileCard = ({ user }: { user: UserProfile }) => {
  return (
    <div>
      <div className="flex flex-col gap-3 text-whiteSecondary lg:flex-row lg:items-center lg:gap-5">
        <div>
          <Image
            src={user.image || "/assets/images/user-pro.svg"}
            alt="Avatar Image"
            width={140}
            height={140}
            className="h-[100px] w-[100px] rounded-full border-[3px] border-[#FF7000] object-center lg:h-[140px] lg:w-[140px]"
          />
        </div>
        <div className="relative flex flex-col gap-3 lg:gap-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-whitePrimary lg:text-3xl">
              {user.name}
            </h1>
            {user.username && (
              <p className="text-base font-normal text-purpleLink">
                @{user.username}
              </p>
            )}
          </div>

          <ul className="flex flex-wrap items-center gap-8">
            {user.portfolioWebsite && (
              <InfoLink
                content={user.portfolioWebsite}
                icon={Link}
                isLink
                link={user.portfolioWebsite}
              />
            )}

            {user.location && (
              <InfoLink content={user.location} icon={MapPin} />
            )}
            <InfoLink
              content={`Joined ${formatTimeJoined(user.joinedAt as Date)}`}
              icon={CalendarDays}
            />
          </ul>
        </div>
      </div>
      {user.bio && (
        <p className="m-5 max-w-3xl text-base text-whiteSecondary">
          {user.bio}
        </p>
      )}
    </div>
  );
};

export default ProfileCard;
