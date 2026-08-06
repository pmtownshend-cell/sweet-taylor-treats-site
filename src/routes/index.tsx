import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { submitQuote } from "@/lib/quote.functions";

import heroCookies from "@/assets/hero-cookies.png";
import logo from "@/assets/tailored-sweet-treats-logo.jpg";
import aboutMaker from "@/assets/taylor-family.jpg";
import weddingCheersBeers from "@/assets/gallery/wedding-cheers-beers-just-married.jpg";
import weddingBrideToBeLove from "@/assets/gallery/wedding-bride-to-be-love.jpg";
import weddingMonogramB from "@/assets/gallery/wedding-monogram-b-love-floral.jpg";
import weddingGlTq from "@/assets/gallery/wedding-gl-tq-champagne.jpg";
import weddingBrightLove from "@/assets/gallery/wedding-bright-love-cake-florals.jpg";
import weddingButtercreamFlowers from "@/assets/gallery/wedding-buttercream-flower-neutrals.jpg";
import weddingDdLove from "@/assets/gallery/wedding-dd-love-06-03-23.jpg";
import collegeJmu from "@/assets/gallery/college-jmu-virginia.jpg";
import collegeAlabama from "@/assets/gallery/college-alabama-bama-bound-2024.jpg";
import collegeMaryland from "@/assets/gallery/college-maryland-alyssa-grad.jpg";
import holidayChristmas from "@/assets/gallery/holiday-christmas-classic.jpg";
import holidayValentines from "@/assets/gallery/holiday-valentines-love-letters.jpg";
import holidayHalloween from "@/assets/gallery/holiday-halloween-pink-ghosts.jpg";

import birthdayCarsHudson from "@/assets/gallery/birthday-cars-hudson.jpg";
import birthday90thEunice from "@/assets/gallery/birthday-90th-eunice.jpg";
import birthdayDinosaursRawr from "@/assets/gallery/birthday-dinosaurs-rawr.jpg";
import birthdayDonutsSophia from "@/assets/gallery/birthday-donuts-sophia.jpg";
import birthdayUnderTheSeaEmmy from "@/assets/gallery/birthday-under-the-sea-emmy.jpg";
import birthdaySpaceStars from "@/assets/gallery/birthday-space-reach-four-stars.jpg";
import birthdayHappyDudeJoe from "@/assets/gallery/birthday-happy-dude-joe.jpg";
import birthdayBatmanNoah from "@/assets/gallery/birthday-batman-noah.jpg";
import birthdayPumpkinsAj from "@/assets/gallery/birthday-pumpkins-aj-one.jpg";

import babyOhBoyBlue from "@/assets/gallery/baby-oh-boy-blue.jpg";
import babyLittleCowboy from "@/assets/gallery/baby-little-cowboy.jpg";
import babyBurgundyHearts from "@/assets/gallery/baby-burgundy-pink-hearts.jpg";
import babyBearlyWait from "@/assets/gallery/baby-bearly-wait.jpg";
import babyPinkPiglet from "@/assets/gallery/baby-pink-piglet.jpg";
import babyAhoyNautical from "@/assets/gallery/baby-ahoy-nautical.jpg";
import babyTeddyBearGender from "@/assets/gallery/baby-teddy-bear-gender.jpg";

import occasionMastersGolf from "@/assets/gallery/occasion-masters-golf-azaleas.jpg";
import occasionMastersJacket from "@/assets/gallery/occasion-masters-green-jacket-usa.jpg";
import occasionMonogramG from "@/assets/gallery/occasion-monogram-g-white.jpg";
import occasionUnicorns from "@/assets/gallery/occasion-unicorns-rainbows.jpg";
import occasionToughCookie from "@/assets/gallery/occasion-tough-cookie-ring-that-bell.jpg";
import occasionMarylandCrabs from "@/assets/gallery/occasion-maryland-crabs-sailboats.jpg";
import occasionPinkRibbon from "@/assets/gallery/occasion-pink-ribbon-hearts.jpg";
import occasionTeddyBears from "@/assets/gallery/occasion-teddy-bears.jpg";
import occasionShootingStars from "@/assets/gallery/occasion-shooting-stars.jpg";
import occasionBalletSlippers from "@/assets/gallery/occasion-ballet-slippers.jpg";
import occasionTeacherApple from "@/assets/gallery/occasion-teacher-apple-aplus.jpg";
import occasionLemonsTiles from "@/assets/gallery/occasion-lemons-blue-tiles.jpg";
import occasionFootball from "@/assets/gallery/occasion-football-go-team.jpg";
import occasionCookout from "@/assets/gallery/occasion-cookout-burgers-watermelon.jpg";
import babyInBloomMagnolia from "@/assets/gallery/baby-in-bloom-magnolia.jpg";
import babyWhatsTheScoop from "@/assets/gallery/baby-whats-the-scoop-gender-reveal.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

