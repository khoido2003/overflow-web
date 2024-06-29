import { CalendarDays, Link, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import InfoLink from "./info-link";

const ProfileCard = () => {
  return (
    <>
      <div className="text-whiteSecondary flex items-center gap-5">
        <div>
          <Image
            src="/assets/images/user-pro.png"
            alt="Avatar Image"
            width={140}
            height={140}
          />
        </div>
        <div className="relative flex flex-col gap-5">
          <div>
            <h1 className="text-whitePrimary text-3xl font-bold tracking-tight">
              Sujata | JS Mastery
            </h1>
            <p className="text-base font-normal text-[#7B8EC8]">@sujata</p>
          </div>

          <ul className="flex items-center gap-8">
            <InfoLink
              content="jsmastery"
              icon={Link}
              isLink
              link="https://www.jsmastery.pro/"
            />

            <InfoLink content="India" icon={MapPin} />
            <InfoLink content="Joined 2 years ago" icon={CalendarDays} />
          </ul>
        </div>
      </div>

      <p className="text-whiteSecondary m-5 max-w-3xl text-sm">
        Launch your development career with project-based coaching - showcase
        your skills with practical development experience and land the coding
        career of your dreams. Check out jsmastery.pro
      </p>
    </>
  );
};

export default ProfileCard;
