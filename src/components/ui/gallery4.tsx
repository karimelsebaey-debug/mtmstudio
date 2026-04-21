import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  /** CSS object-position value — controls which part of the image is shown.
   *  Default: "center center". Use "center bottom" to hide a white top strip. */
  imagePosition?: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const Gallery4 = ({
  title = "Selected Work",
  description = "A tight edit. Identity, motion, data, presentation.",
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ── Auto-scroll — hover (desktop) + auto-play (touch/mobile) ─────────────
  const autoScrollRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchResumeRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);

  // True on phones/tablets — devices that have no fine hover pointer
  const isTouchDevice = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches,
  );

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) return; // already running — don't stack
    autoScrollRef.current = setInterval(() => {
      if (!carouselApi) return;
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0); // wrap back to first card
      }
    }, 1800);
  }, [carouselApi]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    // Cancel any pending touch-resume timer
    if (touchResumeRef.current) {
      clearTimeout(touchResumeRef.current);
      touchResumeRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => () => stopAutoScroll(), [stopAutoScroll]);

  // Touch devices: auto-play 2 s after the carousel is ready (no hover needed)
  useEffect(() => {
    if (!carouselApi || !isTouchDevice.current) return;
    const init = setTimeout(() => startAutoScroll(), 2000);
    return () => clearTimeout(init);
  }, [carouselApi, startAutoScroll]);

  // Touch: pause while finger is on screen, resume after momentum settles
  const handleTouchStart = useCallback(() => {
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handleTouchEnd = useCallback(() => {
    if (!isTouchDevice.current) return;
    // 1.2 s delay lets Embla's drag-free momentum finish before we resume
    touchResumeRef.current = setTimeout(() => startAutoScroll(), 1200);
  }, [startAutoScroll]);

  // Mouse position → right 20% of the carousel wrapper triggers auto-scroll
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!carouselWrapRef.current) return;
      const rect = carouselWrapRef.current.getBoundingClientRect();
      if (e.clientX >= rect.right - rect.width * 0.20) {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
    },
    [startAutoScroll, stopAutoScroll],
  );
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => { carouselApi.off("select", updateSelection); };
  }, [carouselApi]);

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between md:mb-14">
          <div className="flex flex-col gap-3">
            <span className="mono text-xs uppercase tracking-widest text-[rgba(245,245,240,0.4)]">
              Selected Work
            </span>
            <h2
              className="tracking-tight text-[#f5f5f0]"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              {title}
            </h2>
            <p className="max-w-lg text-[rgba(245,245,240,0.5)] text-lg">
              {description}
            </p>
          </div>

          {/* Desktop prev/next */}
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto text-[rgba(245,245,240,0.6)] hover:text-[#f5f5f0] hover:bg-[rgba(245,245,240,0.06)]"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto text-[rgba(245,245,240,0.6)] hover:text-[#f5f5f0] hover:bg-[rgba(245,245,240,0.06)]"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel — bleeds past the container for the cinematic scroll feel.
          Desktop: right-edge hover (rightmost 20%) triggers auto-scroll.
          Mobile:  auto-plays after 2 s; pauses on touch, resumes after lift. */}
      <div
        ref={carouselWrapRef}
        className="w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={stopAutoScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": { dragFree: true },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[400px]"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl"
                >
                  <div className="relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute h-full w-full object-cover"
                      style={{ objectPosition: item.imagePosition ?? "center center" }}
                    />

                    {/* Dark gradient overlay — uses the site's dark colour directly */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />

                    {/* Card text */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                      <div className="mb-2 text-xl font-semibold text-[#f5f5f0] md:mb-3">
                        {item.title}
                      </div>
                      <div className="mb-6 line-clamp-2 text-sm text-[rgba(245,245,240,0.6)] md:mb-8">
                        {item.description}
                      </div>
                      <div className="mono flex items-center text-xs uppercase tracking-wider text-[rgba(245,245,240,0.5)] group-hover:text-[#f5f5f0] transition-colors">
                        View project{" "}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-6 bg-[#f5f5f0]"
                  : "w-1.5 bg-[rgba(245,245,240,0.2)]"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
