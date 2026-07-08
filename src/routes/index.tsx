import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import heroCookies from "@/assets/hero-cookies.jpg";
import aboutMaker from "@/assets/about-maker.jpg";
import weddingCheersBeers from "@/assets/gallery/wedding-cheers-beers-just-married.jpg.asset.json";
import weddingBrideToBeLove from "@/assets/gallery/wedding-bride-to-be-love.jpg.asset.json";
import weddingMonogramB from "@/assets/gallery/wedding-monogram-b-love-floral.jpg.asset.json";
import weddingGlTq from "@/assets/gallery/wedding-gl-tq-champagne.jpg.asset.json";
import weddingBrightLove from "@/assets/gallery/wedding-bright-love-cake-florals.jpg.asset.json";
import weddingButtercreamFlowers from "@/assets/gallery/wedding-buttercream-flower-neutrals.jpg.asset.json";
import weddingDdLove from "@/assets/gallery/wedding-dd-love-06-03-23.jpg.asset.json";
import galleryCorporate from "@/assets/gallery-corporate.jpg";
import galleryHoliday from "@/assets/gallery-holiday.jpg";

import birthdayCarsHudson from "@/assets/gallery/birthday-cars-hudson.jpg.asset.json";
import birthday90thEunice from "@/assets/gallery/birthday-90th-eunice.jpg.asset.json";
import birthdayDinosaursRawr from "@/assets/gallery/birthday-dinosaurs-rawr.jpg.asset.json";
import birthdayDonutsSophia from "@/assets/gallery/birthday-donuts-sophia.jpg.asset.json";
import birthdayUnderTheSeaEmmy from "@/assets/gallery/birthday-under-the-sea-emmy.jpg.asset.json";
import birthdaySpaceStars from "@/assets/gallery/birthday-space-reach-four-stars.jpg.asset.json";
import birthdayHappyDudeJoe from "@/assets/gallery/birthday-happy-dude-joe.jpg.asset.json";
import birthdayBatmanNoah from "@/assets/gallery/birthday-batman-noah.jpg.asset.json";
import birthdayPumpkinsAj from "@/assets/gallery/birthday-pumpkins-aj-one.jpg.asset.json";

import babyOhBoyBlue from "@/assets/gallery/baby-oh-boy-blue.jpg.asset.json";
import babyLittleCowboy from "@/assets/gallery/baby-little-cowboy.jpg.asset.json";
import babyBurgundyHearts from "@/assets/gallery/baby-burgundy-pink-hearts.jpg.asset.json";
import babyBearlyWait from "@/assets/gallery/baby-bearly-wait.jpg.asset.json";
import babyPinkPiglet from "@/assets/gallery/baby-pink-piglet.jpg.asset.json";
import babyAhoyNautical from "@/assets/gallery/baby-ahoy-nautical.jpg.asset.json";
import babyTeddyBearGender from "@/assets/gallery/baby-teddy-bear-gender.jpg.asset.json";

import occasionMastersGolf from "@/assets/gallery/occasion-masters-golf-azaleas.jpg.asset.json";
import occasionMastersJacket from "@/assets/gallery/occasion-masters-green-jacket-usa.jpg.asset.json";
import occasionMonogramG from "@/assets/gallery/occasion-monogram-g-white.jpg.asset.json";
import occasionUnicorns from "@/assets/gallery/occasion-unicorns-rainbows.jpg.asset.json";
import occasionToughCookie from "@/assets/gallery/occasion-tough-cookie-ring-that-bell.jpg.asset.json";
import occasionMarylandCrabs from "@/assets/gallery/occasion-maryland-crabs-sailboats.jpg.asset.json";
import occasionPinkRibbon from "@/assets/gallery/occasion-pink-ribbon-hearts.jpg.asset.json";
import occasionTeddyBears from "@/assets/gallery/occasion-teddy-bears.jpg.asset.json";
import occasionShootingStars from "@/assets/gallery/occasion-shooting-stars.jpg.asset.json";
import occasionBalletSlippers from "@/assets/gallery/occasion-ballet-slippers.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
});

type Category = "all" | "wedding" | "birthday" | "baby" | "corporate" | "holiday" | "occasion";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Weddings" },
  { id: "birthday", label: "Birthdays" },
  { id: "baby", label: "Baby Showers" },
  { id: "corporate", label: "Corporate" },
  { id: "holiday", label: "Holidays" },
  { id: "occasion", label: "Occasions" },
];

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: Exclude<Category, "all">;
};

