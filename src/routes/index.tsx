import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import heroCookies from "@/assets/hero-cookies.jpg";
import aboutMaker from "@/assets/about-maker.jpg";
import galleryWedding1 from "@/assets/gallery-wedding-1.jpg";
import galleryWedding2 from "@/assets/gallery-wedding-2.jpg";
import galleryBirthday1 from "@/assets/gallery-birthday-1.jpg";
import galleryBirthday2 from "@/assets/gallery-birthday-2.jpg";
import galleryBaby from "@/assets/gallery-baby.jpg";
import galleryCorporate from "@/assets/gallery-corporate.jpg";
import galleryHoliday from "@/assets/gallery-holiday.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

type Category = "all" | "wedding" | "birthday" | "baby" | "corporate" | "holiday";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Weddings" },
  { id: "birthday", label: "Birthdays" },
  { id: "baby", label: "Baby Showers" },
  { id: "corporate", label: "Corporate" },
  { id: "holiday", label: "Holidays" },
];

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: Exclude<Category, "all">;
  span?: "wide" | "tall" | "normal";
};

const GALLERY: GalleryItem[] = [
  { src: galleryWedding1, alt: "White royal icing wedding cookies with gold leaf accents", caption: "Wedding Suite No. 04", category: "wedding", span: "wide" },
  { src: galleryCorporate, alt: "Corporate logo sugar cookies", caption: "Corporate Brand Set", category: "corporate" },
  { src: galleryBaby, alt: "Pastel baby shower cookies shaped like onesies and rattles", caption: "Spring Celebration", category: "baby" },
  { src: galleryBirthday1, alt: "Pastel birthday number cookies with sprinkles", caption: "Birthday Numerals", category: "birthday" },
  { src: galleryHoliday, alt: "Silver and white snowflake holiday cookies", caption: "Winter Collection", category: "holiday" },
  { src: galleryWedding2, alt: "Monogram wedding cookies with gold calligraphy", caption: "Monogram Series", category: "wedding" },
  { src: galleryBirthday2, alt: "Playful animal-shaped birthday cookies", caption: "Little Menagerie", category: "birthday" },
];

