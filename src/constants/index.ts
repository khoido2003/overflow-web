import {
  Briefcase,
  CircleHelp,
  Home,
  LucideIcon,
  StarIcon,
  Stars,
  StarsIcon,
  Tag,
  User,
  Users,
} from "lucide-react";

interface SidebarLink {
  img: LucideIcon;
  route: string;
  label: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    img: Home,
    route: "/",
    label: "Home",
  },
  {
    img: Users,
    route: "/community",
    label: "Community",
  },
  {
    img: StarIcon,
    route: "/collections",
    label: "Collections",
  },
  {
    img: Briefcase,
    route: "/jobs",
    label: "Find Jobs",
  },

  {
    img: Tag,
    route: "/tags",
    label: "Tags",
  },
  {
    img: User,
    route: "/profile",
    label: "Profile",
  },
  {
    img: CircleHelp,
    route: "/ask-question",
    label: "Ask a question",
  },
];
