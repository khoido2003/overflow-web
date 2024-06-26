import {
  Briefcase,
  CircleHelp,
  Eye,
  Home,
  LucideIcon,
  MessageCircle,
  StarIcon,
  Tag,
  ThumbsUp,
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

export const filterBarHomepage = [
  { name: "Newest", value: "newest" },
  { name: "Recommended", value: "recommended" },
  { name: "Frequent", value: "frequent" },
  { name: "Unanswered", value: "unanswered" },
];

export const Metric = [
  {
    title: "Votes",
    Icon: ThumbsUp,
  },
  {
    title: "Answers",
    Icon: MessageCircle,
  },
  {
    title: "Views",
    Icon: Eye,
  },
];

export const filterCommentsSection = [
  {
    name: "Highest Upvotes",
    value: "highest-upvotes",
  },
  {
    name: "Lowest Upvotes",
    value: "lowest-upvotes",
  },
  {
    name: "Most Recent",
    value: "most-recent",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
];
