"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/site.config";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_KENYA || "254748699460";

// Safe fallbacks from config
const BRAND = site.brand || "Spa Lounge";
const PHONE =
  (site.contact?.phone as string) ||
  process.env.NEXT_PUBLIC_PHONE ||
  "+254 748 699 460";
const ADDRESS = (site.address as string) || "Nairobi, Kenya";
const EMAIL = (site.contact?.email as string) || "hello@tech24.co.ke";

// Map embed for the address
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

function Avatar({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: string;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 grid place-items-center">
      {!err && src ? (
        <Image
          src={src}
          alt={alt}
          width={56}
          height={56}
          className="h-full w-full object-cover"
          onError={() => setErr(true)}
        />
      ) : (
        <span className="text-gray-600 text-sm font-semibold">{fallback}</span>
      )}
    </div>
  );
}


/* ---------- Inline icons ---------- */
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2.2 2.2L15 10.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SmileyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path
        d="M8 14.5c1.2 1.2 2.6 1.8 4 1.8s2.8-.6 4-1.8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ChatBubbleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 16l-1 4 4-1h9a3 3 0 003-3V7a3 3 0 00-3-3H7a3 3 0 00-3 3v9z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 9h8M8 12h6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Page() {
  // keep a minimal slides structure (can extend later)
  const slides = useMemo(
    () => [{ src: "", alt: "Students learning with a tutor" }],
    []
  );

  const [idx, setIdx] = useState(0);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [slides.length]);

  // curriculum tabs
  const curricula = {
    KCSE: [
      "Mathematics",
      "English",
      "Kiswahili",
      "Physics",
      "Chemistry",
      "Biology",
      "Business",
      "Computer Studies",
      "History",
    ],
    IGCSE: [
      "Maths",
      "English First/Second Language",
      "Physics",
      "Chemistry",
      "Biology",
      "Business Studies",
      "ICT",
      "Economics",
    ],
    Primary: ["Math", "English", "Kiswahili", "Science", "Social Studies"],
  } as const;

  const [tab, setTab] = useState<keyof typeof curricula>("KCSE");

  // simple appear animation trigger
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const [revealResults, setRevealResults] = useState(false);
  useEffect(() => {
    const el = resultsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setRevealResults(true)),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-28">
      {/* ===== TOP BAR ===== */}
      <div className="w-full bg-[#0B1B3A] text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between">
          <div className="flex flex-wrap items-center gap-4 opacity-90">
            <span>
              📞{" "}
              <a className="hover:underline" href={`tel:${PHONE}`}>
                {PHONE}
              </a>
            </span>
            <span>
              📍{" "}
              <a
                className="hover:underline"
                target="_blank"
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  ADDRESS
                )}`}
              >
                {ADDRESS}
              </a>
            </span>
            <span>
              ✉️{" "}
              <a className="hover:underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`https://wa.me/${WA}`}
              target="_blank"
              className="rounded-full bg-white text-[#0B1B3A] px-4 py-1.5 font-semibold hover:bg-gray-100 transition"
            >
              Chat on WhatsApp
            </Link>
            <a
              target="_blank"
              href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
              className="rounded-full border border-white/40 px-4 py-1.5 hover:bg-white/10"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* ===== NAV ===== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {!logoError && (
              <Image
                src="/brand/education-logo.svg"
                alt={site.brand}
                width={34}
                height={34}
                className="shrink-0"
                onError={() => setLogoError(true)}
              />
            )}
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-gray-900 group-hover:text-[#0B1B3A] transition">
                {BRAND}
              </div>
              <div className="text-[11px] text-gray-500 -mt-0.5">
                Tutoring &amp; Exam Prep
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#curriculum" className="hover:text-[#0B1B3A]">
              Curriculum
            </a>
            <a href="#subjects" className="hover:text-[#0B1B3A]">
              Subjects
            </a>
            <a href="#why" className="hover:text-[#0B1B3A]">
              Why Us
            </a>
            <a href="#pricing" className="hover:text-[#0B1B3A]">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-[#0B1B3A]">
              Testimonials
            </a>
            <a href="#faq" className="hover:text-[#0B1B3A]">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[#0B1B3A]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
<section className="relative h-[74vh] min-h-[520px] overflow-hidden">
  {/* background image */}
  <Image
    src="/templates/education-hero.jpg"
    alt=""
    fill
    priority
    sizes="100vw"
    quality={85}
    aria-hidden
    className="object-cover object-center"
  />


  {/* gradient overlay for readability */}
  <div className="absolute inset-0 bg-[radial-gradient(1000px_480px_at_70%_10%,rgba(8,20,43,0.45)_0%,rgba(8,20,43,0.35)_35%,rgba(8,20,43,0.25)_60%),linear-gradient(180deg,rgba(8,20,43,0.55)_0%,rgba(11,27,58,0.75)_100%)]" />


  {/* content */}
  <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center text-white">
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
      Unlock better grades with 1-to-1 tutoring
    </h1>
    <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-200">
      Personalized lessons for Primary, Secondary, KCSE &amp; IGCSE/GCSE. Vetted tutors.
      Weekly progress updates.
    </p>

    <div className="mt-10 w-full max-w-3xl">
      <div className="bg-white rounded-2xl shadow-2xl p-3 grid grid-cols-1 md:grid-cols-4 gap-3 text-left">
        <input
          placeholder="Subject (e.g., Math, Chemistry)"
          className="col-span-1 md:col-span-2 h-12 rounded-xl border border-gray-300 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] bg-white"
        />
        <select
          className="h-12 rounded-xl border border-gray-300 px-4 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] appearance-none"
          defaultValue="Level"
        >
          <option disabled>Level</option>
          <option>Primary</option>
          <option>Secondary</option>
          <option>IGCSE / GCSE</option>
          <option>KCSE</option>
          <option>University</option>
        </select>
        <Link
          href="#curriculum"
          className="h-12 rounded-xl bg-[#25D366] text-white font-semibold px-6 grid place-items-center hover:brightness-95"
        >
          Find Tutors
        </Link>
      </div>
      <p className="text-xs text-gray-200 mt-2">
        Tip: Try “Math KCSE” or “English IGCSE”.
      </p>
    </div>
  </div>
</section>


      {/* ===== CURRICULUM TABS (unique) ===== */}
      <section id="curriculum" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3A]">
            Curriculum
          </h2>
          <div className="flex gap-2 rounded-xl bg-gray-100 p-1">
            {(["KCSE", "IGCSE", "Primary"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  tab === k
                    ? "bg-white shadow text-[#0B1B3A]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {curricula[tab].map((s) => (
            <Link
              key={s}
              href={`https://wa.me/${WA}`}
              target="_blank"
              className="rounded-xl border px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
            >
              <span>{s}</span>
              <span className="text-xs text-gray-500">Ask tutor →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== SUBJECTS ===== */}
      <section id="subjects" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3A]">
            Popular Subjects
          </h2>
          <Link
            href={`https://wa.me/${WA}`}
            target="_blank"
            className="text-sm md:text-base underline underline-offset-4 hover:opacity-80"
          >
            Not listed? Ask on WhatsApp →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Mathematics", desc: "From basics to past papers & exam drills", emoji: "➗" },
            { title: "English & Kiswahili", desc: "Reading, writing, comprehension & speaking", emoji: "🗣️" },
            { title: "Chemistry", desc: "Clear explanations + lab concepts made easy", emoji: "⚗️" },
            { title: "Biology", desc: "Diagrams, processes, and memory techniques", emoji: "🧬" },
            { title: "Physics", desc: "Problem-solving with step-by-step breakdowns", emoji: "🧪" },
            { title: "Business & Accounting", desc: "Core ideas + simplified methods", emoji: "📊" },
          ].map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-3xl bg-white shadow hover:shadow-2xl transition p-6 border border-gray-100"
            >
              <div className="text-3xl">{p.emoji}</div>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-600">{p.desc}</p>
              <div className="mt-6 flex items-center justify-between">
                <Link
                  href={`https://wa.me/${WA}`}
                  target="_blank"
                  className="text-[#0B1B3A] font-semibold hover:underline underline-offset-4"
                >
                  Request a tutor
                </Link>
                <Link
                  href={`https://wa.me/${WA}`}
                  target="_blank"
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Ask now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== RESULTS STRIP (unique) ===== */}
      <section
        ref={resultsRef}
        className="bg-[#0B1B3A] text-white py-10 mt-2"
        aria-label="Results metrics"
      >
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { k: "Avg. grade boost", v: "1–2 letters" },
            { k: "Parents who’d recommend", v: "97%" },
            { k: "Sessions delivered", v: "10,000+" },
          ].map((m, i) => (
            <div
              key={m.k}
              className={`rounded-2xl border border-white/10 p-6 transition ${
                revealResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDuration: `${450 + i * 120}ms` }}
            >
              <div className="text-2xl font-extrabold">{m.v}</div>
              <div className="text-sm opacity-80 mt-1">{m.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section id="why" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              Icon: ShieldCheckIcon,
              title: "Vetted Tutors",
              text: "ID & background checks — quality you can trust.",
            },
            {
              Icon: SmileyIcon,
              title: "Personalized Plans",
              text: "Baseline assessment + a clear weekly improvement plan.",
            },
            {
              Icon: ChatBubbleIcon,
              title: "Instant Support",
              text: "Ask on WhatsApp and get answers in minutes, not days.",
            },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="text-center p-8 bg-white rounded-3xl shadow-sm"
            >
              <div className="mx-auto mb-4 grid place-items-center h-16 w-16 rounded-full bg-[#0B1B3A]/5">
                <Icon className="h-8 w-8 text-[#0B1B3A]" aria-hidden />
              </div>
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

{/* ===== PRICING (unique) ===== */}
<section id="pricing" className="py-16 px-6 max-w-6xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3A] text-center mb-10">
    Simple, transparent pricing
  </h2>

  <div className="grid md:grid-cols-4 gap-6 items-stretch">
    {[
      {
        name: "Trial Lesson",
        price: "KES 0",
        note: "30 minutes online",
        items: ["Assessment", "Learning plan", "Tutor match"],
        badge: "Start here",
      },
      {
        name: "Standard",
        price: "KES 1,999",
        note: "per session",
        items: ["1 hour", "Any subject", "Homework help"],
      },
      {
        name: "Exam Prep",
        price: "KES 2,499",
        note: "per session",
        items: ["1.5 hours", "Past papers", "Exam strategy"],
        badge: "Popular",
      },
      {
        name: "Online Intensive",
        price: "KES 1,699",
        note: "per session",
        items: ["1 hour online", "Flexible schedule", "Parent updates"],
      },
    ].map((p) => (
      <div
        key={p.name}
        className="relative h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {p.badge && (
          <div className="self-start text-xs font-semibold px-2 py-1 rounded-full bg-[#0B1B3A]/10 text-[#0B1B3A] mb-3 inline-block">
            {p.badge}
          </div>
        )}

        <div className="font-semibold">{p.name}</div>
        <div className="text-3xl font-extrabold mt-2">{p.price}</div>
        <div className="text-sm text-gray-500">{p.note}</div>

        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          {p.items.map((i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0B1B3A]" />
              {i}
            </li>
          ))}
        </ul>

        {/* Reserve bottom space for the fixed-position button */}
        <div className="pb-16" />

        {/* Pinned button */}
        <Link
          href={`https://wa.me/${WA}`}
          target="_blank"
          className="absolute left-6 right-6 bottom-6 rounded-xl bg-[#25D366] text-white font-semibold py-2.5 grid place-items-center hover:brightness-95"
        >
          Book now
        </Link>
      </div>
    ))}
  </div>
