// /app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/site.config";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_KENYA || site.contact?.whatsapp || "254748699460";

// Safe fallbacks from config
const BRAND = site.brand || "Spa Lounge";
const PHONE =
  (site.contact?.phone as string) || process.env.NEXT_PUBLIC_PHONE || "+254 748 699 460";
const ADDRESS = (site.address as string) || "Nairobi, Kenya";
const EMAIL = (site.contact?.email as string) || "hello@tech24.co.ke";

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

/* ---------- Inline icons ---------- */
function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M20 4s-6 0-10 4-4 10-4 10 6 0 10-4 4-10 4-10z" strokeWidth="1.6" />
      <path d="M4 20c4-4 8-8 12-12" strokeWidth="1.6" />
    </svg>
  );
}
function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 2l1.8 4.6L18 8l-4.2 1.4L12 14l-1.8-4.6L6 8l4.2-1.4L12 2z" strokeWidth="1.3" />
      <path d="M19 11l.9 2.3L22 14l-2.1.7L19 17l-.9-2.3L16 14l2.1-.7L19 11z" strokeWidth="1.3" />
    </svg>
  );
}
function HeartHandsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M8 12s-2-2-4-1 0 6 4 8 4 1 4 1" strokeWidth="1.6" />
      <path d="M16 12s2-2 4-1 0 6-4 8-4 1-4 1" strokeWidth="1.6" />
      <path d="M8.5 8.5a3 3 0 014.2 0l.3.3.3-.3a3 3 0 014.2 4.2L13 17l-4.5-4.3a3 3 0 010-4.2z" strokeWidth="1.6" />
    </svg>
  );
}

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

