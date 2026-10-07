"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { mainNav } from "@/data/navigation";
import { company, isPlaceholder } from "@/data/company";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Swap to the solid bar once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While the panel is open: lock the page behind it, close on Escape, and
  // keep Tab inside the panel.
  useEffect(() => {
    if (!menuOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [menuOpen, closeMenu]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const phoneIsReal = !isPlaceholder(company.phone);

  return (
    <header className={styles.header} data-solid={solid} data-menu={menuOpen}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label={`${company.name} — home`}>
          {/* Both marks are rendered and cross-faded, so switching between the
              transparent and solid bar costs no layout shift and no flash. */}
          <span className={styles.logoStack}>
            <Logo variant="compact" height={50} light priority />
            <Logo variant="compact" height={50} className={styles.logoDark} />
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/contact" className={`btn btn--primary ${styles.cta}`}>
            Start Your Project
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        data-open={menuOpen}
        // Keeps the closed panel out of the tab order and the accessibility
        // tree, so a keyboard user never lands on an invisible link.
        inert={!menuOpen}
      >
        <nav className={styles.panelNav} aria-label="Mobile">
          {mainNav.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.panelLink}
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.panelFoot}>
          <Link href="/contact" className="btn btn--primary btn--block">
            Start Your Project
          </Link>
          {phoneIsReal ? (
            <a href={`tel:${company.phoneHref}`} className="btn btn--outline-light btn--block">
              Call {company.phone}
            </a>
          ) : null}
          <p className={styles.panelMeta}>
            <strong>{company.region}</strong>
            Custom homes &middot; {company.descriptor}
          </p>
        </div>
      </div>
    </header>
  );
}