// Real photos from Tailored Sweet Treats. More will be added as they come in.
const GALLERY: GalleryItem[] = [
  { src: weddingMonogramB.url, alt: "Ivory sugar cookies with floral hexagon monograms, wedding date 6.28.24, gold rings, and 'love' script for a Virginia wedding", caption: "Floral Monogram Wedding — 6.28.24", category: "wedding" },
  { src: birthdayCarsHudson.url, alt: "Disney Cars themed sugar cookie set with Lightning McQueen, Mater, traffic lights, and 'Speed Limit 2' for Hudson's 2nd birthday", caption: "Hudson's Cars 2nd Birthday", category: "birthday" },
  { src: babyBearlyWait.url, alt: "Neutral teddy bear baby shower sugar cookies with 'We Can Bearly Wait' plaque, hot air balloon, and onesie", caption: "We Can Bearly Wait", category: "baby" },
  { src: birthdayDonutsSophia.url, alt: "Pastel donut, balloon, and number 3 sugar cookies personalized for Sophia's 3rd birthday", caption: "Sophia's Donut Party", category: "birthday" },
  { src: babyOhBoyBlue.url, alt: "Blue and white 'Oh Boy' baby shower sugar cookies with baby bottles, blocks, and gift shapes", caption: "Oh Boy — Blue & White", category: "baby" },
  { src: galleryCorporate, alt: "Custom logo sugar cookies for a DMV corporate event", caption: "Corporate Brand Set", category: "corporate" },
  { src: birthdayUnderTheSeaEmmy.url, alt: "Under-the-sea sugar cookies with seahorses, starfish, shells, and mermaid tails for Emmy's 5th birthday", caption: "Emmy's Under the Sea", category: "birthday" },
  { src: babyAhoyNautical.url, alt: "Nautical 'Ahoy It's a Boy' baby shower sugar cookies with sailboats, anchors, and sailor onesies", caption: "Ahoy — It's a Boy", category: "baby" },
  { src: birthdayDinosaursRawr.url, alt: "Pastel blue and green dinosaur sugar cookies with 'RAWR!' plaque for a 2nd birthday", caption: "Dinosaur RAWR Party", category: "birthday" },
  { src: babyLittleCowboy.url, alt: "Neutral brown and blue 'A Little Cowboy Is On The Way' baby shower sugar cookies with cow print rattles and bandana onesies", caption: "A Little Cowboy Is On The Way", category: "baby" },
  { src: birthdaySpaceStars.url, alt: "Pastel space themed sugar cookies with planets, rockets, and 'Reach Four the Stars' for a 4th birthday", caption: "Reach Four the Stars", category: "birthday" },
  { src: babyPinkPiglet.url, alt: "Pink Piglet baby shower sugar cookies with onesies, bottles, and 'baby' script", caption: "Pink Piglet Baby Shower", category: "baby" },
  { src: birthdayBatmanNoah.url, alt: "Batman and Robin superhero sugar cookies personalized with 'Noah' for a 4th birthday", caption: "Noah's Batman & Robin", category: "birthday" },
  { src: babyBurgundyHearts.url, alt: "Burgundy and pink baby shower sugar cookies with hearts, bottles, and baby footprints", caption: "Burgundy & Blush Baby", category: "baby" },
  { src: birthday90thEunice.url, alt: "Elegant rose gold '90' sugar cookies with white piped roses for Eunice's 90th birthday", caption: "Eunice's 90th", category: "birthday" },
  { src: babyTeddyBearGender.url, alt: "Gender reveal sugar cookies with a teddy bear, blue and pink onesies and bottles", caption: "Teddy Bear Gender Reveal", category: "baby" },
  { src: birthdayHappyDudeJoe.url, alt: "Sage green checkered smiley face 'One Happy Dude' sugar cookies for Joe's 1st birthday", caption: "One Happy Dude — Joe", category: "birthday" },
  { src: birthdayPumpkinsAj.url, alt: "Fall themed pumpkin and floral number 1 sugar cookies for AJ's first birthday", caption: "AJ's Pumpkin First Birthday", category: "birthday" },
  { src: galleryHoliday, alt: "Silver and white snowflake holiday sugar cookies", caption: "Winter Collection", category: "holiday" },
  { src: weddingBrideToBeLove.url, alt: "Pastel bridal shower sugar cookies with 'Bride To Be', 'love' script, diamond rings, and champagne bottles", caption: "Bride To Be — Pastel Bridal Shower", category: "wedding" },
  { src: weddingCheersBeers.url, alt: "'Cheers & Beers' engagement sugar cookies with beer bottles est. 2024 and blue 'Just Married' cars for E+C", caption: "Cheers & Beers — E+C 2024", category: "wedding" },
  { src: weddingGlTq.url, alt: "Elegant ivory and gold GL|TQ monogram wedding sugar cookies with champagne bottles, diamond rings, and 03.24.24 date", caption: "GL & TQ — 03.24.24", category: "wedding" },
  { src: weddingBrightLove.url, alt: "Bright pink, yellow, and orange 'love' wedding sugar cookies with buttercream flowers, diamond rings, and tiered cakes", caption: "Bright Love — Buttercream Bridal", category: "wedding" },
  { src: weddingButtercreamFlowers.url, alt: "Sixteen round sugar cookies topped with piped buttercream flowers in ivory, blush, and chocolate tones with pearl centers", caption: "Buttercream Flower Bar", category: "wedding" },
  { src: weddingDdLove.url, alt: "Blush and ivory 'D|D' monogram wedding sugar cookies with 'love' hearts, diamond rings, and 06.03.23 date", caption: "D & D — 06.03.23", category: "wedding" },
  { src: occasionMastersGolf.url, alt: "Masters golf party sugar cookies with green jackets, azaleas, USA course map, golf balls, and putting greens", caption: "Masters Watch Party", category: "occasion" },
  { src: occasionMastersJacket.url, alt: "Masters themed sugar cookies with green jackets, yellow USA course map with red flag, and dimpled golf balls", caption: "Green Jacket Sunday", category: "occasion" },
  { src: occasionMonogramG.url, alt: "White-on-white script 'G' monogram sugar cookies for an elegant DMV event", caption: "Script G Monogram", category: "occasion" },
  { src: occasionUnicorns.url, alt: "Pastel unicorn and rainbow sugar cookies with gold horns and cloud accents", caption: "Unicorns & Rainbows", category: "occasion" },
  { src: occasionToughCookie.url, alt: "Breast cancer awareness sugar cookies with 'Tough Cookie', 'Ring That Bell', 'Cancer messed with the wrong girl', and pink ribbons", caption: "Tough Cookie — Awareness Set", category: "occasion" },
  { src: occasionMarylandCrabs.url, alt: "Maryland themed sugar cookies with red crabs, state flag, Natty Boh cans, and sailboats for a DMV summer party", caption: "Maryland Summer", category: "occasion" },
  { src: occasionPinkRibbon.url, alt: "Pink ribbon breast cancer awareness sugar cookies on heart and awareness ribbon shapes", caption: "Pink Ribbon Awareness", category: "occasion" },
  { src: occasionTeddyBears.url, alt: "Airbrushed brown teddy bear sugar cookies with paw pads for a DMV bear-themed event", caption: "Teddy Bear Set", category: "occasion" },
  { src: occasionShootingStars.url, alt: "Yellow shooting star and star sugar cookies for a celebration favor set", caption: "Shooting Stars Favors", category: "occasion" },
  { src: occasionBalletSlippers.url, alt: "Pink and gold ballet slipper sugar cookies with piped bows for a dance recital", caption: "Ballet Slippers — Recital", category: "occasion" },
];

