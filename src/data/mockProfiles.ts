export type Profile = {
  id: number;
  name: string;
  age: number;
  origin: string;
  location: string;
  languages: string;
  intent: string;
  verified: boolean;
  safeChat: boolean;
  area: string;
  accent: string;
  matchReasons: string[];
};

export const appName = "Verified Dating";

export const profiles: Profile[] = [
  {
    id: 1,
    name: "Alex",
    age: 29,
    origin: "United States",
    location: "Tokyo",
    languages: "English / 日本語少し",
    intent: "Looking for Dating",
    verified: true,
    safeChat: true,
    area: "Same area, approximate",
    accent: "from-rose-500 via-amber-300 to-sky-500",
    matchReasons: [
      "会うまでのペースが近い",
      "話せる言語が合う",
      "認証済みプロフィール",
    ],
  },
  {
    id: 2,
    name: "Ren",
    age: 31,
    origin: "Japan",
    location: "Tokyo",
    languages: "日本語 / English OK",
    intent: "Serious Dating",
    verified: true,
    safeChat: true,
    area: "Tokyo area, blurred distance",
    accent: "from-indigo-500 via-rose-400 to-gold",
    matchReasons: [
      "Dating目的が近い",
      "会話のペースが合いやすい",
      "認証済みプロフィール",
    ],
  },
  {
    id: 3,
    name: "Marco",
    age: 28,
    origin: "Italy",
    location: "Yokohama",
    languages: "English / Italiano / 日本語少し",
    intent: "Dating",
    verified: true,
    safeChat: true,
    area: "Yokohama / Tokyo, approximate",
    accent: "from-emerald-500 via-sky-400 to-rose-500",
    matchReasons: [
      "話せる言語が合う",
      "国際的な出会いへの温度感が近い",
      "72h Safe Chat対応",
    ],
  },
];

export const safetyFeatures = [
  {
    title: "Face Required",
    jp: "顔写真必須",
    body: "Registration starts with a clear face photo to reduce fake profiles and unserious use.",
  },
  {
    title: "Verified Profiles",
    jp: "プロフィール確認制度",
    body: "Verified users are prioritized in recommendations and clearly marked across the app.",
  },
  {
    title: "72h Safe Chat",
    jp: "72時間セーフチャット",
    body: "LINE, phone numbers, social accounts, URLs, and QR codes are limited after matching.",
  },
  {
    title: "Private Preferences",
    jp: "非公開マッチング希望",
    body: "Sensitive dating preferences are used for recommendations, not shown on public profiles.",
  },
  {
    title: "VIP Privacy",
    jp: "秘密厳守モード",
    body: "A premium layer for discreet dating: verified-only visibility, blurred area, and privacy-first controls.",
  },
];