</section>

{/* ===== TESTIMONIALS ===== */}
<section id="testimonials" className="py-16 px-6 max-w-6xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3A] text-center mb-12">
    Parent & Student Feedback
  </h2>
  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        name: "Sarah K.",
        role: "Parent, Kilimani",
        quote:
          "Our son jumped from a C to an A- in Math within a term. Weekly updates kept us confident.",
        avatar: "/avatars/sarah.jpg",
      },
      {
        name: "Brian M.",
        role: "Student, KCSE",
        quote:
          "Chemistry finally clicked. The tutor broke concepts down and drilled past papers with me.",
        avatar: "/avatars/brian.jpg",
      },
      {
        name: "Aisha N.",
        role: "IGCSE Student",
        quote:
          "English writing improved fast. I loved the practical tips and clear feedback.",
        avatar: "/avatars/aisha.jpg",
      },
    ].map((t) => (
      <div
        key={t.name}
        className="p-8 rounded-3xl border border-gray-100 shadow-sm bg-white"
      >
        <div className="flex items-center gap-4">
          <Avatar
            src={t.avatar}
            alt={`${t.name} photo`}
            fallback={t.name.split(' ').map(s=>s[0]).join('')}
          />
          <div>
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-gray-500">{t.role}</div>
          </div>
        </div>
        <p className="mt-4 text-gray-700">“{t.quote}”</p>
      </div>
    ))}
  </div>