type Category = "all" | "wedding" | "birthday" | "baby" | "college" | "holiday" | "occasion";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Weddings" },
  { id: "birthday", label: "Birthdays" },
  { id: "baby", label: "Baby Showers" },
  { id: "college", label: "College" },
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
  { src: weddingMonogramB, alt: "Ivory sugar cookies with floral hexagon monograms, wedding date 6.28.24, gold rings, and 'love' script for a Virginia wedding", caption: "Floral Monogram Wedding — 6.28.24", category: "wedding" },
  { src: birthdayCarsHudson, alt: "Disney Cars themed sugar cookie set with Lightning McQueen, Mater, traffic lights, and 'Speed Limit 2' for Hudson's 2nd birthday", caption: "Hudson's Cars 2nd Birthday", category: "birthday" },
  { src: babyBearlyWait, alt: "Neutral teddy bear baby shower sugar cookies with 'We Can Bearly Wait' plaque, hot air balloon, and onesie", caption: "We Can Bearly Wait", category: "baby" },
  { src: birthdayDonutsSophia, alt: "Pastel donut, balloon, and number 3 sugar cookies personalized for Sophia's 3rd birthday", caption: "Sophia's Donut Party", category: "birthday" },
  { src: babyOhBoyBlue, alt: "Blue and white 'Oh Boy' baby shower sugar cookies with baby bottles, blocks, and gift shapes", caption: "Oh Boy — Blue & White", category: "baby" },
  { src: collegeMaryland, alt: "University of Maryland graduation sugar cookies with Testudo mascot, red M, black cap and gown, and 'Alyssa — University of Maryland' plaques", caption: "Alyssa — Maryland Grad", category: "college" },
  { src: birthdayUnderTheSeaEmmy, alt: "Under-the-sea sugar cookies with seahorses, starfish, shells, and mermaid tails for Emmy's 5th birthday", caption: "Emmy's Under the Sea", category: "birthday" },
  { src: babyAhoyNautical, alt: "Nautical 'Ahoy It's a Boy' baby shower sugar cookies with sailboats, anchors, and sailor onesies", caption: "Ahoy — It's a Boy", category: "baby" },
  { src: birthdayDinosaursRawr, alt: "Pastel blue and green dinosaur sugar cookies with 'RAWR!' plaque for a 2nd birthday", caption: "Dinosaur RAWR Party", category: "birthday" },
  { src: babyLittleCowboy, alt: "Neutral brown and blue 'A Little Cowboy Is On The Way' baby shower sugar cookies with cow print rattles and bandana onesies", caption: "A Little Cowboy Is On The Way", category: "baby" },
  { src: birthdaySpaceStars, alt: "Pastel space themed sugar cookies with planets, rockets, and 'Reach Four the Stars' for a 4th birthday", caption: "Reach Four the Stars", category: "birthday" },
  { src: babyPinkPiglet, alt: "Pink Piglet baby shower sugar cookies with onesies, bottles, and 'baby' script", caption: "Pink Piglet Baby Shower", category: "baby" },
  { src: birthdayBatmanNoah, alt: "Batman and Robin superhero sugar cookies personalized with 'Noah' for a 4th birthday", caption: "Noah's Batman & Robin", category: "birthday" },
  { src: babyBurgundyHearts, alt: "Burgundy and pink baby shower sugar cookies with hearts, bottles, and baby footprints", caption: "Burgundy & Blush Baby", category: "baby" },
  { src: birthday90thEunice, alt: "Elegant rose gold '90' sugar cookies with white piped roses for Eunice's 90th birthday", caption: "Eunice's 90th", category: "birthday" },
  { src: babyTeddyBearGender, alt: "Gender reveal sugar cookies with a teddy bear, blue and pink onesies and bottles", caption: "Teddy Bear Gender Reveal", category: "baby" },
  { src: birthdayHappyDudeJoe, alt: "Sage green checkered smiley face 'One Happy Dude' sugar cookies for Joe's 1st birthday", caption: "One Happy Dude — Joe", category: "birthday" },
  { src: birthdayPumpkinsAj, alt: "Fall themed pumpkin and floral number 1 sugar cookies for AJ's first birthday", caption: "AJ's Pumpkin First Birthday", category: "birthday" },
  { src: holidayChristmas, alt: "Classic Christmas sugar cookies with gingerbread man, ugly sweater, gift boxes, Santa, Christmas tree, gingerbread house, and snowflake", caption: "Classic Christmas Set", category: "holiday" },
  { src: holidayValentines, alt: "Pink and red Valentine's Day sugar cookies with hearts, 'LOVE', love letters, and personalized name banners", caption: "Valentine Love Letters", category: "holiday" },
  { src: holidayHalloween, alt: "Pastel pink Halloween sugar cookies with smiling ghosts, floral pumpkins, and candy corn", caption: "Pink Ghosts & Pumpkins", category: "holiday" },
  { src: weddingBrideToBeLove, alt: "Pastel bridal shower sugar cookies with 'Bride To Be', 'love' script, diamond rings, and champagne bottles", caption: "Bride To Be — Pastel Bridal Shower", category: "wedding" },
  { src: weddingCheersBeers, alt: "'Cheers & Beers' engagement sugar cookies with beer bottles est. 2024 and blue 'Just Married' cars for E+C", caption: "Cheers & Beers — E+C 2024", category: "wedding" },
  { src: weddingGlTq, alt: "Elegant ivory and gold GL|TQ monogram wedding sugar cookies with champagne bottles, diamond rings, and 03.24.24 date", caption: "GL & TQ — 03.24.24", category: "wedding" },
  { src: weddingBrightLove, alt: "Bright pink, yellow, and orange 'love' wedding sugar cookies with buttercream flowers, diamond rings, and tiered cakes", caption: "Bright Love — Buttercream Bridal", category: "wedding" },
  { src: weddingButtercreamFlowers, alt: "Sixteen round sugar cookies topped with piped buttercream flowers in ivory, blush, and chocolate tones with pearl centers", caption: "Buttercream Flower Bar", category: "wedding" },
  { src: weddingDdLove, alt: "Blush and ivory 'D|D' monogram wedding sugar cookies with 'love' hearts, diamond rings, and 06.03.23 date", caption: "D & D — 06.03.23", category: "wedding" },
  { src: occasionMastersGolf, alt: "Masters golf party sugar cookies with green jackets, azaleas, USA course map, golf balls, and putting greens", caption: "Masters Watch Party", category: "occasion" },
  { src: occasionMastersJacket, alt: "Masters themed sugar cookies with green jackets, yellow USA course map with red flag, and dimpled golf balls", caption: "Green Jacket Sunday", category: "occasion" },
  { src: occasionMonogramG, alt: "White-on-white script 'G' monogram sugar cookies for an elegant DMV event", caption: "Script G Monogram", category: "occasion" },
  { src: occasionUnicorns, alt: "Pastel unicorn and rainbow sugar cookies with gold horns and cloud accents", caption: "Unicorns & Rainbows", category: "occasion" },
  { src: occasionToughCookie, alt: "Breast cancer awareness sugar cookies with 'Tough Cookie', 'Ring That Bell', 'Cancer messed with the wrong girl', and pink ribbons", caption: "Tough Cookie — Awareness Set", category: "occasion" },
  { src: occasionMarylandCrabs, alt: "Maryland themed sugar cookies with red crabs, state flag, Natty Boh cans, and sailboats for a DMV summer party", caption: "Maryland Summer", category: "occasion" },
  { src: occasionPinkRibbon, alt: "Pink ribbon breast cancer awareness sugar cookies on heart and awareness ribbon shapes", caption: "Pink Ribbon Awareness", category: "occasion" },
  { src: occasionTeddyBears, alt: "Airbrushed brown teddy bear sugar cookies with paw pads for a DMV bear-themed event", caption: "Teddy Bear Set", category: "occasion" },
  { src: occasionShootingStars, alt: "Yellow shooting star and star sugar cookies for a celebration favor set", caption: "Shooting Stars Favors", category: "occasion" },
  { src: occasionBalletSlippers, alt: "Pink and gold ballet slipper sugar cookies with piped bows for a dance recital", caption: "Ballet Slippers — Recital", category: "occasion" },
  { src: occasionTeacherApple, alt: "Teacher appreciation sugar cookies with a red apple and notebook paper marked 'A+'", caption: "A+ Teacher Appreciation", category: "occasion" },
  { src: occasionLemonsTiles, alt: "Amalfi inspired sugar cookies with yellow lemons, lemon slices, and blue Mediterranean tile squares", caption: "Amalfi Lemons & Tiles", category: "occasion" },
  { src: occasionFootball, alt: "Game day sugar cookies with a brown football, blue 'Go Team' helmet, and X's and O's playbook", caption: "Game Day — Go Team", category: "occasion" },
  { src: occasionCookout, alt: "Summer cookout sugar cookies with cheeseburgers, hot dogs, watermelon slices, and ketchup and mustard bottles", caption: "Summer Cookout", category: "occasion" },
  { src: collegeJmu, alt: "James Madison University JMU sugar cookies in the shape of the state of Virginia with royal blue icing and gold JMU lettering", caption: "JMU — Virginia Bound", category: "college" },
  { src: collegeAlabama, alt: "Alabama 'Bama Bound Class of 2024' graduation sugar cookies with crimson elephant, script A, grad caps, and shield", caption: "Bama Bound — Class of 2024", category: "college" },
  { src: babyInBloomMagnolia, alt: "Pink 'Baby in Bloom' and 'Baby Magnolia' sugar cookies with florals, a pink arch, and a bunny onesie", caption: "Baby in Bloom", category: "baby" },
  { src: babyWhatsTheScoop, alt: "Ice cream themed gender reveal sugar cookies with 'What's the Scoop?' plaques, ice cream trucks, and cones", caption: "What's the Scoop? — Gender Reveal", category: "baby" },
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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Tailored Sweet Treats logo" className="h-12 w-12 rounded-full" />
          <span className="font-display text-2xl italic tracking-tight">Tailored Sweet Treats</span>
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
    <section id="top" className="flex flex-col items-center pt-6 pb-0 text-center md:pt-24">
      {/* Mobile only: left half of the collage above the text */}
      <div className="animate-reveal relative mb-10 w-full overflow-hidden aspect-[8/3] md:hidden">
        <img
          src={heroCookies}
          alt="Hand-decorated sugar cookies for every celebration"
          width={1920}
          height={360}
          className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover object-left"
        />
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="animate-reveal mb-6 text-balance font-display text-5xl leading-[0.95] tracking-tight [animation-delay:100ms] md:text-8xl">
          Thoughtfully crafted
          <br />
          for your sweetest moments.
        </h1>
        <p className="animate-reveal mb-12 text-lg text-balance leading-relaxed text-muted-foreground [animation-delay:100ms]">
          Custom, hand-decorated cookies made in Loudoun County, Virginia, for birthdays, showers, weddings, holidays, and every celebration in between.
        </p>
      </div>
      {/* Mobile only: right half of the collage below the text */}
      <div className="animate-reveal relative w-full overflow-hidden aspect-[8/3] [animation-delay:200ms] md:hidden">
        <img
          src={heroCookies}
          alt=""
          aria-hidden="true"
          width={1920}
          height={360}
          className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover object-right"
        />
      </div>

      {/* Desktop: full image below the text */}
      <div className="animate-reveal hidden w-full [animation-delay:200ms] md:block">
        <img
          src={heroCookies}
          alt="Hand-decorated sugar cookies for every celebration"
          width={1920}
          height={360}
          className="w-full object-contain"
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
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
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
    <section id="about" className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-32 md:grid-cols-2 md:gap-20">
      <div className="order-1 md:order-1">
        {/* Mobile only: heading above the photo */}
        <div className="md:hidden">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Meet the baker
          </span>
          <h2 className="mb-8 font-display text-5xl leading-[1.05]">
            Hi, I'm Taylor.
          </h2>
        </div>
        <img
          src={aboutMaker}
          alt="Taylor with her family — husband, two little ones, and their goldendoodle"
          width={800}
          height={1000}
          loading="lazy"
          className="aspect-[4/5] w-full rounded-xl object-cover shadow-[0_20px_60px_-20px_rgba(80,70,140,0.35)] outline outline-1 -outline-offset-1 outline-black/5"
        />
      </div>
      <div className="order-2 md:order-2">
        <div className="hidden md:block">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Meet the baker
          </span>
          <h2 className="mb-8 font-display text-5xl leading-[1.05] md:text-6xl">
            Hi, I'm Taylor.
          </h2>
        </div>

        <p className="mb-6 leading-relaxed text-muted-foreground">
          Tailored Sweet Treats grew out of a love for baking that’s been with me forever.
        </p>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          What started as a hobby quickly became something more when friends began asking me to make cookies for birthdays, showers, holidays, and all the little moments worth celebrating. These days, between life with two little ones and our fluffy goldendoodle, Brady, baking has become the thing I make time for — a creative outlet I love getting to share with others.
        </p>
        <p className="mb-10 leading-relaxed text-muted-foreground">
          Based in Loudoun County, Virginia, I make custom sugar cookies from my home kitchen, each one baked and hand-decorated with care. I love the details most — the pretty icing colors, florals, monograms, and little touches that make each set feel personal.
        </p>
        <div className="flex items-center gap-4 border-t border-border pt-8">
          <div className="grid size-12 place-items-center rounded-full bg-accent/10">
            <div className="size-2 rounded-full bg-accent" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest">
            Based in Loudoun County, Virginia
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
  "College / Graduation",
  "Other",
] as const;

