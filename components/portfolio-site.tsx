"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Code2,
  Mail,
  Menu,
  MonitorSmartphone,
  Mountain,
  PlaneTakeoff,
  Play,
  Send,
  Sparkles,
  Video,
  X
} from "lucide-react";
import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import { AnimatePresence, motion } from "framer-motion";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "85994f73-9c32-45fa-9285-0702774bd19b";
const WEB3FORMS_FROM_NAME = "Mattia Micheluzzi Portfolio";
const LANGUAGE_HINT_KEY = "mattia-language-hint-seen";

type Locale = "it" | "en" | "de";

const localeChrome: Record<
  Locale,
  {
    home: string;
    navigation: string;
    navigationHint: string;
    settings: string;
    privacy: string;
    language: string;
    hereToChangeLanguage: string;
  }
> = {
  it: {
    home: "Home",
    navigation: "Navigazione",
    navigationHint: "Seleziona una pagina",
    settings: "Impostazioni",
    privacy: "Privacy",
    language: "Lingua",
    hereToChangeLanguage: "Qui cambi la lingua"
  },
  en: {
    home: "Home",
    navigation: "Navigation",
    navigationHint: "Pick a page",
    settings: "Settings",
    privacy: "Privacy",
    language: "Language",
    hereToChangeLanguage: "Here to change language"
  },
  de: {
    home: "Start",
    navigation: "Navigation",
    navigationHint: "Seite auswählen",
    settings: "Einstellungen",
    privacy: "Datenschutz",
    language: "Sprache",
    hereToChangeLanguage: "Hier die Sprache ändern"
  }
};

const navItems = [
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Work", href: "/work" },
  { label: "Booking", href: "/booking" },
  { label: "Contact", href: "/contact" }
];

const regionDisplayName = new Intl.DisplayNames(["it"], { type: "region" });

const skills = [
  {
    title: "Droni",
    icon: PlaneTakeoff,
    intro: "Riprese aeree, fotografia, video cinematici e tracking.",
    items: [
      "DJI Mini 4 Pro",
      "Fotografia aerea",
      "Videografia aerea",
      "Tracking shot",
      "Riprese cinematiche"
    ]
  },
  {
    title: "Tecnologia",
    icon: MonitorSmartphone,
    intro: "Ecosistema Apple, software, intelligenza artificiale e strumenti digitali.",
    items: [
      "Ecosistema Apple",
      "Conoscenza iOS e macOS",
      "Strumenti AI",
      "Programmazione base",
      "Creazione siti web"
    ]
  },
  {
    title: "Lavoro creativo",
    icon: Camera,
    intro: "Fotografia, videografia, editing e creazione di contenuti.",
    items: [
      "Fotografia",
      "Video editing",
      "Contenuti social",
      "Visual storytelling"
    ]
  }
];

const phonePrefixOptions = getCountries()
  .map((country) => {
    const label = regionDisplayName.of(country) ?? country;

    return {
      code: country as CountryCode,
      label: `${label} +${getCountryCallingCode(country as CountryCode)}`
    };
  })
  .sort((left, right) => {
    if (left.code === "IT") return -1;
    if (right.code === "IT") return 1;
    return left.label.localeCompare(right.label, "it");
  });

type Project = {
  title: string;
  category: string;
  tag: "Riprese video" | "Da iPhone" | "Drone" | "Edit video";
  description: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  posterSrc?: string;
  icon: typeof Mountain;
};

const projects: Project[] = [
  {
    title: "Luce sulle montagne",
    category: "Riprese video",
    tag: "Riprese video",
    description:
      "Una ripresa drone pensata per valorizzare il paesaggio altoatesino con linee pulite e luce naturale.",
    mediaType: "image",
    mediaSrc: "/images/drone/dji_export_20251004_212352_1759605832218_framed.JPG",
    icon: Mountain
  },
  {
    title: "iPhone 01",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_0023.jpg",
    icon: Camera
  },
  {
    title: "Linea panoramica",
    category: "Drone",
    tag: "Drone",
    description:
      "Scatto aereo pulito e minimale, perfetto per raccontare movimento e profondita.",
    mediaType: "image",
    mediaSrc: "/images/drone/dji_export_20260317_164326_1773762206203_framed.JPG",
    icon: Video
  },
  {
    title: "Paesaggio in quota",
    category: "Drone",
    tag: "Drone",
    description:
      "Un altro frame drone per mostrare la forza visiva delle montagne e del territorio.",
    mediaType: "image",
    mediaSrc: "/images/drone/dji_export_20250919_162103_1758291663287_framed.JPG",
    icon: Mountain
  },
  {
    title: "Drone cinematico",
    category: "Riprese video",
    tag: "Riprese video",
    description:
      "Video drone con audio originale, pensato per essere visto a schermo intero con il suono attivo.",
    mediaType: "video",
    mediaSrc: "/videos/drone/drone-1.mp4",
    posterSrc: "/images/drone/2026-04-02-19-49-00-710.PNG",
    icon: Video
  },
  {
    title: "Edit bici",
    category: "Edit video",
    tag: "Edit video",
    description:
      "Montaggio video con audio originale, pensato per mostrare ritmo, movimento e taglio pulito.",
    mediaType: "video",
    mediaSrc: "/videos/edit/bike-edit.mov",
    posterSrc: "/images/mattia-profile-about.jpg",
    icon: Code2
  },
  {
    title: "iPhone 02",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_0137.jpg",
    icon: Camera
  },
  {
    title: "iPhone 03",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_0325.jpg",
    icon: Camera
  },
  {
    title: "iPhone 04",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_0395.jpg",
    icon: Camera
  },
  {
    title: "iPhone 05",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_2977.jpg",
    icon: Camera
  },
  {
    title: "iPhone 06",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_2978.jpg",
    icon: Camera
  },
  {
    title: "iPhone 07",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_3096.jpg",
    icon: Camera
  },
  {
    title: "iPhone 08",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_1646.jpg",
    icon: Camera
  },
  {
    title: "iPhone 09",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_4845.jpg",
    icon: Camera
  },
  {
    title: "iPhone 10",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/IMG_7389.jpg",
    icon: Camera
  },
  {
    title: "iPhone 11",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/6b14c9d0-52f2-4e97-8181-eb7579cdcf77.JPG",
    icon: Camera
  },
  {
    title: "iPhone 12",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/AA37C309-6176-45A3-BC5F-7B4C365D3D1D.PNG",
    icon: Camera
  },
  {
    title: "iPhone 13",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/web/IMG_1079.jpg",
    icon: Camera
  },
  {
    title: "iPhone 14",
    category: "Da iPhone",
    tag: "Da iPhone",
    description:
      "Scatto iPhone pensato per mostrare il lato piu immediato, spontaneo e pulito del lavoro.",
    mediaType: "image",
    mediaSrc: "/images/iphone/web/IMG_3652.jpg",
    icon: Camera
  }
];