function Home() {
  return (
    <main className="bg-background text-foreground font-body selection:bg-accent/15">
      <Nav />
      <Hero />
      <Gallery />
      <About />
      <QuoteForm />
      <Footer />
      <Toaster />
    </main>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-display text-2xl italic tracking-tight">
          Taylor Sweet Treats
        </a>
        <div className="hidden gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:flex">
          <a href="#gallery" className="transition-colors hover:text-foreground">See the cookies</a>
          <a href="#about" className="transition-colors hover:text-foreground">Meet Taylor</a>
          <a href="#quote" className="text-accent transition-colors hover:text-foreground">
            Get a quote
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-20 pb-24 text-center md:pt-24 md:pb-32">
      <span className="animate-reveal mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        Custom sugar cookies, made by hand
      </span>
      <h1 className="animate-reveal mb-12 text-balance font-display text-5xl leading-[0.95] tracking-tight [animation-delay:100ms] md:text-8xl">
        Cookies that make
        <br />
        <span className="italic">every occasion</span> sweeter.
      </h1>
      <div className="animate-reveal w-full max-w-4xl [animation-delay:200ms]">
        <img
          src={heroCookies}
          alt="White royal icing snowflake sugar cookies on a warm neutral surface"
          width={1600}
          height={900}
          className="aspect-[21/9] w-full rounded-sm object-cover shadow-sm outline outline-1 -outline-offset-1 outline-black/5"
        />
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<Category>("all");
  const items = useMemo(
    () => (active === "all" ? GALLERY : GALLERY.filter((g) => g.category === active)),
    [active]
  );

  return (
    <section id="gallery" className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-md">
            <h2 className="mb-4 text-pretty font-display text-4xl italic">A few favorite designs</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every batch is baked fresh, hand-piped, and designed around your event. Pick a category below to see what we’ve been up to.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={
                    "rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all " +
                    (isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-foreground")
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          {items.map((item, idx) => (
            <figure
              key={item.src}
              className={
                "group relative overflow-hidden rounded-sm outline outline-1 -outline-offset-1 outline-black/5 " +
                (item.span === "wide" && idx === 0
                  ? "col-span-2 md:col-span-8 md:row-span-2 aspect-[4/3]"
                  : "col-span-1 md:col-span-4 aspect-square")
              }
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-32 md:grid-cols-2 md:gap-20">
      <div className="order-2 md:order-1">
        <img
          src={aboutMaker}
          alt="Baker's hands piping royal icing onto a sugar cookie in a home kitchen"
          width={800}
          height={1000}
          loading="lazy"
          className="aspect-[3/4] w-full rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/5"
        />
      </div>
      <div className="order-1 md:order-2">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Meet Taylor
        </span>
        <h2 className="mb-8 font-display text-4xl italic leading-tight md:text-5xl">
          Baked with love — and a lot of piping bags.
        </h2>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Taylor Sweet Treats started in a cozy home kitchen with one simple idea: sugar cookies should be just as fun
          to look at as they are to eat. Every order is baked fresh, hand decorated, and made specially for you.
        </p>
        <p className="mb-10 leading-relaxed text-muted-foreground">
          We love the tiny details — the perfect shade of icing, the little florals, the monogram that matches your
          invitation. Whether it’s a birthday, wedding, or “just because,” we’re here to make your treats feel personal.
        </p>
        <div className="flex items-center gap-4 border-t border-border pt-8">
          <div className="grid size-12 place-items-center rounded-full bg-accent/10">
            <div className="size-2 rounded-full bg-accent" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest">
            From our home kitchen to your celebration table
          </p>
        </div>
      </div>
    </section>
  );
}

const EVENT_TYPES = [
  "Birthday",
  "Wedding",
  "Baby Shower",
  "Holiday",
  "Corporate",
  "Other",
] as const;

function QuoteForm() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const details = String(fd.get("details") ?? "").trim();

    if (!name || !email || !details) {
      toast.error("Mind filling in your name, email, and what you’re dreaming up?");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("That email looks a little off — want to double-check it?");
      return;
    }
    if (name.length > 100 || details.length > 2000) {
      toast.error("Please keep your name and details within the character limits.");
      return;
    }

    setSubmitting(true);
    // No backend wired yet — simulate a successful submission and reset the form.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Got it! Taylor will be in touch within 2 business days.");
    (e.target as HTMLFormElement).reset();
  };

  const inputCls =
    "w-full bg-transparent border-b border-stone-700 py-2 text-sm text-white placeholder:text-stone-500 focus:border-white focus:outline-none transition-colors";
  const labelCls = "font-mono text-[10px] uppercase tracking-widest text-stone-400";

  return (
    <section id="quote" className="bg-ink py-24 text-ink-foreground md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center md:mb-20">
          <h2 className="mb-4 font-display text-4xl italic md:text-5xl">Let’s get this party started</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
            Most orders need about 3 weeks notice — the sooner, the better!
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          <Field label="Your name" className={labelCls}>
            <input required name="name" type="text" maxLength={100} placeholder="Alex Taylor" className={inputCls} />
          </Field>
          <Field label="Email" className={labelCls}>
            <input required name="email" type="email" maxLength={255} placeholder="hello@example.com" className={inputCls} />
          </Field>
          <Field label="Phone (optional)" className={labelCls}>
            <input name="phone" type="tel" maxLength={30} placeholder="(555) 000-0000" className={inputCls} />
          </Field>
          <Field label="What kind of event?" className={labelCls}>
            <select required name="eventType" defaultValue="" className={inputCls + " appearance-none"}>
              <option value="" disabled className="text-stone-900">Pick an event…</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t} className="text-stone-900">
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Event date" className={labelCls}>
            <input required name="eventDate" type="date" className={inputCls + " [color-scheme:dark]"} />
          </Field>
          <Field label="How many cookies? (dozens)" className={labelCls}>
            <input required name="quantity" type="number" min={1} max={999} placeholder="2" className={inputCls} />
          </Field>
          <Field label="Budget range (optional)" className={labelCls}>
            <input name="budget" type="text" maxLength={60} placeholder="e.g. $150 – $300" className={inputCls} />
          </Field>
          <Field label="Inspiration photos (optional)" className={labelCls}>
            <input
              name="inspiration"
              type="file"
              accept="image/*"
              multiple
              className="block w-full py-2 text-xs text-stone-300 file:mr-3 file:cursor-pointer file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:font-mono file:text-[10px] file:uppercase file:tracking-widest file:text-white hover:file:bg-white/20"
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Tell us your theme, colors, and vibe" className={labelCls}>
              <textarea
                required
                name="details"
                maxLength={2000}
                rows={4}
                placeholder="The more details, the better — colors, shapes, theme, anything you love!"
                className={inputCls + " resize-none"}
              />
            </Field>
          </div>
          <div className="pt-6 md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-white py-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 transition-colors hover:bg-stone-200 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send my request"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={className}>{label}</span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-display text-xl italic">Taylor Sweet Treats</span>
          <a
            href="mailto:hello@taylorsweettreats.com"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent"
          >
            hello@taylorsweettreats.com
          </a>
        </div>
        <div className="flex gap-8">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-accent"
          >
            Instagram
          </a>
          <a
            href="https://pinterest.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-accent"
          >
            Pinterest
          </a>
          <a
            href="#quote"
            className="font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-accent"
          >
            Contact
          </a>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Taylor Sweet Treats
        </p>
      </div>
    </footer>
  );
}
