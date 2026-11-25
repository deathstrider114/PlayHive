"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTORS = [
  ".section",
  ".quick",
  ".join",
  ".play-heading",
  ".game-credit",
  ".profile-hero",
  ".profile-editor",
  ".profile-stats",
  ".level-progress-wrap",
  ".profile-section",
  ".auth-card",
  ".page-title",
  ".page-lead",
  ".page-toolbar",
  ".page-panel",
  ".page-empty",
  ".library-stats",
  ".category-tile",
  ".game-card",
  ".achievement-card",
  ".page-tile",
];

export default function PageMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const routeTargets = document.querySelectorAll<HTMLElement>(
      "main.shell, main > .auth-card, main > .policy-copy"
    );

    routeTargets.forEach((element) => {
      element.animate(
        [
          { opacity: 0, transform: "translate3d(0, 12px, 0)", filter: "blur(3px)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0)" },
        ],
        { duration: 430, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both" }
      );
    });

    const revealTargets = document.querySelectorAll<HTMLElement>(
      REVEAL_SELECTORS.join(",")
    );

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => {
        element.animate(
          [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 420, easing: "cubic-bezier(.22, 1, .36, 1)" }
        );
      });
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const siblings = element.parentElement
          ? Array.from(element.parentElement.children).filter((child) =>
              child.matches(REVEAL_SELECTORS.join(","))
            )
          : [];
        const index = Math.max(0, siblings.indexOf(element));
        element.animate(
          [
            { opacity: 0, transform: "translate3d(0, 17px, 0)", filter: "blur(2px)" },
            { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0)" },
          ],
          {
            duration: 480,
            delay: Math.min(index * 55, 220),
            easing: "cubic-bezier(.22, 1, .36, 1)",
            fill: "both",
          }
        );
        currentObserver.unobserve(element);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });

    revealTargets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