const videoEquipment = [
  {
    title: "DJI Mini 4 Pro",
    description: "Drone principale utilizzato per fotografia e videografia aerea."
  },
  {
    title: "DJI Osmo Mobile 7",
    description: "Stabilizzatore per riprese fluide e professionali."
  },
  {
    title: "DJI Mic Mini",
    description: "Sistema audio per contenuti video e interviste."
  },
  {
    title: "iPhone 14 Pro",
    description: "Fotografia, video e gestione dei contenuti."
  }
];

const techEquipment = [
  {
    title: "MacBook Pro",
    description: "Editing, produttivita e sviluppo di progetti digitali."
  },
  {
    title: "Mouse",
    description: "Precisione e controllo nel lavoro quotidiano."
  },
  {
    title: "Magic Mouse",
    description: "Navigazione fluida e uso rapido per design e montaggio."
  },
  {
    title: "Tastiera meccanica",
    description: "Comfort e velocita per scrittura e sviluppo."
  },
  {
    title: "Due monitor",
    description: "Spazio di lavoro ampio per editing, ricerca e multitasking."
  }
];

const equipmentSections = [
  {
    title: "Attrezzatura per video",
    items: videoEquipment
  },
  {
    title: "Attrezzatura per informatica e design",
    items: techEquipment
  }
];

const bookingTimeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00"
];

const fullBookingPrefixList = phonePrefixOptions;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

type SubmissionStatus = "idle" | "sending" | "success" | "error";

async function submitWeb3Forms(payload: Record<string, string>) {
  const formData = new FormData();
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("from_name", WEB3FORMS_FROM_NAME);
  formData.append("botcheck", "");

  for (const [key, value] of Object.entries(payload)) {
    formData.append(key, value);
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    body: formData
  });
  const data = (await response.json().catch(() => null)) as
    | Web3FormsResponse
    | null;

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message ?? "Invio non riuscito.");
  }

  return data;
}

export default function HomePage() {
  return (
    <SiteFrame>
      <Hero />
      <HomeStats />
      <HomeIntro />
      <SkillsPreview />
      <WorkPreview />
      <EquipmentSection />
      <BookingPreview />
      <ContactBand />
    </SiteFrame>
  );
}

export function AboutPage() {
  return (
    <SiteFrame>
      <section className="relative overflow-hidden border-b border-line pt-20">
        <Image
          src="/images/mattia-profile-about.jpg"
          alt="Ritratto di Mattia Micheluzzi"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_34%,rgba(255,255,255,0.5)_60%,rgba(255,255,255,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.82)_100%)]" />
        <div className="relative flex min-h-[66svh] w-full items-end px-4 pb-10 pt-20 sm:px-6 lg:px-10 2xl:px-14">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/72 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600 backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              About
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-balance text-3xl font-semibold tracking-normal text-ink sm:text-5xl lg:text-6xl"
            >
              Tecnologia, creativita e innovazione in movimento.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-base font-medium leading-7 text-zinc-800 sm:text-lg"
            >
              Appassionato di tecnologia, pilota drone, creator e studente.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <WideSection>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-5">
            <article className="rounded-[8px] border border-line bg-white p-6 shadow-card sm:p-8">
              <p className="text-lg leading-8 text-zinc-700">
                Sono Mattia Micheluzzi, uno studente e creator con una forte
                passione per la tecnologia, il mondo Apple, i droni, il
                videomaking e il biking.
              </p>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                Fin da piccolo sono sempre stato affascinato dal funzionamento
                della tecnologia. Mi piace scoprire nuovi strumenti, capire come
                funzionano i dispositivi e trovare modi creativi per unire
                innovazione e contenuti digitali.
              </p>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                Nel tempo ho sviluppato esperienza nell'utilizzo dei droni DJI,
                nella creazione di contenuti foto e video, nell'ecosistema Apple
                e nell'esplorazione di nuove tecnologie, comprese quelle legate
                all'intelligenza artificiale.
              </p>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                Oggi utilizzo queste passioni per realizzare progetti personali,
                creare contenuti e continuare a migliorare ogni giorno.
              </p>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                Il mio obiettivo e trasformare curiosita, creativita e tecnologia
                in progetti concreti e di qualita.
              </p>
            </article>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:col-span-2 xl:grid-cols-3">
            {[
              ["Età", "18 anni"],
              ["Base", "Alto Adige, Italia"],
              [
                "Interessi",
                "Droni, tecnologia, Apple, videografia e biking"
              ]
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[8px] border border-line bg-mist p-6"
              >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </WideSection>
      <WideSection muted>
        <SectionHeading
          eyebrow="Valori"
          title="Cio che guida il mio lavoro."
          text="Un approccio semplice, concreto e orientato alla crescita continua."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "Innovazione",
              "Mi piace esplorare nuove tecnologie e trovare soluzioni creative."
            ],
            [
              "Creatività",
              "Unisco competenze tecniche e contenuti visivi per raccontare idee ed esperienze."
            ],
            [
              "Crescita",
              "Cerco sempre nuove sfide e opportunita per imparare e migliorare."
            ]
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-[8px] border border-line bg-white p-6 shadow-card"
            >
              <h3 className="text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{text}</p>
            </div>
          ))}
        </div>
      </WideSection>
    </SiteFrame>
  );
}