function QuoteForm() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
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

    const inspirationFiles = fd.getAll("inspiration") as File[];
    const inspirationNames = inspirationFiles
      .filter((f) => f && typeof f === "object" && f.name)
      .map((f) => f.name)
      .join(", ");

    setSubmitting(true);
    try {
      await submitQuote({
        name,
        email,
        phone: String(fd.get("phone") ?? "").trim(),
        eventType: String(fd.get("eventType") ?? ""),
        eventDate: String(fd.get("eventDate") ?? ""),
        quantity: String(fd.get("quantity") ?? ""),
        fulfillment: String(fd.get("fulfillment") ?? ""),
        details,
        inspiration: inspirationNames,
      });

      toast.success("Got it! We'll be in touch within 2 business days.");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong sending your request. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-stone-700 py-2 text-sm text-white placeholder:text-stone-500 focus:border-white focus:outline-none transition-colors";
  const labelCls = "font-mono text-[10px] uppercase tracking-widest text-stone-400";

  return (
    <section id="quote" className="bg-ink py-24 text-ink-foreground md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center md:mb-20">
          <h2 className="mb-4 font-display text-4xl italic md:text-5xl">Let's get this party started</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
            Most orders need about 2 weeks notice — the sooner, the better!
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
          <Field label="Delivery or pickup? (within 20175)" className={labelCls}>
            <select required name="fulfillment" defaultValue="" className={inputCls + " appearance-none"}>
              <option value="" disabled className="text-stone-900">Choose one…</option>
              <option value="pickup" className="text-stone-900">Pickup (20175)</option>
              <option value="delivery" className="text-stone-900">Delivery — fee based on location</option>
            </select>
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
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-display text-xl italic">Tailored Sweet Treats</span>
          <a
            href="mailto:hello@tailoredsweettreats.com"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent"
          >
            hello@tailoredsweettreats.com
          </a>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Based in Loudoun County, Virginia
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
