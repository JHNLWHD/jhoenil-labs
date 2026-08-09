import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Leaf,
  Play,
  Shield,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import BookACall from '@/components/BookACall';
import { cn } from '@/lib/utils';

/**
 * /gallery — a style-comparison gallery, not a full site.
 *
 * 20 self-contained mini-heroes, one per light-mode design system, each using
 * Jhoenil's real name/headline/proof (not "Acme Inc" placeholder copy). Each
 * card's colors, type, radius, shadow, and signature layout trick are drawn
 * from an actual token spec — captured live from designprompts.dev — not
 * guessed from a thumbnail. No card shares markup with another; the whole
 * point is that they read as genuinely different systems side by side.
 *
 * This is intentionally NOT 20 full pages: it's a fast way to compare
 * directions before committing depth to any one of them.
 */

const NAME = 'Jhoenil Wahid';
const HEADLINE = "I build the software your business runs on.";
const SUB = 'Web apps, mobile apps, and systems that replace manual work.';

const CardMeta = ({
  n,
  name,
  blurb,
  children,
}: {
  n: string;
  name: string;
  blurb: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">{children}</div>
    <div className="mt-3 flex items-baseline gap-2 px-1">
      <span className="font-mono text-xs text-neutral-400">{n}</span>
      <h3 className="text-sm font-semibold text-neutral-900">{name}</h3>
    </div>
    <p className="px-1 text-xs text-neutral-500">{blurb}</p>
  </div>
);

const Gallery = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafaf8] font-sans text-neutral-900 antialiased">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
          <Link to="/" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
            ← Back to main site
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Style gallery
          </h1>
          <p className="mt-2 max-w-xl text-neutral-600">
            20 light-mode design systems, each rendering the same headline and proof points.
            One page, one scroll, real comparison — not 20 separate sites to click through.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* 01 — Monochrome */}
          <CardMeta n="01" name="Monochrome" blurb="Pure black &amp; white, serif, zero radius.">
            <div className="flex h-[380px] flex-col justify-between bg-white p-7" style={{ fontFamily: "'Playfair Display', serif" }}>
              <div className="flex items-center justify-between border-b-2 border-black pb-3 font-sans text-[10px] font-medium uppercase tracking-[0.2em]">
                <span>{NAME}</span>
                <span>Available</span>
              </div>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight">
                Software your business runs on.
              </h2>
              <div>
                <div className="mb-4 h-1 w-16 bg-black" />
                <button className="border-2 border-black bg-black px-6 py-3 font-sans text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">
                  Book a call →
                </button>
              </div>
            </div>
          </CardMeta>

          {/* 02 — Newsprint */}
          <CardMeta n="02" name="Newsprint" blurb="Cream paper, red masthead, drop cap.">
            <div className="flex h-[380px] flex-col bg-[#f7f3ea] p-6" style={{ fontFamily: "'Fraunces', serif" }}>
              <div className="flex items-center justify-between border-b-2 border-black pb-2 font-sans text-[10px] font-bold uppercase tracking-[0.15em]">
                <span style={{ fontFamily: "'Fraunces', serif" }} className="text-base font-black normal-case tracking-normal">{NAME}</span>
                <span>Vol. 5 — No. 1</span>
              </div>
              <div className="mt-3 inline-flex w-fit items-center gap-1 bg-[#b5342a] px-1.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider text-white">
                Available now
              </div>
              <h2 className="mt-2 text-3xl font-semibold leading-tight">{HEADLINE}</h2>
              <div className="mt-3 flex flex-1 gap-3 border-t border-black pt-3">
                <span className="text-5xl leading-none">J</span>
                <p className="font-sans text-xs leading-relaxed text-neutral-700">{SUB}</p>
              </div>
              <div className="mt-3 flex items-center justify-between border-t-2 border-black pt-2 font-mono text-[10px] uppercase tracking-wider">
                <span>5+ yrs · 10+ shipped</span>
                <span className="text-[#b5342a]">Read more →</span>
              </div>
            </div>
          </CardMeta>

          {/* 03 — SaaS */}
          <CardMeta n="03" name="SaaS" blurb="Soft blue gradient, pill CTA, avatar stack.">
            <div className="relative flex h-[380px] flex-col justify-center overflow-hidden bg-gradient-to-br from-[#eef2ff] via-white to-[#e0e7ff] p-7">
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-indigo-600 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available now
              </span>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-slate-900">
                Transform the way your <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-4">team works.</span>
              </h2>
              <p className="mt-3 text-sm text-slate-500">{SUB}</p>
              <div className="mt-5 flex items-center gap-3">
                <button className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-200 transition-colors hover:bg-indigo-700">
                  Book a call →
                </button>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Play className="h-3 w-3" /> Watch demo
                </span>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-indigo-300 to-purple-300" />)}
                </div>
                <span className="text-xs text-slate-500">Trusted by growing teams</span>
              </div>
            </div>
          </CardMeta>

          {/* 04 — Luxury */}
          <CardMeta n="04" name="Luxury" blurb="Editorial serif, hairlines, black-and-white.">
            <div className="flex h-[380px] flex-col justify-between bg-[#f5f1ea] p-7">
              <div className="flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                <span>{NAME}.</span>
                <span className="rounded-full border border-neutral-400 px-2 py-0.5">Inquire</span>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  <span className="h-px w-6 bg-neutral-400" /> Est. 2021
                </p>
                <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl leading-[0.95]">
                  Software<br /><span className="italic">your business</span><br />runs on.
                </h2>
              </div>
              <button className="w-fit bg-black px-6 py-3 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                Book a call
              </button>
            </div>
          </CardMeta>

          {/* 05 — Swiss Minimalist */}
          <CardMeta n="05" name="Swiss Minimalist" blurb="Grotesk caps, red rule, geometric shapes.">
            <div className="relative flex h-[380px] flex-col justify-between overflow-hidden bg-white p-7" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="flex items-center justify-between border-b-2 border-black pb-3 text-sm font-bold uppercase">
                <span>{NAME}</span>
                <span className="bg-[#e5342b] px-3 py-1 text-xs text-white">Book</span>
              </div>
              <div>
                <h2 className="text-4xl font-bold uppercase leading-[0.95] tracking-tight">
                  Software<br />your business<br />runs on.
                </h2>
                <div className="mt-3 h-2 w-24 bg-[#e5342b]" />
              </div>
              <div className="flex items-end justify-between text-xs uppercase tracking-wider text-neutral-500">
                <span>Trusted by · i3pl · SolarTech</span>
                <div className="h-8 w-8 rotate-45 border-2 border-black" />
              </div>
              <div className="pointer-events-none absolute -right-6 top-16 h-16 w-16 rounded-full border-2 border-[#e5342b]/40" />
            </div>
          </CardMeta>

          {/* 06 — Flat Design */}
          <CardMeta n="06" name="Flat Design" blurb="Solid saturated blue, zero shadow, bold tiles.">
            <div className="flex h-[380px] flex-col bg-[#2f6fed] p-7 text-white">
              <span className="mb-3 w-fit rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">Available now</span>
              <h2 className="text-3xl font-extrabold leading-[1.1]">{HEADLINE}</h2>
              <p className="mt-2 text-sm text-white/80">{SUB}</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-md bg-white px-5 py-2.5 text-sm font-bold text-[#2f6fed]">Book a call</button>
                <button className="rounded-md border-2 border-white px-5 py-2.5 text-sm font-bold text-white">Demo</button>
              </div>
              <div className="mt-auto grid grid-cols-3 gap-2 pt-4">
                <div className="rounded-md bg-[#22c55e] p-2 text-center"><div className="text-lg font-extrabold">5+</div><div className="text-[9px] uppercase">Years</div></div>
                <div className="rounded-md bg-[#f59e0b] p-2 text-center"><div className="text-lg font-extrabold">10+</div><div className="text-[9px] uppercase">Shipped</div></div>
                <div className="rounded-md bg-white/20 p-2 text-center"><div className="text-lg font-extrabold">3.5K+</div><div className="text-[9px] uppercase">Reached</div></div>
              </div>
            </div>
          </CardMeta>

          {/* 07 — Material Design */}
          <CardMeta n="07" name="Material Design" blurb="Rounded lavender surface, pill buttons.">
            <div className="flex h-[380px] flex-col bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold">{NAME}</span>
                <button className="rounded-full bg-violet-600 px-4 py-1.5 text-xs font-medium text-white">Get started</button>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#ede9fe] to-[#f5f3ff] p-6 text-center">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] text-violet-700 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> Available for new work
                </span>
                <h2 className="text-2xl font-bold leading-tight text-neutral-800">{HEADLINE}</h2>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-md">Book a call</button>
                  <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-violet-700 shadow-sm">Watch demo</button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {['5+ yrs', '10+', '3.5K+'].map((v) => (
                  <div key={v} className="rounded-2xl bg-[#f3f0fb] py-2 text-sm font-bold text-violet-700">{v}</div>
                ))}
              </div>
            </div>
          </CardMeta>

          {/* 08 — Neo Brutalism */}
          <CardMeta n="08" name="Neo Brutalism" blurb="Thick borders, hard shadow, tilted stickers.">
            <div
              className="relative flex h-[380px] flex-col justify-between overflow-hidden bg-white p-7"
              style={{ backgroundImage: 'radial-gradient(#00000022 1px, transparent 1px)', backgroundSize: '14px 14px' }}
            >
              <div className="flex items-center justify-between border-4 border-black bg-white px-3 py-2 text-sm font-black uppercase">
                <span>{NAME}</span>
                <span className="bg-[#ff6b9d] px-2 py-1 text-xs">Get started</span>
              </div>
              <div className="relative mt-2">
                <div className="-rotate-2 border-4 border-black bg-white px-3 py-2 text-2xl font-black uppercase shadow-[6px_6px_0_#000]">
                  Software your
                </div>
                <div className="mt-2 rotate-1 border-4 border-black bg-[#fde047] px-3 py-2 text-2xl font-black uppercase shadow-[6px_6px_0_#000]">
                  business runs on.
                </div>
                <div className="absolute -right-2 -top-3 flex h-10 w-10 rotate-12 items-center justify-center rounded-full border-2 border-black bg-[#ff6b9d]">
                  <Star className="h-5 w-5 fill-white text-black" />
                </div>
              </div>
              <button className="w-fit border-4 border-black bg-[#a5f3fc] px-5 py-2.5 text-sm font-black uppercase shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5">
                Book a call
              </button>
            </div>
          </CardMeta>

          {/* 09 — Academia */}
          <CardMeta n="09" name="Academia" blurb="Oxblood, brass gold, serif, crest.">
            <div className="flex h-[380px] flex-col justify-between bg-[#241611] p-7 text-[#f0e2c8]">
              <div className="flex items-center justify-between border-b border-[#c9a35c]/40 pb-3">
                <span style={{ fontFamily: "'Fraunces', serif" }} className="text-lg">{NAME}</span>
                <span className="rounded-full border border-[#c9a35c] px-3 py-1 text-[10px] uppercase tracking-widest text-[#c9a35c]">Enroll</span>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a35c]">
                  <span className="h-px w-6 bg-[#c9a35c]" /> Est. MMXXI
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl leading-tight">
                  <span className="text-[#c9a35c] italic">Transform</span> the way your team works.
                </h2>
              </div>
              <button className="w-fit border border-[#c9a35c] bg-[#c9a35c] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#241611]">
                Book a call
              </button>
            </div>
          </CardMeta>

          {/* 10 — Playful Geometric */}
          <CardMeta n="10" name="Playful Geometric" blurb="Pastel shapes, sticky note, collage layering.">
            <div className="relative flex h-[380px] flex-col justify-between overflow-hidden bg-[#fdfbf5] p-7" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div aria-hidden className="pointer-events-none absolute right-6 top-6 h-20 w-20 rotate-45 rounded-2xl border-2 border-orange-300" />
              <div aria-hidden className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-violet-200/60" />
              <div className="flex items-center justify-between text-sm font-bold">
                <span>{NAME}</span>
                <button className="rounded-full bg-violet-600 px-4 py-1.5 text-xs text-white shadow-md">Get started</button>
              </div>
              <div className="relative">
                <div className="mb-3 w-fit -rotate-2 border border-amber-300 bg-amber-100 px-3 py-2 text-[11px] font-medium shadow-sm">
                  {SUB}
                </div>
                <h2 className="text-3xl font-bold leading-tight text-neutral-900">{HEADLINE}</h2>
              </div>
              <button className="relative flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
                Book a call <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </CardMeta>

          {/* 11 — Claymorphism */}
          <CardMeta n="11" name="Claymorphism" blurb="Puffy 3D shapes, dual soft shadow, pastel.">
            <div className="flex h-[380px] flex-col items-center justify-center bg-[#ece8fa] p-7 text-center">
              <span
                className="mb-4 rounded-full bg-[#ece8fa] px-4 py-2 text-[11px] font-medium text-violet-700"
                style={{ boxShadow: '4px 4px 8px #c9c4e0, -4px -4px 8px #ffffff' }}
              >
                Available for new projects
              </span>
              <h2 className="text-2xl font-bold leading-tight text-neutral-700">{HEADLINE}</h2>
              <button
                className="mt-5 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 px-6 py-3 text-sm font-semibold text-white"
                style={{ boxShadow: '6px 6px 14px #b9b4d6, -6px -6px 14px #ffffff' }}
              >
                Book a call →
              </button>
              <div className="mt-6 flex gap-3">
                {['5+', '10+', '3.5K+'].map((v) => (
                  <div
                    key={v}
                    className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#ece8fa] text-xs font-bold text-violet-700"
                    style={{ boxShadow: '5px 5px 10px #c9c4e0, -5px -5px 10px #ffffff' }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </CardMeta>

          {/* 12 — Professional */}
          <CardMeta n="12" name="Professional" blurb="Ivory, gold accent, centered serif.">
            <div className="flex h-[380px] flex-col items-center justify-center bg-[#faf6ee] p-7 text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a8823c]">Work smarter, achieve more</p>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl leading-tight">{HEADLINE}</h2>
              <div className="my-4 h-px w-16 bg-[#a8823c]" />
              <p className="mb-5 max-w-xs text-sm text-neutral-500">{SUB}</p>
              <div className="flex gap-2">
                <button className="bg-[#a8823c] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white">Book a call</button>
                <button className="border border-neutral-800 px-5 py-2.5 text-xs font-medium uppercase tracking-wider">Watch demo</button>
              </div>
            </div>
          </CardMeta>

          {/* 13 — Botanical */}
          <CardMeta n="13" name="Botanical" blurb="Cream, terracotta &amp; sage, italic serif.">
            <div className="flex h-[380px] flex-col justify-between bg-[#faf5ee] p-7">
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "'Instrument Serif', serif" }} className="text-xl italic">{NAME}</span>
                <span className="flex items-center gap-1 rounded-full border border-[#7a8b6f] px-3 py-1 text-[10px] uppercase tracking-wide text-[#7a8b6f]">
                  <Leaf className="h-3 w-3" /> Sign in
                </span>
              </div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl leading-[1.05]">
                Software your business <span className="italic text-[#b5754b]">runs on.</span>
              </h2>
              <div className="rounded-2xl bg-white/70 p-3 text-sm italic text-neutral-600">
                "{SUB}"
              </div>
              <button className="w-fit rounded-full bg-[#7a8b6f] px-6 py-2.5 text-sm font-medium text-white">
                Book a call
              </button>
            </div>
          </CardMeta>

          {/* 14 — Enterprise */}
          <CardMeta n="14" name="Enterprise" blurb="Crisp white, indigo, shield mark, trust line.">
            <div className="flex h-[380px] flex-col bg-white p-7">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Shield className="h-4 w-4 fill-indigo-600 text-white" /> {NAME}
                </span>
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">Get started</button>
              </div>
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
                <span className="rounded bg-indigo-600 px-1 text-[9px] text-white">NEW</span> Now booking Q1
              </span>
              <h2 className="text-3xl font-bold leading-tight">
                Transform the way <span className="text-indigo-600">your team works.</span>
              </h2>
              <div className="mt-4 flex gap-2">
                <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">Book a call →</button>
                <button className="flex items-center gap-1.5 rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold"><Play className="h-3 w-3" /> Watch demo</button>
              </div>
              <p className="mt-3 text-xs text-neutral-400">No obligation · 20-minute call</p>
              <div className="mt-auto grid grid-cols-4 gap-2 border-t border-neutral-100 pt-4 text-center">
                {['5+ yrs', '10+', '3.5K+', 'Sole dev'].map((v) => (
                  <div key={v} className="text-sm font-bold text-neutral-800">{v}</div>
                ))}
              </div>
            </div>
          </CardMeta>

          {/* 15 — Sketch */}
          <CardMeta n="15" name="Sketch" blurb="Hand-drawn borders, wireframe, marker font.">
            <div className="flex h-[380px] flex-col justify-between bg-white p-7" style={{ backgroundImage: 'radial-gradient(#00000015 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "'Caveat', cursive" }} className="rounded-full border-2 border-neutral-700 px-3 py-0.5 text-xl">{NAME}</span>
                <button style={{ fontFamily: "'Caveat', cursive" }} className="rotate-1 rounded-md border-2 border-neutral-700 px-3 py-1 text-lg">Get started!</button>
              </div>
              <div>
                <h2 style={{ fontFamily: "'Caveat', cursive" }} className="text-4xl leading-tight text-neutral-800">
                  Software your business runs on <span className="text-rose-400">!</span>
                </h2>
                <p className="mt-1 text-sm text-neutral-500">{SUB}</p>
              </div>
              <div className="flex items-center gap-3">
                <button style={{ fontFamily: "'Caveat', cursive" }} className="-rotate-1 border-2 border-neutral-700 px-5 py-2 text-xl">
                  Book a call
                </button>
                <div className="relative h-10 w-16 rotate-2 border-2 border-dashed border-neutral-400 text-center text-[9px] leading-10 text-neutral-400">
                  sketch
                  <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-rose-200" />
                </div>
              </div>
            </div>
          </CardMeta>

          {/* 16 — Industrial */}
          <CardMeta n="16" name="Industrial" blurb="Steel gray, HUD chrome, bezeled panel.">
            <div className="flex h-[380px] flex-col justify-between bg-gradient-to-b from-[#eef1f4] to-[#dfe6ec] p-7" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900"><Zap className="h-3.5 w-3.5 text-red-500" /></span>
                  {NAME}
                </span>
                <button className="rounded bg-[#dc2626] px-4 py-1.5 text-xs font-bold uppercase text-white">Sign up</button>
              </div>
              <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-600 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> System operational
              </span>
              <h2 className="text-3xl font-bold leading-tight text-neutral-800">{HEADLINE}</h2>
              <div className="mt-3 rounded-xl border-2 border-neutral-800 bg-neutral-800 p-3">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                  <span>connected_01</span>
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-neutral-900">active</span>
                </div>
                <div className="mt-2 h-1.5 w-2/3 rounded-full bg-neutral-600">
                  <div className="h-1.5 w-4/5 rounded-full bg-red-500" />
                </div>
              </div>
            </div>
          </CardMeta>

          {/* 17 — Neumorphism */}
          <CardMeta n="17" name="Neumorphism" blurb="Monochrome gray, embossed soft-UI shadows.">
            <div className="flex h-[380px] flex-col items-center justify-center bg-[#e4e9ef] p-7 text-center">
              <div className="mb-5 rounded-2xl bg-[#e4e9ef] p-5" style={{ boxShadow: '8px 8px 16px #b8c0cc, -8px -8px 16px #ffffff' }}>
                <h2 className="text-2xl font-bold leading-tight text-neutral-700">{HEADLINE}</h2>
              </div>
              <button
                className="rounded-xl bg-[#e4e9ef] px-6 py-3 text-sm font-semibold text-indigo-600"
                style={{ boxShadow: '6px 6px 12px #b8c0cc, -6px -6px 12px #ffffff' }}
              >
                Book a call
              </button>
              <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e4e9ef]" style={{ boxShadow: 'inset 4px 4px 8px #b8c0cc, inset -4px -4px 8px #ffffff' }}>
                <div className="h-9 w-9 rounded-full bg-indigo-500" style={{ boxShadow: '3px 3px 6px #8b93a8' }} />
              </div>
            </div>
          </CardMeta>

          {/* 18 — Organic */}
          <CardMeta n="18" name="Organic" blurb="Moss green, terracotta, centered serif.">
            <div className="flex h-[380px] flex-col items-center justify-center bg-[#f6f4ec] p-7 text-center">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] text-[#4a5d3a] shadow-sm">
                <Leaf className="h-3 w-3" /> Available for new work
              </span>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl font-medium leading-tight">{HEADLINE}</h2>
              <div className="mt-5 flex gap-2">
                <button className="rounded-lg bg-[#4a5d3a] px-5 py-2.5 text-sm font-medium text-white">Book a call</button>
                <button className="rounded-lg border border-[#4a5d3a] px-5 py-2.5 text-sm font-medium text-[#4a5d3a]">Watch demo</button>
              </div>
              <div className="mt-6 flex gap-6">
                {[['5+', 'yrs'], ['10+', 'shipped'], ['3.5K+', 'reached']].map(([v, l]) => (
                  <div key={v}>
                    <div style={{ fontFamily: "'Fraunces', serif" }} className="text-xl text-[#4a5d3a]">{v}</div>
                    <div className="text-[9px] uppercase tracking-wider text-[#b5651d]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardMeta>

          {/* 19 — Maximalism */}
          <CardMeta n="19" name="Maximalism" blurb="Neon on dark, sticker chaos, dense layout.">
            <div className="relative flex h-[380px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#150a28] to-[#1a0a20] p-7">
              <Sparkles className="absolute right-6 top-16 h-6 w-6 text-fuchsia-400" />
              <Star className="absolute bottom-24 left-6 h-5 w-5 fill-cyan-300 text-cyan-300" />
              <div className="absolute right-10 bottom-10 h-10 w-10 rotate-12 rounded-lg border-2 border-fuchsia-400" />
              <div className="flex items-center justify-between text-sm font-bold text-white">
                <span>{NAME}</span>
                <button className="rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-1.5 text-xs text-white">Get started ✦</button>
              </div>
              <div className="inline-flex w-fit items-center gap-2 border-2 border-dashed border-yellow-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-yellow-300">
                ★ Available now ★
              </div>
              <h2
                className="text-3xl font-black uppercase leading-[1.05]"
                style={{ color: '#fff', textShadow: '2px 2px 0 #ff2e93, -2px -2px 0 #00f0ff' }}
              >
                Software your business runs on
              </h2>
              <button className="w-fit rounded-full bg-gradient-to-r from-yellow-300 via-fuchsia-400 to-cyan-300 px-6 py-2.5 text-sm font-black uppercase text-neutral-900">
                Book a call ✦
              </button>
            </div>
          </CardMeta>

          {/* 20 — Retro */}
          <CardMeta n="20" name="Retro" blurb="90s web: marquee, bevel, hit counter.">
            <div className="flex h-[380px] flex-col bg-[#c0c0c0]">
              <div className="overflow-hidden whitespace-nowrap bg-[#00008b] py-1 text-[10px] font-bold text-white">
                <span className="inline-block animate-[marquee_9s_linear_infinite]">
                  *** WELCOME TO THE OFFICIAL SITE OF {NAME.toUpperCase()} *** BOOK A CALL TODAY ***
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="flex items-center justify-between border-2 border-t-white border-l-white border-b-neutral-500 border-r-neutral-500 bg-[#d4d0c8] px-3 py-1.5">
                  <span className="text-xs font-bold">{NAME.toUpperCase()}</span>
                  <span className="bg-[#0000cd] px-2 py-0.5 text-[10px] font-bold text-white underline">SIGN UP!</span>
                </div>
                <div className="my-2 w-fit bg-red-600 px-2 py-0.5 text-[9px] font-bold text-white">NEW!</div>
                <h2
                  className="text-3xl font-black uppercase leading-tight"
                  style={{ fontFamily: "'Archivo Black', sans-serif", color: '#00cc00', textShadow: '2px 2px 0 #000' }}
                >
                  Software your business runs on
                </h2>
                <div
                  className="my-2 h-1.5 w-full"
                  style={{ background: 'linear-gradient(90deg, #ef4444, #eab308, #22c55e, #3b82f6, #a855f7)' }}
                />
                <button className="w-fit border-2 border-t-white border-l-white border-b-neutral-600 border-r-neutral-600 bg-[#008000] px-5 py-2 text-xs font-bold text-white active:border-t-neutral-600 active:border-l-neutral-600">
                  &gt;&gt;&gt; BOOK A CALL &lt;&lt;&lt;
                </button>
                <div className="mt-2 w-fit bg-black px-2 py-1 font-mono text-[10px] text-[#00ff00]">
                  Visitors: 000{Math.floor(Math.random() * 900 + 100)} | Est. 2021
                </div>
              </div>
            </div>
          </CardMeta>

        </div>

        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-neutral-300 p-8 text-center">
          <p className="text-neutral-600">Found a direction you like? Tell me which number and I'll build it out.</p>
          <BookACall className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800" label="Book a call" />
        </div>

        <p className="mt-10 text-center text-xs text-neutral-400">
          Other takes: <Link to="/" className="underline hover:text-neutral-700">Main</Link>{' · '}
          <Link to="/bento" className="underline hover:text-neutral-700">Bento</Link>{' · '}
          <Link to="/console" className="underline hover:text-neutral-700">Console</Link>{' · '}
          <Link to="/flagship" className="underline hover:text-neutral-700">Flagship</Link>{' · '}
          <Link to="/deck" className="underline hover:text-neutral-700">Deck</Link>{' · '}
          <Link to="/ops" className="underline hover:text-neutral-700">Ops</Link>
        </p>
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