export function SkillsPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Skills"
        title="Competenze pratiche per riprese, tecnologia e contenuti."
        text="Droni, strumenti digitali, editing e storytelling visivo raccontati in modo chiaro e professionale."
      />
      <WideSection>
        <SkillsGrid detailed />
      </WideSection>
    </SiteFrame>
  );
}

export function WorkPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Work"
        title="Una galleria pronta per i lavori migliori."
        text="Progetti divisi tra fotografia drone, video, biking content e tecnologia. Ogni scheda puo essere aggiornata con media reali appena disponibili."
      />
      <WideSection>
        <p className="mb-6 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
          Una raccolta di progetti, contenuti ed esperienze che rappresentano il
          mio percorso tra tecnologia, droni e creativita.
        </p>
        <WorkGallery />
      </WideSection>
    </SiteFrame>
  );
}

export function BookingPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Booking"
        title="Prenota una call o una consulenza."
        text="Prenota un appuntamento e lascia i tuoi recapiti: sarò io a contattarti per confermare il momento giusto."
      />
      <WideSection>
        <BookingPlanner />
      </WideSection>
    </SiteFrame>
  );
}

export function ContactPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Contact"
        title="Scrivimi per progetti, idee o collaborazioni."
        text="Che si tratti di una collaborazione, di una domanda o di una semplice idea, sentiti libero di contattarmi. Sono sempre aperto a nuove opportunita, progetti e connessioni."
      />
      <WideSection>
        <ContactLayout />
      </WideSection>
    </SiteFrame>
  );
}

