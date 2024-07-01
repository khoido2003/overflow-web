import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface InfoLinkProps {
  content: string;
  icon: LucideIcon;
  isLink?: boolean;
  link?: string;
}

const InfoLink = ({ content, icon: Icon, isLink, link }: InfoLinkProps) => {
  if (isLink && link)
    return (
      <Link href={link} target="_blank">
        <li className="flex max-w-[200px] items-center gap-2 text-base font-semibold md:truncate">
          <span>
            <Icon className="profile-link h-4 w-4" />
          </span>
          {content}
        </li>
      </Link>
    );

  return (
    <li className="flex items-center gap-2 text-base font-semibold">
      <span>
        <Icon className="profile-link h-4 w-4" />
      </span>
      {content}
    </li>
  );
};

export default InfoLink;
