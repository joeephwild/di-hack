import {
  HomeIcon,
  MicrophoneIcon,
  UserGroupIcon,
  ChipIcon,
  ChatAlt2Icon,
} from "@heroicons/react/solid";
import {
  chinese,
  dutch,
  english,
  france,
  german,
  korean,
  podcast1,
  podcast2,
  podcast3,
  polish,
  profile,
  spanish,
} from "../assets/images";

export const SidebarTab = [
  {
    name: "Learn",
    icons: HomeIcon,
    active: "learn",
    route: "/dashboard",
  },
  {
    name: "Podcast",
    icons: MicrophoneIcon,
    active: "podcast",
    route: "/podcast",
  },
  {
    name: "Communities",
    icons: UserGroupIcon,
    active: "community",
    route: "/communities",
  },
  {
    name: "Learn with AI",
    icons: ChipIcon,
    active: "test",
    route: "/aichat",
  },
  {
    name: "Chat",
    icons: ChatAlt2Icon,
    active: "chat",
    route: "/Chat",
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

export const languages = [
  {
    image: france,
    name: "French",
  },
  {
    image: english,
    name: "English",
  },
  {
    image: polish,
    name: "Polish",
  },
  {
    image: korean,
    name: "Korean",
  },
  {
    image: spanish,
    name: "Spanish",
  },
  {
    image: german,
    name: "German",
  },
  {
    image: chinese,
    name: "Chinese",
  },
  {
    image: dutch,
    name: "Dutch",
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
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbW5wcml3a2h2YXh6Z2J2cmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxMDU3NjQsImV4cCI6MjAxMTY4MTc2NH0.xSa5pqZBnbHxchWAu2xNyGUdYgH1ymo4j8P-_RuU2Rg
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbW5wcml3a2h2YXh6Z2J2cmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxMDU3NjQsImV4cCI6MjAxMTY4MTc2NH0.xSa5pqZBnbHxchWAu2xNyGUdYgH1ymo4j8P-_RuU2Rg
export const languageCommunity = [
  {
    name: "English",
    image:
      "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    num_people: 1200000000,
    message: [
      {
        role: "user",
        message: "Hello, AI!",
      },
    ],
    mentor: [],
    learner: [],
  },
  {
    name: "Mandarin Chinese",
    image:
      "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    num_people: 1100000000,
  },
  {
    name: "Spanish",
    image:
      "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    num_people: 460000000,
  },
  {
    name: "Hindi",
    image:
      "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    num_people: 600000000,
  },
  {
    name: "Arabic",
    image:
      "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    num_people: 310000000,
  },
  {
    name: "French",
    image:
      "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    num_people: 280000000,
  },
  {
    name: "Russian",
    image:
      "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    num_people: 260000000,
  },
];

export const quizDataKoreanToEnglish = [
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "안녕하세요",
    options: ["Hello", "Goodbye", "Thank you", "How are you?"],
    correctAnswer: "Hello",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "고양이는 집에 있어요.",
    options: [
      "The cat is at the store.",
      "The dog is outside.",
      "The cat is at home.",
      "The cat is on the tree.",
    ],
    correctAnswer: "The cat is at home.",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "오늘 날씨가 좋아요.",
    options: [
      "Today is Monday.",
      "Tomorrow will be rainy.",
      "The weather is nice today.",
      "I am going to the park.",
    ],
    correctAnswer: "The weather is nice today.",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "나는 한국 음식을 좋아해요.",
    options: [
      "I like Chinese food.",
      "I don't like pizza.",
      "I like Korean food.",
      "I prefer Italian cuisine.",
    ],
    correctAnswer: "I like Korean food.",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "저는 책을 읽고 있어요.",
    options: [
      "I am watching TV.",
      "I am reading a book.",
      "I am cooking dinner.",
      "I am going to the park.",
    ],
    correctAnswer: "I am reading a book.",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "우리 가족은 함께 저녁 식사를 합니다.",
    options: [
      "My family has breakfast together.",
      "My family has lunch at school.",
      "My family has dinner together.",
      "My family goes to the beach.",
    ],
    correctAnswer: "My family has dinner together.",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "나는 일곱 시에 일어납니다.",
    options: [
      "I wake up at seven.",
      "I go to bed at seven.",
      "I eat breakfast at seven.",
      "I have a meeting at seven.",
    ],
    correctAnswer: "I wake up at seven.",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "저는 여름 휴가를 즐겼어요.",
    options: [
      "I enjoyed my summer vacation.",
      "I am planning a winter trip.",
      "I don't like holidays.",
      "I am working during the summer.",
    ],
    correctAnswer: "I enjoyed my summer vacation.",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "이 공원은 아름답습니다.",
    options: [
      "This park is closed.",
      "This park is crowded.",
      "This park is beautiful.",
      "This park is far away.",
    ],
    correctAnswer: "This park is beautiful.",
  },
  {
    question: "Translate the following sentence to English:",
    sentenceKorean: "우리는 친구들과 함께 축구를 합니다.",
    options: [
      "We watch a movie.",
      "We play soccer with friends.",
      "We go shopping.",
      "We eat at a restaurant.",
    ],
    correctAnswer: "We play soccer with friends.",
  },
];