export default function Page() {
  // simple autoplay (can extend later)
  const slides = useMemo(
    () => [{ src: "/templates/spa-hero.jpg", alt: "Relaxing spa ambience" }],
    []
  );
  const [idx, setIdx] = useState(0);
  const [logoError, setLogoError] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [slides.length]);

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

  // ====== REAL GALLERY ARRAY ======
  const galleryImages = [
    { src: "/gallery/image1.jpg", alt: "Massage therapy with candlelight" },
    { src: "/gallery/image2.jpg", alt: "Hydrating facial treatment" },
    { src: "/gallery/image3.jpg", alt: "Cozy spa interior with warm tones" },
    { src: "/gallery/image4.jpg", alt: "Pedicure corner in natural palette" },
    { src: "/gallery/image5.jpg", alt: "Hot stone massage setup" },
    { src: "/gallery/image6.jpg", alt: "Couples relaxation session" },
    { src: "/gallery/image7.jpg", alt: "Reception and lounge design" },
    { src: "/gallery/image8.jpg", alt: "Aromatherapy essentials" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-28">
      {/* ===== TOP BAR ===== */}
      <div className="w-full bg-[#7A5C6A] text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between">
          <div className="flex flex-wrap items-center gap-4 opacity-95">
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
                href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
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
              className="rounded-full bg-white text-[#7A5C6A] px-4 py-1.5 font-semibold hover:bg-gray-100 transition"
            >
              Book on WhatsApp
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
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {!logoError && (
              <Image
                src="/spa-logo.svg"
                alt={site.brand}
                width={34}
                height={34}
                className="shrink-0"
                onError={() => setLogoError(true)}
              />
            )}
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-gray-900 group-hover:text-[#7A5C6A] transition">
                {BRAND}
              </div>
              <div className="text-[11px] text-gray-500 -mt-0.5">
                Wellness &amp; Beauty
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-[#7A5C6A]">Services</a>
            <a href="#treatments" className="hover:text-[#7A5C6A]">Treatments</a>
            <a href="#packages" className="hover:text-[#7A5C6A]">Packages</a>
            <a href="#gallery" className="hover:text-[#7A5C6A]">Gallery</a>
            <a href="#testimonials" className="hover:text-[#7A5C6A]">Testimonials</a>
            <a href="#faq" className="hover:text-[#7A5C6A]">FAQ</a>
            <a href="#contact" className="hover:text-[#7A5C6A]">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative h-[74vh] min-h-[520px] overflow-hidden">
        <Image
          key={slides[idx].src}
          src={slides[idx].src}
          alt={slides[idx].alt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />

        {/* soft blush gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,27,46,0.45)_0%,rgba(30,27,46,0.65)_100%)]" />

        {/* content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Breathe. Unwind. Glow.
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-100">
            Massages, facials, nails &amp; wellness rituals in a calm, luxurious space.
            Same-day appointments on WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`https://wa.me/${WA}`}
              target="_blank"
              className="h-12 rounded-full bg-[#25D366] text-white font-semibold px-6 grid place-items-center hover:brightness-95"
            >
              Book a session
            </Link>
            <a
              href="#services"
              className="h-12 rounded-full bg-white/10 border border-white/30 text-white font-semibold px-6 grid place-items-center hover:bg-white/20"
            >
              Explore services
            </a>
          </div>
        </div>
      </section>

      {/* ===== SERVICES STRIP ===== */}
      <section id="services" className="py-14 px-6 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { Icon: LeafIcon, title: "Holistic Care", text: "Organic oils, clean formulas, mindful touch." },
            { Icon: SparkleIcon, title: "Skin Glow", text: "Dermaplane, deep cleanse & rejuvenating facials." },
            { Icon: HeartHandsIcon, title: "Personal Attention", text: "Tailored rituals to your mood & goals." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 grid place-items-center h-16 w-16 rounded-full bg-[#7A5C6A]/10">
                <Icon className="h-7 w-7 text-[#7A5C6A]" aria-hidden />
              </div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-gray-600 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SIGNATURE TREATMENTS ===== */}
      <section id="treatments" className="bg-[#F7F1F5] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#7A5C6A] text-center mb-10">
            Signature Treatments
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Aromatherapy Massage",
                desc: "60–90 min full-body with warm oils and calming blends.",
                img: "/templates/imag1.jpg",
              },
              {
                title: "Hydra Glow Facial",
                desc: "Deep cleanse, exfoliation & hydrating masks for instant radiance.",
                img: "/templates/image5.jpg",
              },
              {
                title: "Classic Mani-Pedi",
                desc: "Cuticle care, shaping & long-wear polish in serene comfort.",
                img: "/templates/image2.jpg",
              },
            ].map((card) => (
              <article key={card.title} className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
                <div className="relative h-44">
                  <Image src={card.img} alt="" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                  <p className="text-gray-600 mt-1">{card.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <Link
                      href={`https://wa.me/${WA}`}
                      target="_blank"
                      className="text-[#7A5C6A] font-semibold hover:underline underline-offset-4"
                    >
                      Book now
                    </Link>
                    <Link
                      href={`https://wa.me/${WA}`}
                      target="_blank"
                      className="rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Ask price
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PACKAGES (pricing) ===== */}
      <section id="packages" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#7A5C6A] text-center mb-10">
          Retreat Packages
        </h2>

        <div className="grid md:grid-cols-4 gap-6 items-stretch">
          {[
            {
              name: "Express Reset",
              price: "KES 2,500",
              note: "45 min",
              items: ["Back & neck massage", "Quick glow facial", "Herbal tea"],
              badge: "Start here",
            },
            {
              name: "Weekend Glow",
              price: "KES 4,500",
              note: "90 min",
              items: ["Aromatherapy massage", "Hydrating facial", "Hand treatment"],
            },
            {
              name: "Couples Ritual",
              price: "KES 7,900",
              note: "2 x 75 min",
              items: ["Side-by-side massage", "Warm oils", "Private lounge"],
              badge: "Popular",
            },
            {
              name: "Bridal Prep",
              price: "KES 6,500",
              note: "120 min",
              items: ["Deep cleanse facial", "Mani-pedi", "Brow shaping"],
            },
          ].map((p) => (
            <div key={p.name} className="relative h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              {p.badge && (
                <div className="self-start text-xs font-semibold px-2 py-1 rounded-full bg-[#7A5C6A]/10 text-[#7A5C6A] mb-3 inline-block">
                  {p.badge}
                </div>
              )}
              <div className="font-semibold">{p.name}</div>
              <div className="text-3xl font-extrabold mt-2">{p.price}</div>
              <div className="text-sm text-gray-500">{p.note}</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {p.items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7A5C6A]" />
                    {i}
                  </li>
                ))}
              </ul>
              <div className="pb-16" />
              <Link
                href={`https://wa.me/${WA}`}
                target="_blank"
                className="absolute left-6 right-6 bottom-6 rounded-xl bg-[#25D366] text-white font-semibold py-2.5 grid place-items-center hover:brightness-95"
              >
                Book on WhatsApp
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="bg-white py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#7A5C6A] text-center mb-8">
          Inside the Spa
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryImages.map((img, i) => (
            <div key={i} className="relative h-40 md:h-48 rounded-2xl overflow-hidden">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ===== RESULTS STRIP ===== */}
      <section ref={resultsRef} className="bg-[#7A5C6A] text-white py-10 mt-2" aria-label="Highlights">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { k: "5-Star Reviews", v: "1,000+" },
            { k: "Repeat Guests", v: "85%" },
            { k: "Years of Care", v: "10+" },
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

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#7A5C6A] text-center mb-12">
          What Guests Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Naomi K.",
              role: "Kilimani",
              quote:
                "Best massage I’ve had in Nairobi. The scent, the music—everything was perfect.",
              avatar: "/avatars/sarah.jpg",
            },
            {
              name: "Lydia M.",
              role: "Westlands",
              quote:
                "My skin is glowing! The facial felt luxurious and results were instant.",
              avatar: "/avatars/brian.jpg",
            },
            {
              name: "Samantha W.",
              role: "Lavington",
              quote:
                "Calm, spotless and professional. I’m coming back with my sister.",
              avatar: "/avatars/aisha.jpg",
            },
          ].map((t) => (
            <div key={t.name} className="p-8 rounded-3xl border border-gray-100 shadow-sm bg-white">
              <div className="flex items-center gap-4">
                <Avatar
                  src={t.avatar}
                  alt={`${t.name} photo`}
                  fallback={t.name.split(" ").map((s) => s[0]).join("")}
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

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#7A5C6A] text-center mb-8">
          Frequently asked questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Do you accept walk-ins?",
              a: "We recommend booking via WhatsApp to secure a slot, but we accept walk-ins when available.",
            },
            {
              q: "Which products do you use?",
              a: "Clean, skin-safe brands with gentle fragrances and salon-grade results.",
            },
            {
              q: "Is there parking?",
              a: "Yes—guest parking is available on site. Ask us on WhatsApp for directions.",
            },
            {
              q: "Couples & group bookings?",
              a: "Absolutely. We can arrange back-to-back or parallel sessions for couples and small groups.",
            },
          ].map((f) => (
            <details key={f.q} className="rounded-2xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
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
              title="Spa location"
              src={MAP_EMBED_SRC}
              className="w-full h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info */}
          <div className="rounded-3xl overflow-hidden shadow p-8 bg-white">
            <h3 className="text-2xl font-bold text-[#7A5C6A]">Visit us or chat now</h3>
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