const PAGE_SIZE = 12;

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
          Tailored Sweet Treats
        </a>
        <div className="hidden gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:flex">
          <a href="#gallery" className="transition-colors hover:text-foreground">See the cookies</a>
          <a href="#about" className="transition-colors hover:text-foreground">Meet the baker</a>
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
        Custom sugar cookies · Made in the DMV
      </span>
      <h1 className="animate-reveal mb-8 text-balance font-display text-5xl leading-[0.95] tracking-tight [animation-delay:100ms] md:text-8xl">
        Hand-decorated sugar cookies
        <br />
        for <span className="italic">every</span> celebration.
      </h1>
      <p className="animate-reveal mb-12 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground [animation-delay:150ms] md:text-base">
        Custom-designed, hand-piped sugar cookies baked to order in Northern Virginia — serving DC, Maryland, and Virginia.
      </p>
      <div className="animate-reveal w-full max-w-4xl [animation-delay:200ms]">
        <img
          src={heroCookies}
          alt="Hand-decorated custom sugar cookies on a warm neutral surface"
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
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (active === "all" ? GALLERY : GALLERY.filter((g) => g.category === active)),
    [active]
  );

  // Reset pagination when the filter changes.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [active]);

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % shown.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, shown.length]);

  return (
    <section id="gallery" className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-md">
            <h2 className="mb-4 text-pretty font-display text-4xl italic">A few favorite sugar cookie designs</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every batch is baked fresh, hand-piped, and designed around your event. Pick a category to see what we've been up to.
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {shown.map((item, idx) => (
            <figure
              key={item.src}
              className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-sm outline outline-1 -outline-offset-1 outline-black/5"
              onClick={() => setLightbox(idx)}
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

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full border border-foreground px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {lightbox !== null && shown[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-widest text-white/80 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
          >
            Close ✕
          </button>
          <button
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-2xl text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? null : (i - 1 + shown.length) % shown.length)); }}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-2xl text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? null : (i + 1) % shown.length)); }}
          >
            ›
          </button>
          <figure className="flex max-h-full max-w-4xl flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={shown[lightbox].src}
              alt={shown[lightbox].alt}
              className="max-h-[80vh] w-auto rounded-sm object-contain"
            />
            <figcaption className="text-center font-mono text-[10px] uppercase tracking-widest text-white/80">
              {shown[lightbox].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-32 md:grid-cols-2 md:gap-20">
      <div className="order-2 md:order-1">
        <img
          src={aboutMaker}
          alt="Baker's hands piping royal icing onto a custom sugar cookie in a home kitchen"
          width={800}
          height={1000}
          loading="lazy"
          className="aspect-[3/4] w-full rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/5"
        />
      </div>
      <div className="order-1 md:order-2">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Meet the baker
        </span>
        <h2 className="mb-8 font-display text-4xl italic leading-tight md:text-5xl">
          Baked with love — and a lot of piping bags.
        </h2>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Tailored Sweet Treats is a home-based sugar cookie business in Northern Virginia, serving the entire DMV.
          Every order is baked fresh, hand decorated, and made specially for you — no two batches are quite the same.
        </p>
        <p className="mb-10 leading-relaxed text-muted-foreground">
          We only do sugar cookies, and we love the tiny details — the perfect shade of icing, the little florals,
          the monogram that matches your invitation. Whether it's a wedding, a baby shower, or a corporate launch,
          we're here to make your treats feel personal.
        </p>
        <div className="flex items-center gap-4 border-t border-border pt-8">
          <div className="grid size-12 place-items-center rounded-full bg-accent/10">
            <div className="size-2 rounded-full bg-accent" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest">
            Northern Virginia · Serving the DMV
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
      toast.error("Mind filling in your name, email, and what you're dreaming up?");
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
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Got it! We'll be in touch within 2 business days.");
    (e.target as HTMLFormElement).reset();
  };

  const inputCls =
    "w-full bg-transparent border-b border-stone-700 py-2 text-sm text-white placeholder:text-stone-500 focus:border-white focus:outline-none transition-colors";
  const labelCls = "font-mono text-[10px] uppercase tracking-widest text-stone-400";

  return (
    <section id="quote" className="bg-ink py-24 text-ink-foreground md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center md:mb-20">
          <h2 className="mb-4 font-display text-4xl italic md:text-5xl">Let's get this party started</h2>
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
          <span className="font-display text-xl italic">Tailored Sweet Treats</span>
          <a
            href="mailto:hello@tailoredsweettreats.com"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent"
          >
            hello@tailoredsweettreats.com
          </a>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Serving the DMV — Northern VA · DC · MD
          </span>
        </div>
        <div className="flex gap-8">
          <a
            href="https://www.instagram.com/tailoredsweettreats/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-accent"
          >
            Instagram
          </a>
          <a
            href="#quote"
            className="font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-accent"
          >
            Contact
          </a>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Tailored Sweet Treats
        </p>
      </div>
    </footer>
  );
}