function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white text-ink">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<Locale>("it");
  const [showLanguageHint, setShowLanguageHint] = useState(false);
  const t = localeChrome[locale];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const stored = window.localStorage.getItem("mattia-locale");
    if (stored === "it" || stored === "en" || stored === "de") {
      setLocale(stored);
    }
    document.documentElement.lang = stored || "it";

    const seen = window.localStorage.getItem(LANGUAGE_HINT_KEY);
    if (!seen) {
      setShowLanguageHint(true);
      const timer = window.setTimeout(() => {
        setShowLanguageHint(false);
        window.localStorage.setItem(LANGUAGE_HINT_KEY, "1");
      }, 20000);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mattia-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const showDesktopLinks = !scrolled;
  useEffect(() => {
    if (showDesktopLinks) {
      setMenuOpen(false);
      setProfileOpen(false);
    }
  }, [showDesktopLinks]);

  const navItems = [
    ...(pathname !== "/" ? [{ label: t.home, href: "/" }] : []),
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Work", href: "/work" },
    { label: "Booking", href: "/booking" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/82 backdrop-blur-xl">
      <nav className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-10 2xl:px-14" aria-label="Navigazione principale">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="Homepage Mattia Micheluzzi"
        >
          <span className="relative h-10 w-10 flex-none overflow-hidden rounded-full bg-black shadow-sm sm:h-11 sm:w-11">
            <Image
              src="/images/mattia-monogram@2x.png"
              alt=""
              fill
              sizes="44px"
              className="scale-[1.08] object-contain"
            />
          </span>
          <span className="truncate text-[15px] font-semibold tracking-normal">
            Mattia Micheluzzi
          </span>
        </Link>

        <AnimatePresence mode="wait">
          {showDesktopLinks ? (
            <motion.div
              key="links"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="hidden items-center gap-1 md:flex"
            >
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-950 hover:text-white hover:shadow-md ${
                      active
                        ? "bg-zinc-950 text-white"
                        : "text-zinc-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="compact"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="hidden items-center gap-1 md:flex"
            >
              <span className="text-sm font-medium text-zinc-500">
                {t.navigation}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full bg-transparent px-3 text-sm font-medium text-ink transition hover:text-zinc-600"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            aria-controls="profile-menu"
          >
            {t.settings}
          </button>

          {!showDesktopLinks ? (
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md"
              onClick={() => {
                setProfileOpen(false);
                setMenuOpen((open) => !open);
              }}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
              Menu
              <ChevronDown
                className={`h-4 w-4 transition ${menuOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
          ) : null}

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                id="site-menu"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 w-80 origin-top-right overflow-visible rounded-[16px] border border-zinc-200 bg-white/98 p-3 text-left shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl"
            >
              <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 border-l border-t border-zinc-200 bg-white" aria-hidden="true" />
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {t.navigation}
                </p>
                  <p className="mt-1 text-sm text-zinc-600">{t.navigationHint}</p>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[10px] px-3 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-950 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="my-3 h-px bg-zinc-200" />
                <Link
                  href="/contact"
                  className="flex items-center justify-between rounded-[10px] bg-zinc-950 px-3 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Scrivi a Mattia
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {profileOpen ? (
              <motion.div
                id="profile-menu"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 w-72 origin-top-right overflow-visible rounded-[16px] border border-zinc-200 bg-white/98 p-3 text-left shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl"
            >
              <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 border-l border-t border-zinc-200 bg-white" aria-hidden="true" />
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {t.settings}
                </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {t.hereToChangeLanguage}
                  </p>
                </div>
                <Link
                  href="/privacy"
                  className="mb-3 block rounded-[10px] px-3 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-ink"
                >
                  {t.privacy}
                </Link>
                <div className="rounded-[10px] border border-zinc-200 bg-white px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-zinc-700">
                      {t.language}
                    </p>
                    <div className="flex gap-2">
                      {(["it", "en", "de"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setLocale(option)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                            locale === option
                              ? "border-zinc-950 bg-zinc-950 text-white"
                              : "border-line bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100"
                          }`}
                        >
                          {option === "it" ? "IT" : option === "en" ? "EN" : "DE"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {showLanguageHint ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute right-0 top-full mt-2 hidden max-w-56 rounded-[12px] border border-zinc-200 bg-white/95 px-4 py-3 text-xs leading-5 text-zinc-600 shadow-soft md:block"
              >
                <p className="font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {t.language}
                </p>
                <p className="mt-1">{t.hereToChangeLanguage}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <Image
        src="/images/south-tyrol-hero.png"
        alt="Montagne dell'Alto Adige al tramonto"
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_38%,rgba(255,255,255,0.24)_72%,rgba(255,255,255,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_44%,rgba(255,255,255,0.84)_100%)]" />

      <div className="relative flex min-h-[calc(100svh-4rem)] w-full items-center px-4 py-12 sm:px-6 lg:px-10 2xl:px-14">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Alto Adige, Italia
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-balance text-5xl font-semibold tracking-normal text-ink sm:text-6xl lg:text-8xl"
          >
            Mattia Micheluzzi
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-xl font-medium leading-8 text-zinc-800 sm:text-2xl"
          >
            Appassionato di tecnologia, pilota drone, creator e studente.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg"
          >
            Creo contenuti e progetti digitali unendo droni, videografia,
            biking e tecnologia. Innovazione, precisione e creativita sono al
            centro di tutto cio che faccio.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg"
          >
            Questo portfolio raccoglie il mio percorso, le mie competenze e i
            miei progetti. Un luogo dove condivido passioni, esperienze e
            lavori che rappresentano il mio modo di vedere la tecnologia e la
            creativita.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 max-w-2xl rounded-[8px] border border-black/8 bg-white/66 p-4 backdrop-blur-xl"
          >
            <p className="text-sm font-medium text-zinc-700">
              Disponibile per siti web, minigiochi, video ed editing.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Siti web", "Minigiochi", "Video", "Editing"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Contattami
              <Mail className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/booking"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white/80 px-6 text-sm font-semibold text-ink backdrop-blur-xl transition hover:bg-white"
            >
              Prenota un incontro
              <CalendarDays className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HomeIntro() {
  return (
    <WideSection>
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <SectionHeading
          eyebrow="Homepage"
          title="Un portfolio minimale, professionale e orientato alla crescita."
          text="La home offre una panoramica rapida. Le pagine dedicate entrano nel dettaglio di storia, competenze, lavori, booking e contatto."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["About", "Storia, valori e percorso personale.", "/about"],
            ["Skills", "Droni, tecnologia e contenuti.", "/skills"],
            ["Work", "Galleria dei progetti principali.", "/work"]
          ].map(([title, text, href]) => (
            <Link
              key={title}
              href={href}
              className="rounded-[8px] border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-zinc-300"
            >
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
              <ArrowRight className="mt-5 h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </WideSection>
  );
}

function SkillsPreview() {
  return (
    <WideSection muted>
      <SectionHeading
        eyebrow="Skills"
        title="Tre aree principali."
        text="Le competenze sono organizzate in modo semplice, cosi ogni visitatore capisce subito cosa puoi offrire."
      />
      <SkillsGrid />
      <div className="mt-8">
        <LinkButton href="/skills">Vedi tutte le skills</LinkButton>
      </div>
    </WideSection>
  );
}

function WorkPreview() {
  return (
    <WideSection>
      <SectionHeading
        eyebrow="Work"
        title="Lavori in evidenza."
        text="Una selezione di categorie gia pronta per foto, video e progetti reali."
      />
      <ProjectGrid compact layout="carousel" />
      <div className="mt-8">
        <LinkButton href="/work">Apri la pagina work</LinkButton>
      </div>
    </WideSection>
  );
}

function BookingPreview() {
  return (
    <WideSection muted>
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Booking"
          title="Prenotazioni semplici."
          text="Scegli una data, una fascia oraria e compila i dettagli della richiesta in pochi passaggi."
        />
        <div className="rounded-[8px] border border-line bg-white p-6 shadow-card">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Calendario interattivo",
              "Fasce orarie",
              "Richiesta via email"
            ].map((item) => (
              <div key={item} className="rounded-[8px] bg-mist p-4">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold leading-5">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <LinkButton href="/booking">Prenota ora</LinkButton>
          </div>
        </div>
      </div>
    </WideSection>
  );
}

function ContactBand() {
  return (
    <section className="border-y border-line bg-ink py-10 text-white">
      <div className="flex w-full flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 2xl:px-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Contact
          </p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Hai un'idea?</h2>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-ink transition hover:bg-zinc-100"
        >
          Scrivimi
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function HomeStats() {
  return null;
}

function EquipmentSection() {
  return (
    <WideSection>
      <SectionHeading
        eyebrow="Attrezzatura"
        title="La mia attrezzatura"
        text="Strumenti essenziali per fotografie, video, audio e lavoro digitale."
      />
      <div className="space-y-8">
        {equipmentSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-semibold text-ink">{section.title}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[8px] border border-line bg-mist p-5"
                >
                  <h4 className="text-base font-semibold text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WideSection>
  );
}

function PageHero({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist pt-16">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-30 lg:block">
        <Image
          src="/images/south-tyrol-hero.png"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mist via-mist/70 to-transparent" />
      </div>
      <div className="relative w-full px-4 pb-10 sm:px-6 lg:px-10 2xl:px-14">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function WideSection({
  children,
  muted = false
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={`${muted ? "bg-mist" : "bg-white"} py-10 sm:py-14`}>
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">{children}</div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="mb-5 max-w-3xl"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">{text}</p>
    </motion.div>
  );
}

function SkillsGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {skills.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <motion.article
            key={skill.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: index * 0.06 }}
            className="rounded-[8px] border border-line bg-white p-6 shadow-card"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-ink text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">{skill.title}</h3>
            {detailed ? (
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {skill.intro}
              </p>
            ) : null}
            <ul className="mt-5 space-y-3">
              {skill.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-zinc-600"
                >
                  <Check
                    className="mt-1 h-4 w-4 flex-none text-zinc-900"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        );
      })}
    </div>
  );
}

function WorkGallery() {
  const filters = ["Tutti", "Riprese video", "Da iPhone", "Drone", "Edit video"] as const;
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Tutti");
  const visibleProjects =
    activeFilter === "Tutti"
      ? projects
      : projects.filter((project) => project.tag === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-line bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <ProjectGrid items={visibleProjects} />
    </div>
  );
}

function ProjectGrid({
  compact = false,
  layout = "grid",
  items = projects
}: {
  compact?: boolean;
  layout?: "grid" | "carousel";
  items?: typeof projects;
}) {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(
    null
  );
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const visibleProjects = compact ? items.slice(0, 4) : items;

  useEffect(() => {
    if (activeProject?.mediaType !== "video") {
      return;
    }

    const video = modalVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    video.play().catch(() => {});
  }, [activeProject]);

  return (
    <>
      <div className={layout === "carousel" ? "relative" : ""}>
        <div
          ref={carouselRef}
          className={
            layout === "carousel"
              ? "flex gap-3 overflow-x-auto pb-2 pr-2 snap-x snap-mandatory scroll-smooth"
              : "grid gap-4 md:grid-cols-2"
          }
        >
        {visibleProjects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.button
              key={project.title}
              type="button"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: index * 0.06 }}
              onClick={() => setActiveProject(project)}
              className={`group relative overflow-hidden rounded-[8px] border border-line bg-zinc-100 text-left shadow-card ${
                layout === "carousel"
                  ? "h-72 w-[280px] flex-none snap-start sm:w-[340px]"
                  : "aspect-[4/3]"
              }`}
            >
              {project.mediaType === "video" ? (
                <video
                  src={project.mediaSrc}
                  poster={project.posterSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={project.mediaSrc}
                  alt={`${project.category} preview`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/8 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/80">
                      {project.category}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white text-ink transition group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
        </div>

        {layout === "carousel" ? (
          <button
            type="button"
            onClick={() =>
              carouselRef.current?.scrollBy({
                left: 360,
                behavior: "smooth"
              })
            }
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md md:inline-flex"
            aria-label="Scorri a destra"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/42 p-3 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`w-full overflow-hidden bg-white shadow-soft ${
                activeProject.mediaType === "video"
                  ? "h-[100svh] max-w-none rounded-none sm:h-[100svh]"
                  : "max-h-[92svh] max-w-3xl rounded-[8px]"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              {activeProject.mediaType === "video" ? (
                <div className="flex h-full flex-col bg-black">
                  <div className="relative min-h-0 flex-1 bg-black">
                    <video
                      ref={modalVideoRef}
                      src={activeProject.mediaSrc}
                      poster={activeProject.posterSrc}
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-contain"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:bg-zinc-100"
                      onClick={() => setActiveProject(null)}
                      aria-label="Chiudi progetto"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="border-t border-white/10 bg-white p-6 sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {activeProject.category}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold">
                      {activeProject.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-zinc-600">
                      {activeProject.description}
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setActiveProject(null)}
                      className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    >
                      Parliamo di un progetto simile
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative aspect-video bg-black">
                    <Image
                      src={activeProject.mediaSrc}
                      alt={`${activeProject.title} media preview`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:bg-zinc-100"
                      onClick={() => setActiveProject(null)}
                      aria-label="Chiudi progetto"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {activeProject.category}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold">
                      {activeProject.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-zinc-600">
                      {activeProject.description}
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setActiveProject(null)}
                      className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    >
                      Parliamo di un progetto simile
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function BookingForm() {
  const [booking, setBooking] = useState({
    service: "Consulenza riprese drone",
    date: "",
    time: "",
    name: "",
    email: "",
    notes: ""
  });
  const [submitState, setSubmitState] = useState<SubmissionStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    setSubmitMessage("");

    try {
      await submitWeb3Forms({
        subject: `Richiesta prenotazione: ${booking.service}`,
        email: booking.email,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        name: booking.name,
        message: booking.notes
      });
      setSubmitState("success");
      setSubmitMessage("Richiesta inviata con successo.");
      setBooking({
        service: booking.service,
        date: "",
        time: "",
        name: "",
        email: "",
        notes: ""
      });
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error ? error.message : "Invio non riuscito."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-[8px] border border-line bg-white p-5 shadow-card sm:p-6 lg:grid-cols-2"
    >
      <Field label="Tipo di incontro">
        <select
          value={booking.service}
          onChange={(event) =>
            setBooking({ ...booking, service: event.target.value })
          }
          className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
        >
          <option>Consulenza riprese drone</option>
          <option>Consulenza tecnologia</option>
          <option>Incontro generale</option>
        </select>
      </Field>
      <Field label="Nome">
        <input
          required
          value={booking.name}
          onChange={(event) =>
            setBooking({ ...booking, name: event.target.value })
          }
          className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
          placeholder="Il tuo nome"
        />
      </Field>
      <Field label="Email">
        <input
          required
          type="email"
          value={booking.email}
          onChange={(event) =>
            setBooking({ ...booking, email: event.target.value })
          }
          className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
          placeholder="tu@email.com"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Data">
          <input
            required
            type="date"
            value={booking.date}
            onChange={(event) =>
              setBooking({ ...booking, date: event.target.value })
            }
            className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
          />
        </Field>
        <Field label="Ora">
          <input
            required
            type="time"
            value={booking.time}
            onChange={(event) =>
              setBooking({ ...booking, time: event.target.value })
            }
            className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
          />
        </Field>
      </div>
      <div className="lg:col-span-2">
        <Field label="Note">
          <textarea
            value={booking.notes}
            onChange={(event) =>
              setBooking({ ...booking, notes: event.target.value })
            }
            className="min-h-32 w-full resize-y rounded-[8px] border border-line bg-white px-4 py-3 text-sm leading-6 text-ink"
            placeholder="Scrivi cosa vorresti discutere."
          />
        </Field>
      </div>
      <div className="lg:col-span-2">
        <button
          disabled={submitState === "sending"}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:w-auto"
        >
          {submitState === "sending" ? "Invio in corso..." : "Invia richiesta"}
          <Send className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
        {submitMessage ? (
          <p
            className={`mt-3 text-sm ${
              submitState === "success" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {submitMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function ContactLayout() {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState<SubmissionStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    setSubmitMessage("");

    try {
      await submitWeb3Forms({
        subject: "Nuovo messaggio dal portfolio",
        name: contact.name,
        email: contact.email,
        message: contact.message
      });
      setSubmitState("success");
      setSubmitMessage("Messaggio inviato con successo.");
      setContact({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error ? error.message : "Invio non riuscito."
      );
    }
  }

  return (
    <div>
      <p className="mb-6 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
        Che si tratti di una collaborazione, di una domanda o di una semplice
        idea, sentiti libero di contattarmi. Sono sempre aperto a nuove
        opportunita, progetti e connessioni.
      </p>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[8px] border border-line bg-white p-5 shadow-card sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome">
            <input
              required
              value={contact.name}
              onChange={(event) =>
                setContact({ ...contact, name: event.target.value })
              }
              className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
              placeholder="Il tuo nome"
            />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              value={contact.email}
              onChange={(event) =>
                setContact({ ...contact, email: event.target.value })
              }
              className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
              placeholder="tu@email.com"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Messaggio">
            <textarea
              required
              value={contact.message}
              onChange={(event) =>
                setContact({ ...contact, message: event.target.value })
              }
              className="min-h-40 w-full resize-y rounded-[8px] border border-line bg-white px-4 py-3 text-sm leading-6 text-ink"
              placeholder="Scrivi il tuo messaggio."
            />
          </Field>
        </div>
        <button
          disabled={submitState === "sending"}
          className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:w-auto"
        >
          {submitState === "sending" ? "Invio in corso..." : "Invia messaggio"}
          <Send className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
        {submitMessage ? (
          <p
            className={`mt-3 text-sm ${
              submitState === "success" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {submitMessage}
          </p>
        ) : null}
      </form>

      <aside className="rounded-[8px] border border-line bg-mist p-6">
        <h3 className="text-2xl font-semibold">Social</h3>
        <p className="mt-3 leading-7 text-zinc-600">
          Qui possiamo aggiungere i tuoi link social ufficiali.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href="https://instagram.com/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Instagram
            <Camera className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            WhatsApp
            <Mail className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://youtube.com/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            YouTube
            <Play className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://facebook.com/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            Facebook
            <Code2 className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </aside>
    </div>
    </div>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-zinc-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line py-3">
      <div className="flex w-full flex-col gap-1 px-4 text-sm text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10 2xl:px-14">
        <p className="font-medium text-ink">Mattia Micheluzzi</p>
        <p>©️ {new Date().getFullYear()} - Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

const BOOKING_COUNTS_KEY = "mattia-booking-counts";

type BookingCounts = Record<string, number>;
type BookingDayStatus = "available" | "full" | "closed" | "past";

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(key: string) {
  return new Date(`${key}T12:00:00`);
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatMonthLabel(date: Date) {
  return capitalize(
    new Intl.DateTimeFormat("it-IT", {
      month: "long",
      year: "numeric"
    }).format(date)
  );
}

function formatBookingDate(key: string) {
  return capitalize(
    new Intl.DateTimeFormat("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(dateFromKey(key))
  );
}

function getBookingDayStatus(
  key: string,
  counts: BookingCounts,
  todayKey: string
): BookingDayStatus {
  if (key < todayKey) return "past";
  const day = dateFromKey(key).getDay();
  if (day === 0) return "closed";
  if ((counts[key] ?? 0) >= 2) return "full";
  return "available";
}

function getBookingSlots(key: string, todayKey: string) {
  const day = dateFromKey(key).getDay();
  if (day === 0) return [];

  const ranges =
    day === 6
      ? [{ start: 12, end: 16 }]
      : [{ start: 8, end: 18 }];

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = key === todayKey;
  const slots: string[] = [];

  for (const range of ranges) {
    for (let hour = range.start; hour < range.end; hour += 1) {
      const startMinutes = hour * 60;
      if (isToday && startMinutes <= currentMinutes) continue;
      slots.push(
        `${String(hour).padStart(2, "0")}:00 - ${String(hour + 1).padStart(2, "0")}:00`
      );
    }
  }

  return slots;
}

function loadBookingCounts(): BookingCounts {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.localStorage.getItem(BOOKING_COUNTS_KEY);
    return stored ? (JSON.parse(stored) as BookingCounts) : {};
  } catch {
    return {};
  }
}

function saveBookingCounts(counts: BookingCounts) {
  try {
    window.localStorage.setItem(BOOKING_COUNTS_KEY, JSON.stringify(counts));
  } catch {
    // ignore storage failures
  }
}

function BookingPlanner() {
  const today = new Date();
  const todayKey = getLocalDateKey(today);
  const bookingPanelRef = useRef<HTMLDivElement | null>(null);
  const [monthCursor, setMonthCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingCounts, setBookingCounts] = useState<BookingCounts>({});
  const [booking, setBooking] = useState({
    fullName: "",
    email: "",
    phonePrefix: "IT",
    phoneNumber: "",
    notes: ""
  });

  useEffect(() => {
    setBookingCounts(loadBookingCounts());
  }, []);

  useEffect(() => {
    saveBookingCounts(bookingCounts);
  }, [bookingCounts]);

  const monthCells = useMemo(() => {
    const firstDay = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1);
    const daysInMonth = new Date(
      monthCursor.getFullYear(),
      monthCursor.getMonth() + 1,
      0
    ).getDate();
    const leadingEmpty = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const cells: Array<
      | {
          key: string;
          label: string;
          status: BookingDayStatus;
        }
      | null
    > = [];

    for (let index = 0; index < leadingEmpty; index += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const key = getLocalDateKey(
        new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
      );
      cells.push({
        key,
        label: String(day),
        status: getBookingDayStatus(key, bookingCounts, todayKey)
      });
    }

    return cells;
  }, [bookingCounts, monthCursor, todayKey]);

  const selectedLabel = selectedDate ? formatBookingDate(selectedDate) : "";
  const selectedStatus = selectedDate
    ? getBookingDayStatus(selectedDate, bookingCounts, todayKey)
    : null;
  const availableSlots = useMemo(
    () =>
      selectedDate && selectedStatus === "available"
        ? getBookingSlots(selectedDate, todayKey)
        : [],
    [selectedDate, selectedStatus, todayKey]
  );

  useEffect(() => {
    if (!selectedDate) {
      setSelectedSlot("");
      return;
    }

    setSelectedSlot((current) => {
      if (availableSlots.includes(current)) {
        return current;
      }
      return availableSlots[0] ?? "";
    });
  }, [availableSlots, selectedDate]);
  const [submitState, setSubmitState] = useState<SubmissionStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !selectedDate ||
      !selectedSlot ||
      selectedStatus !== "available" ||
      !booking.fullName ||
      !booking.email ||
      !booking.phoneNumber
    ) {
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("");

    const nextCounts = {
      ...bookingCounts,
      [selectedDate]: Math.min((bookingCounts[selectedDate] ?? 0) + 1, 2)
    };

    const prefix = fullBookingPrefixList.find(
      (option) => option.code === booking.phonePrefix
    );
    const phone = prefix
      ? `+${getCountryCallingCode(prefix.code)} ${booking.phoneNumber}`
      : booking.phoneNumber;

    try {
      await submitWeb3Forms({
        subject: `Richiesta prenotazione${selectedLabel ? ` - ${selectedLabel}` : ""}`,
        full_name: booking.fullName,
        email: booking.email,
        phone_prefix: booking.phonePrefix,
        phone_number: booking.phoneNumber,
        phone,
        date: selectedLabel || "-",
        time: selectedSlot || "-",
        notes: booking.notes,
        message: [
          `Nome e cognome: ${booking.fullName}`,
          `Email: ${booking.email}`,
          `Telefono: ${phone || "-"}`,
          `Data: ${selectedLabel || "-"}`,
          `Fascia oraria: ${selectedSlot || "-"}`,
          "",
          "Note:",
          booking.notes
        ].join("\n")
      });

      setBookingCounts(nextCounts);
      saveBookingCounts(nextCounts);
      setSubmitState("success");
      setSubmitMessage("Richiesta inviata con successo.");
      setBooking({
        fullName: "",
        email: "",
        phonePrefix: "IT",
        phoneNumber: "",
        notes: ""
      });
      setSelectedSlot("");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error ? error.message : "Invio non riuscito."
      );
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[8px] border border-line bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Calendario booking
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-ink">
              {formatMonthLabel(monthCursor)}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setMonthCursor(
                  new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1)
                )
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-zinc-300 hover:bg-zinc-50"
              aria-label="Mese precedente"
            >
              <ChevronDown className="h-4 w-4 rotate-90" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() =>
                setMonthCursor(
                  new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1)
                )
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-zinc-300 hover:bg-zinc-50"
              aria-label="Mese successivo"
            >
              <ChevronDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-2">
          {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((label) => (
            <div
              key={label}
              className="px-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              {label}
            </div>
          ))}
          {monthCells.map((cell, index) =>
            cell ? (
              <button
                key={cell.key}
                type="button"
                onClick={() => {
                  if (cell.status === "available") {
                    setSelectedDate(cell.key);
                    window.requestAnimationFrame(() => {
                      bookingPanelRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                      });
                    });
                  }
                }}
                disabled={cell.status !== "available"}
                className={`min-h-16 rounded-[10px] border px-2 py-2 text-left text-sm transition ${
                  selectedDate === cell.key
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : cell.status === "available"
                      ? "border-line bg-white text-ink hover:border-zinc-300 hover:bg-zinc-50"
                      : "border-zinc-200 bg-zinc-100 text-zinc-400"
                }`}
              >
                <div className="text-lg font-semibold">{cell.label}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.16em]">
                  {cell.status === "available"
                    ? "Disponibile"
                    : cell.status === "closed"
                      ? "Chiuso"
                      : cell.status === "full"
                        ? "Occupato"
                        : "Non disponibile"}
                </div>
              </button>
            ) : (
              <div key={`empty-${index}`} />
            )
          )}
        </div>
      </section>

      <section
        ref={bookingPanelRef}
        className="rounded-[8px] border border-line bg-white p-5 shadow-card sm:p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Booking
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-ink">
              Dettagli della richiesta
            </h3>
          </div>
          <div className="rounded-full bg-mist px-4 py-2 text-sm text-zinc-600">
            {selectedDate ? (
              <>
                Data selezionata: <span className="font-semibold text-ink">{selectedLabel}</span>
              </>
            ) : (
              "Seleziona un giorno dal calendario"
            )}
          </div>
        </div>

        {selectedDate ? (
          <div className="mt-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Fasce orarie
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-[10px] border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedSlot === slot
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-line bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))
              ) : (
                <p className="rounded-[10px] border border-line bg-mist px-4 py-3 text-sm text-zinc-600">
                  {selectedStatus === "closed"
                    ? "Domenica chiuso."
                    : selectedStatus === "past"
                      ? "Data passata e non disponibile."
                      : "Questa data ha raggiunto il limite massimo di prenotazioni."}
                </p>
              )}
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 lg:grid-cols-2">
          <Field label="Nome e cognome">
            <input
              required
              value={booking.fullName}
              onChange={(event) =>
                setBooking({ ...booking, fullName: event.target.value })
              }
              className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
              placeholder="Il tuo nome completo"
            />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              value={booking.email}
              onChange={(event) =>
                setBooking({ ...booking, email: event.target.value })
              }
              className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
              placeholder="tu@email.com"
            />
          </Field>
          <Field label="Prefisso telefonico">
            <select
              required
              value={booking.phonePrefix}
              onChange={(event) =>
                setBooking({ ...booking, phonePrefix: event.target.value })
              }
              className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
            >
              {fullBookingPrefixList.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Numero di telefono">
            <input
              required
              type="tel"
              inputMode="tel"
              value={booking.phoneNumber}
              onChange={(event) =>
                setBooking({ ...booking, phoneNumber: event.target.value })
              }
              className="h-12 w-full rounded-[8px] border border-line bg-white px-4 text-sm text-ink"
              placeholder="333 123 4567"
            />
          </Field>
          <div className="lg:col-span-2">
            <Field label="Nota">
              <textarea
                value={booking.notes}
                onChange={(event) =>
                  setBooking({ ...booking, notes: event.target.value })
                }
                className="min-h-32 w-full resize-y rounded-[8px] border border-line bg-white px-4 py-3 text-sm leading-6 text-ink"
                placeholder="Aggiungi dettagli, idee o richieste particolari."
              />
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Se preferisci Zoom, una chiamata telefonica o un altro canale, scrivilo qui sotto nelle note.
              </p>
            </Field>
          </div>
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={
                submitState === "sending" ||
                !selectedDate ||
                !selectedSlot ||
                selectedStatus !== "available" ||
                !booking.fullName ||
                !booking.email ||
                !booking.phoneNumber
              }
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:w-auto"
            >
              {submitState === "sending" ? "Invio in corso..." : "Invia richiesta"}
              <Send className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
            {submitMessage ? (
              <p
                className={`mt-3 text-sm ${
                  submitState === "success" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {submitMessage}
              </p>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  );
}
