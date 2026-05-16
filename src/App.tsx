import { useMemo, useState } from "react";
import { appName, profiles, safetyFeatures, type Profile } from "./data/mockProfiles";

type ModalType = "safe-chat" | "preferences" | null;

const tabs = ["おすすめ", "認証済み", "Dating"];
const navItems = ["Home", "Search", "Matches", "Chat", "Me"];

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const common = {
    className: `h-5 w-5 ${className}`,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
        <path d="m9.5 12 1.7 1.7 3.5-4" />
      </svg>
    );
  }
  if (name === "settings") {
    return (
      <svg {...common}>
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.06.06-2.12 2.12-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1.1 1.66V20.5h-3v-.08a1.8 1.8 0 0 0-1.1-1.66 1.8 1.8 0 0 0-2 .36l-.06.06-2.12-2.12.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.66-1.1H5v-3h.08a1.8 1.8 0 0 0 1.66-1.1 1.8 1.8 0 0 0-.36-2l-.06-.06 2.12-2.12.06.06a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1.1-1.66V3.5h3v.08a1.8 1.8 0 0 0 1.1 1.66 1.8 1.8 0 0 0 2-.36l.06-.06 2.12 2.12-.06.06a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.66 1.1H21v3h-.08A1.8 1.8 0 0 0 19.4 15Z" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg {...common}>
        <path d="M20.5 8.8c0 5.3-8.5 10-8.5 10s-8.5-4.7-8.5-10A4.8 4.8 0 0 1 12 5.7a4.8 4.8 0 0 1 8.5 3.1Z" />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg {...common}>
        <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      </svg>
    );
  }
  if (name === "x") {
    return (
      <svg {...common}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function Badge({ children, tone = "gold" }: { children: string; tone?: "gold" | "rose" | "blue" }) {
  const tones = {
    gold: "border-gold/40 bg-gold/12 text-gold",
    rose: "border-rose/40 bg-rose/12 text-rose",
    blue: "border-sky-400/40 bg-sky-400/12 text-sky-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function ProfileArt({ profile }: { profile: Profile }) {
  return (
    <div className={`relative h-64 overflow-hidden rounded-[28px] bg-gradient-to-br ${profile.accent}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.45),transparent_26%),radial-gradient(circle_at_35%_65%,rgba(0,0,0,0.26),transparent_28%)]" />
      <div className="absolute left-1/2 top-14 h-24 w-24 -translate-x-1/2 rounded-full border border-white/30 bg-black/20 shadow-2xl backdrop-blur-sm" />
      <div className="absolute bottom-0 left-1/2 h-36 w-48 -translate-x-1/2 rounded-t-[80px] border border-white/20 bg-black/24 backdrop-blur-sm" />
      <div className="absolute left-4 top-4 flex gap-2">
        <Badge tone="gold">Face photo required</Badge>
        <Badge tone="rose">VIP privacy</Badge>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/18 bg-black/28 px-3 py-2 text-xs text-white backdrop-blur-xl">
        <span>Verified portrait placeholder</span>
        <Icon name="shield" className="text-gold" />
      </div>
    </div>
  );
}

function SwipeCard({ profile, onSafeChat }: { profile: Profile; onSafeChat: () => void }) {
  return (
    <section className="rounded-[32px] border border-line bg-panel p-3 shadow-premium">
      <ProfileArt profile={profile} />
      <div className="space-y-4 px-2 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-2 flex gap-2">
              {profile.verified && <Badge tone="gold">Verified</Badge>}
              <Badge tone="blue">Dating-focused</Badge>
            </div>
            <h3 className="text-3xl font-semibold tracking-normal text-white">
              {profile.name}, {profile.age}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              {profile.origin} / {profile.location}
            </p>
          </div>
          <button
            className="rounded-full border border-line bg-white/5 p-2 text-gold transition hover:bg-white/10"
            aria-label="Safety details"
            onClick={onSafeChat}
          >
            <Icon name="shield" />
          </button>
        </div>

        <div className="grid gap-2 text-sm">
          <p className="rounded-2xl bg-white/[0.04] px-3 py-2 text-zinc-200">{profile.languages}</p>
          <p className="rounded-2xl bg-white/[0.04] px-3 py-2 text-zinc-200">{profile.intent}</p>
          <p className="rounded-2xl bg-white/[0.04] px-3 py-2 text-zinc-400">{profile.area}</p>
        </div>

        <div className="rounded-3xl border border-line bg-night p-4">
          <p className="mb-2 text-sm font-semibold text-white">A high-fit match</p>
          <ul className="space-y-1.5 text-sm text-zinc-300">
            {profile.matchReasons.map((reason) => (
              <li key={reason} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onSafeChat}
          className="flex w-full items-center justify-between rounded-2xl border border-rose/25 bg-rose/10 px-4 py-3 text-left text-sm text-white transition hover:bg-rose/15"
        >
          <span>
            <span className="block font-semibold">72h Safe Chat</span>
            <span className="text-xs text-zinc-400">Contact sharing is limited first.</span>
          </span>
          <Icon name="shield" className="text-rose" />
        </button>
      </div>
    </section>
  );
}

function MobileHome({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [profileIndex, setProfileIndex] = useState(0);
  const profile = profiles[profileIndex];

  const goNext = () => setProfileIndex((current) => (current + 1) % profiles.length);

  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[38px] border border-white/10 bg-ink p-4 shadow-premium">
      <header className="flex items-start justify-between pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-white">{appName}</h1>
          <p className="text-xs text-zinc-400">Private VIP dating for Japanese and international gay men</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-line bg-white/5 p-2 text-zinc-200" aria-label="Safety center">
            <Icon name="shield" className="text-gold" />
          </button>
          <button className="rounded-full border border-line bg-white/5 p-2 text-zinc-200" aria-label="Settings">
            <Icon name="settings" />
          </button>
        </div>
      </header>

      <button
        onClick={() => onOpenModal("safe-chat")}
        className="mb-4 w-full rounded-3xl border border-gold/24 bg-gradient-to-r from-gold/14 to-rose/10 p-4 text-left"
      >
        <p className="text-sm font-semibold text-white">72h Safe Chat + VIP Privacy enabled</p>
        <p className="text-xs text-zinc-400">Verified-only visibility / 顔写真必須・秘密厳守Dating</p>
      </button>

      <div className="mb-4 grid grid-cols-3 rounded-2xl border border-line bg-panel2 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
              activeTab === tab ? "bg-white text-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <SwipeCard profile={profile} onSafeChat={() => onOpenModal("safe-chat")} />

      <div className="flex items-center justify-center gap-5 py-5">
        <button
          onClick={goNext}
          className="grid h-14 w-14 place-items-center rounded-full border border-line bg-panel text-zinc-200 transition hover:border-white/30"
          aria-label="Skip profile"
        >
          <Icon name="x" />
        </button>
        <button
          onClick={goNext}
          className="grid h-16 w-16 place-items-center rounded-full bg-rose text-white shadow-rose transition hover:bg-rose/90"
          aria-label="Like profile"
        >
          <Icon name="heart" className="h-6 w-6" />
        </button>
        <button
          onClick={goNext}
          className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition hover:bg-gold/15"
          aria-label="Save profile"
        >
          <Icon name="star" />
        </button>
      </div>

      <nav className="grid grid-cols-5 gap-1 rounded-3xl border border-line bg-panel px-2 py-2">
        {navItems.map((item) => (
          <button
            key={item}
            className={`rounded-2xl px-1 py-2 text-[11px] font-semibold ${
              item === "Home" ? "bg-white text-black" : "text-zinc-500"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}

function SafetyCards({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
  return (
    <section id="features" className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:grid-cols-2 lg:grid-cols-5">
      {safetyFeatures.map((feature) => {
        const modal = feature.title === "72h Safe Chat" ? "safe-chat" : feature.title === "Private Preferences" || feature.title === "VIP Privacy" ? "preferences" : null;
        return (
          <button
            key={feature.title}
            onClick={() => modal && onOpenModal(modal)}
            className="min-h-56 rounded-[28px] border border-line bg-panel p-5 text-left transition hover:-translate-y-1 hover:border-white/20 hover:bg-panel2"
          >
            <div className="mb-8 grid h-11 w-11 place-items-center rounded-2xl bg-white/7 text-gold">
              <Icon name={feature.title === "Private Preferences" ? "heart" : "shield"} />
            </div>
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="mt-1 text-sm text-gold">{feature.jp}</p>
            <p className="mt-4 text-sm leading-6 text-zinc-400">{feature.body}</p>
          </button>
        );
      })}
    </section>
  );
}

function ChatPreview() {
  return (
    <div className="rounded-[28px] border border-line bg-panel p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Alex</p>
          <p className="text-xs text-zinc-500">Verified · 72h Safe Chat</p>
        </div>
        <Badge tone="rose">2d 12h left</Badge>
      </div>
      <div className="space-y-3 text-sm">
        <div className="max-w-[82%] rounded-2xl bg-white/8 px-4 py-3 text-zinc-200">
          Nice to meet you. I prefer taking time before meeting.
        </div>
        <div className="ml-auto max-w-[82%] rounded-2xl bg-rose/16 px-4 py-3 text-white">
          Same here. App chat first feels safer.
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-gold/24 bg-gold/10 px-4 py-3 text-xs text-zinc-300">
        Contact sharing is not available yet. Please continue chatting in the app first.
      </div>
      <div className="mt-3 rounded-full border border-line bg-night px-4 py-3 text-sm text-zinc-500">
        Message in app...
      </div>
    </div>
  );
}

function VipPrivacySection({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
  const points = [
    "Verified members only",
    "Blurred distance and area display",
    "Screenshot warning concept",
    "Hide around home or workplace",
  ];

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[32px] border border-gold/25 bg-gradient-to-br from-gold/14 via-panel to-rose/10 p-7">
        <p className="text-sm font-semibold text-gold">VIP Membership Concept</p>
        <h2 className="mt-3 text-4xl font-semibold leading-tight text-white">
          Higher price. Fewer low-effort users. More privacy signals.
        </h2>
        <p className="mt-5 leading-7 text-zinc-300">
          A premium membership can make the app feel more intentional and reduce low-effort use. The privacy UI should
          reassure closeted or discreet users without promising absolute anonymity.
        </p>
        <div className="mt-7 rounded-3xl border border-line bg-black/30 p-5">
          <p className="text-sm text-zinc-400">Suggested VIP positioning</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            ¥9,800<span className="text-base text-zinc-500"> / month</span>
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Designed for people who want verified, discreet, dating-focused matches instead of instant contact collection.
          </p>
        </div>
      </div>
      <div className="rounded-[32px] border border-line bg-panel p-7">
        <h3 className="text-2xl font-semibold text-white">Discreet controls for face-photo anxiety</h3>
        <div className="mt-6 grid gap-3">
          {points.map((point) => (
            <div key={point} className="flex items-center gap-3 rounded-2xl bg-night px-4 py-4 text-sm text-zinc-300">
              <Icon name="shield" className="h-4 w-4 text-gold" />
              {point}
            </div>
          ))}
        </div>
        <button
          onClick={() => onOpenModal("preferences")}
          className="mt-6 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black"
        >
          Review privacy preferences
        </button>
      </div>
    </section>
  );
}

function LandingPage({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
  return (
    <main className="min-h-screen bg-night text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(216,75,106,0.18),transparent_28%),radial-gradient(circle_at_80%_24%,rgba(213,168,74,0.16),transparent_26%)]" />
        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-gold to-rose text-sm font-bold text-black">
              VD
            </div>
            <span className="font-semibold">{appName}</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <button onClick={() => onOpenModal("safe-chat")} className="hover:text-white">Safety</button>
            <a href="#how" className="hover:text-white">How it works</a>
            <button className="hover:text-white">Login</button>
          </nav>
        </header>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-6 lg:grid-cols-[1fr_420px] lg:pb-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-semibold leading-tight tracking-normal text-white md:text-7xl">
              Private VIP dating for gay men in Japan.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Connect with Japanese and international gay men who are looking for real dating, with verified profiles,
              face-required registration, VIP privacy controls, and 72h Safe Chat.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
              顔写真必須・認証制。身バレ不安に配慮しながら、日本人と外国人ゲイが安心して恋愛目的で出会えるVIPマッチングアプリ。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white shadow-rose transition hover:bg-rose/90">
                Apply for VIP access
              </button>
              <button
                onClick={() => onOpenModal("safe-chat")}
                className="rounded-full border border-line bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See how safety works
              </button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[390px] lg:translate-y-8">
            <MobileHome onOpenModal={onOpenModal} />
          </div>
        </div>
      </section>

      <SafetyCards onOpenModal={onOpenModal} />
      <VipPrivacySection onOpenModal={onOpenModal} />

      <section id="how" className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 lg:grid-cols-[1fr_390px]">
        <div className="rounded-[32px] border border-line bg-panel p-7">
          <h2 className="text-3xl font-semibold">Designed to slow down risky behavior.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Match with verified profiles", "Chat safely inside the app", "Exchange contact only by consent"].map((step, index) => (
              <div key={step} className="rounded-3xl border border-line bg-night p-5">
                <p className="text-sm text-gold">0{index + 1}</p>
                <p className="mt-4 text-base font-semibold text-white">{step}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  The UI keeps the focus on dating intent, language fit, and verified safety signals.
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => onOpenModal("preferences")}
            className="mt-6 rounded-full border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-semibold text-gold"
          >
            Open Private Preferences
          </button>
        </div>
        <ChatPreview />
      </section>
    </main>
  );
}

function Modal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const content = useMemo(() => {
    if (type === "preferences") {
      return {
        title: "Private Preferences",
        subtitle: "This will not appear on your profile.",
        body: "It is only used to recommend people who may be a better match for you. The profile card only shows broad reasons like language fit, dating intent, verified status, and broad privacy fit. It never exposes your hidden conditions.",
        items: [
          "Dating seriousness",
          "Pace before meeting",
          "Preferred languages",
          "Avoid immediate contact requests",
          "Prefer verified users",
          "Verified-only visibility",
          "Blur distance around sensitive areas",
        ],
      };
    }
    return {
      title: "72h Safe Chat",
      subtitle: "Contact sharing is not available yet.",
      body: "To keep dating safe and intentional, we limit sharing LINE, phone numbers, social media accounts, URLs, addresses, QR codes, and external contact details for the first 72 hours after matching.",
      items: [
        "72 hours after matching",
        "Enough in-app conversation",
        "Both users verified",
        "Mutual consent to exchange contact",
        "No reports or blocks during the period",
      ],
    };
  }, [type]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-5 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-[32px] border border-line bg-panel p-6 shadow-premium">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gold">{content.subtitle}</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{content.title}</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-line bg-white/5 p-2 text-zinc-300" aria-label="Close modal">
            <Icon name="x" />
          </button>
        </div>
        <p className="leading-7 text-zinc-300">{content.body}</p>
        <div className="mt-6 grid gap-2">
          {content.items.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-night px-4 py-3 text-sm text-zinc-300">
              <Icon name="shield" className="h-4 w-4 text-gold" />
              {item}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
          Got it
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <LandingPage onOpenModal={setModal} />
      <Modal type={modal} onClose={() => setModal(null)} />
    </>
  );
}
