import {
  HomeIcon,
  MicrophoneIcon,
  UserGroupIcon,
  ChipIcon,
  ChatAlt2Icon,
} from "@heroicons/react/solid";
import { podcast1, podcast2, podcast3, profile } from "../assets/images";

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
    name: "Learn with AI",
    icons: ChipIcon,
    active: "test",
    route: "/aiTest",
  },
  {
    name: "Chat",
    icons: ChatAlt2Icon,
    active: "chat",
    route: "/",
  },
];

export const mentors = [
  {
    image: profile,
    name: "Ariana Bush",
  },
  {
    image: profile,
    name: "Ariana Bush",
  },
  {
    image: profile,
    name: "Ariana Bush",
  },
  {
    image: profile,
    name: "Ariana Bush",
  },

  {
    image: profile,
    name: "Ariana Bush",
  },
  {
    image: profile,
    name: "Ariana Bush",
  },
];

export const Podcast = [
  {
    name: "Awesome Tech Talks",
    author: "Tech Enthusiast Productions",
    audio_file: "https://example.com/awesome_tech_talks_episode1.mp3",
    image: podcast1,
    desc: "Explore the rich tapestry of French culture through the enchanting world of la belle langue française.",
  },
  {
    name: "Awesome Tech Talks",
    author: "Tech Enthusiast Productions",
    audio_file: "https://example.com/awesome_tech_talks_episode1.mp3",
    image: podcast2,
    desc: "Explore the rich tapestry of French culture through the enchanting world of la belle langue française.",
  },
  {
    name: "Awesome Tech Talks",
    author: "Tech Enthusiast Productions",
    audio_file: "https://example.com/awesome_tech_talks_episode1.mp3",
    image: podcast3,
    desc: "Explore the rich tapestry of French culture through the enchanting world of la belle langue française.",
  },
  {
    name: "Awesome Tech Talks",
    author: "Tech Enthusiast Productions",
    audio_file: "https://example.com/awesome_tech_talks_episode1.mp3",
    image: podcast1,
    desc: "Explore the rich tapestry of French culture through the enchanting world of la belle langue française.",
  },
  {
    name: "Awesome Tech Talks",
    author: "Tech Enthusiast Productions",
    audio_file: "https://example.com/awesome_tech_talks_episode1.mp3",
    image: podcast2,
    desc: "Explore the rich tapestry of French culture through the enchanting world of la belle langue française.",
  },
  {
    name: "Awesome Tech Talks",
    author: "Tech Enthusiast Productions",
    audio_file: "https://example.com/awesome_tech_talks_episode1.mp3",
    image: podcast3,
    desc: "Explore the rich tapestry of French culture through the enchanting world of la belle langue française.",
  },
];
