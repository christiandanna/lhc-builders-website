"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

type RevealProps = ComponentPropsWithoutRef<"div"> & {
  /** Delay the animation, in milliseconds. Useful for sequencing two blocks. */
  delay?: number;
  /**
   * Animate direct children one after another instead of the wrapper itself.
   * Use on grids and lists.
   */
  stagger?: boolean;
};

/**
 * Fades content up as it scrolls into view.
 *
 * The content is always present in the HTML and always readable — this only
 * animates its arrival, so the page still works with JavaScript disabled and
 * search engines see everything. `prefers-reduced-motion` disables the
 * movement in globals.css.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;

    // Older browsers, or anything without the API: show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  const base = stagger ? "reveal-stagger" : "reveal";

  return (
    <div
      ref={ref}
      {...rest}
      className={`${base} ${className}`.trim()}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms`, ...rest.style } : rest.style}
    >
      {children}
    </div>
  );
}
