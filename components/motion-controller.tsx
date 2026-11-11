"use client";
import { useEffect, useState } from "react";
import { animate, createScope, createTimeline, stagger } from "animejs";

export function MotionController() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const body = document.body;
    const scope = createScope({ root: body });
    body.classList.add("motion-enabled");
    const run = (
      targets: Parameters<typeof animate>[0],
      params: Parameters<typeof animate>[1],
    ) => scope.execute(() => animate(targets, params));
    const entrance = scope.execute(() =>
      createTimeline({ defaults: { ease: "out(4)" } }),
    );
    entrance
      .add(
        ".site-header .brand-logo",
        { opacity: [0, 1], x: [-30, 0], duration: 850 },
        0,
      )
      .add(
        ".hero-topline > *, .primary-nav a",
        { opacity: [0, 1], y: [-12, 0], delay: stagger(65), duration: 650 },
        100,
      )
      .add(
        ".hero-greeting",
        { opacity: [0, 1], y: [20, 0], duration: 650 },
        220,
      )
      .add(
        ".portfolio-hero h1 > .heading-art",
        {
          opacity: [0, 1],
          y: [65, 0],
          rotate: [3, 0],
          delay: stagger(160),
          duration: 1050,
        },
        300,
      )
      .add(
        ".hero-description, .hero-actions > *, .hero-footnote",
        { opacity: [0, 1], y: [24, 0], delay: stagger(90), duration: 850 },
        700,
      )
      .add(
        ".personal-brand",
        { opacity: [0, 1], scale: [0.86, 1], duration: 1300 },
        200,
      );

    const loops = [
      run(".emblem-orbit-outer", {
        rotate: [0, 360],
        duration: 28000,
        ease: "linear",
        loop: true,
      }),
      run(".emblem-orbit-inner", {
        rotate: [0, -360],
        duration: 19000,
        ease: "linear",
        loop: true,
      }),
      run(".emblem-logo", {
        y: [-8, 8],
        rotate: [-2, 2],
        duration: 2900,
        alternate: true,
        loop: true,
        ease: "inOutSine",
      }),
      run(".marquee-track", {
        x: ["0%", "-50%"],
        duration: 27000,
        ease: "linear",
        loop: true,
      }),
      run(".workflow-visual li", {
        borderColor: ["#30332d", "#c6a660", "#30332d"],
        delay: stagger(450),
        duration: 2400,
        loopDelay: 1000,
        loop: true,
        ease: "inOutSine",
      }),
    ];
    const visibleLoops = new Set<number>();
    let marqueeHeld = false;
    const visibility = () => {
      loops.forEach((animation, index) =>
        document.hidden ||
        !visibleLoops.has(index) ||
        (index === 3 && marqueeHeld)
          ? animation.pause()
          : animation.resume(),
      );
    };
    const loopGroups = new Map<Element, number[]>();
    for (const [selector, indexes] of [
      [".kinetic-emblem", [0, 1, 2]],
      [".motion-marquee", [3]],
      [".workflow-visual", [4]],
    ] as const) {
      const target = body.querySelector(selector);
      if (target) loopGroups.set(target, [...indexes]);
    }
    const loopObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        for (const index of loopGroups.get(entry.target) ?? []) {
          if (entry.isIntersecting) visibleLoops.add(index);
          else visibleLoops.delete(index);
        }
      }
      visibility();
    });
    loopGroups.forEach((_, target) => loopObserver.observe(target));
    document.addEventListener("visibilitychange", visibility);
    const marquee = body.querySelector(".motion-marquee");
    const holdMarquee = () => {
      marqueeHeld = true;
      visibility();
    };
    const releaseMarquee = (event: Event) => {
      if (
        event instanceof FocusEvent &&
        marquee?.contains(event.relatedTarget as Node | null)
      )
        return;
      marqueeHeld = false;
      visibility();
    };
    marquee?.addEventListener("pointerenter", holdMarquee);
    marquee?.addEventListener("pointerleave", releaseMarquee);
    marquee?.addEventListener("focusin", holdMarquee);
    marquee?.addEventListener("focusout", releaseMarquee);

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          observer.unobserve(entry.target);
          const target = entry.target as HTMLElement;
          run(target, {
            opacity: [0, 1],
            y: [32, 0],
            duration: 850,
            ease: "out(4)",
          });
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    const revealSelector =
      ".portfolio-section-heading, .featured-copy, .workflow-visual, .secondary-feature, .project-row, .repository-archive, .about-grid h2, .about-body > p, .about-notes > div, .contact-section h2, .contact-bottom, .footer-main";
    const observe = () =>
      body.querySelectorAll(revealSelector).forEach((el) => {
        if (!seen.has(el)) observer.observe(el);
      });
    observe();
    const mutation = new MutationObserver(() => observe());
    const list = body.querySelector(".project-list");
    if (list) mutation.observe(list, { childList: true });

    const selector =
      ".button, .text-link, .repo-link, .filters button, .quiet-link";
    const interaction = (event: PointerEvent, entering: boolean) => {
      if (event.pointerType !== "mouse") return;
      const target = (event.target as Element).closest<HTMLElement>(selector);
      if (!target || target.contains(event.relatedTarget as Node | null))
        return;
      run(target, {
        y: entering ? -3 : 0,
        x: entering ? 3 : 0,
        duration: entering ? 250 : 500,
        ease: "out(3)",
      });
    };
    const over = (event: PointerEvent) => interaction(event, true);
    const out = (event: PointerEvent) => interaction(event, false);
    body.addEventListener("pointerover", over);
    body.addEventListener("pointerout", out);

    let frame = 0;
    const progress = body.querySelector<HTMLElement>(".reading-progress-fill");
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      if (progress)
        progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, scrollY / distance) : 0})`;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => {
      observer.disconnect();
      loopObserver.disconnect();
      mutation.disconnect();
      body.removeEventListener("pointerover", over);
      body.removeEventListener("pointerout", out);
      document.removeEventListener("visibilitychange", visibility);
      marquee?.removeEventListener("pointerenter", holdMarquee);
      marquee?.removeEventListener("pointerleave", releaseMarquee);
      marquee?.removeEventListener("focusin", holdMarquee);
      marquee?.removeEventListener("focusout", releaseMarquee);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
      scope.revert();
      progress?.style.removeProperty("transform");
      body.classList.remove("motion-enabled");
    };
  }, [enabled]);

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-fill" />
      </div>
      <button
        type="button"
        className="motion-toggle"
        aria-label={enabled ? "Pause animations" : "Play animations"}
        aria-pressed={enabled === true}
        onClick={() => setEnabled(!enabled)}
      >
        <span className="motion-toggle-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {enabled ? "Pause motion" : "Motion off"}
      </button>
    </>
  );
}
