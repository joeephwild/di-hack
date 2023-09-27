import { HomeIcon, MicrophoneIcon, UserGroupIcon, CpuChipIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

export const SidebarTab = [
  {
    name: "Learn",
    icons: HomeIcon,
    active: "learn",
    route: "/",
  },
  {
    name: "Podcast",
    icons: MicrophoneIcon,
    active: "podcast",
    route: "/",
  },
  {
    name: "Communities",
    icons: UserGroupIcon,
    active: "community",
    route: "/",
  },
  {
    name: "Ai Test",
    icons: CpuChipIcon,
    active: "test",
    route: "/",
  },
  {
    name: "Chat",
    icons: ChatBubbleBottomCenterTextIcon,
    active: "chat",
    route: "/",
  },
];