</section>

      {/* ===== FAQ (unique) ===== */}
      <section id="faq" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3A] text-center mb-8">
          Frequently asked questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Do you teach at home or online?",
              a: "Both. We cover Nairobi for in-person sessions and offer online lessons across Kenya.",
            },
            {
              q: "How do you select tutors?",
              a: "Interviews, subject tests, reference checks and ongoing feedback from parents.",
            },
            {
              q: "Can you help with exam past papers?",
              a: "Yes—KCSE & IGCSE/GCSE past papers are part of Exam Prep with marking schemes.",
            },
            {
              q: "How do parents track progress?",
              a: "We share a short summary after each session and a weekly progress update.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <summary className="cursor-pointer font-semibold">
                {f.q}
              </summary>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow">
            <iframe
              title="Office location"
              src={MAP_EMBED_SRC}
              className="w-full h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info */}
          <div className="rounded-3xl overflow-hidden shadow p-8 bg-white">
            <h3 className="text-2xl font-bold text-[#0B1B3A]">
              Visit us or chat now
            </h3>
            <p className="text-gray-600 mt-2">
              {ADDRESS} · {PHONE} · {EMAIL}
            </p>
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <Link
                href={`https://wa.me/${WA}`}
                target="_blank"
                className="rounded-full bg-[#25D366] text-white px-6 py-3 font-semibold hover:brightness-95"
              >
                WhatsApp Us
              </Link>
              <a
                target="_blank"
                href={`tel:${PHONE}`}
                className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-50"
              >
                Call Now
              </a>
              <a
                target="_blank"
                href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
                className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-50"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-100 py-8 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {BRAND}. Powered by Tech24.
      </footer>

      {/* Floating WhatsApp */}
      <Link
        href={`https://wa.me/${WA}`}
        target="_blank"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 rounded-full h-14 w-14 flex items-center justify-center shadow-xl bg-[#25D366] hover:brightness-95 transition"
      >
        <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={26} height={26} />
      </Link>
    </main>
  );
}


