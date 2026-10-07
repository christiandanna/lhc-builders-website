"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, isPlaceholder } from "@/data/company";
import styles from "./MobileActionBar.module.css";

/**
 * A sticky contact bar on phones. It slides in once the visitor is past the
 * hero, so the hero CTAs are never covered, and it stays out of the way on the
 * contact page where the form is already the whole point.
 *
 * The call button only appears when a real phone number exists — a "Call"
 * button that cannot dial would be worse than no button at all.
 */
export default function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  const phoneIsReal = !isPlaceholder(company.phone);

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <Link href="/contact" className="btn btn--primary">
        Start Your Project
      </Link>
      {phoneIsReal && (
        <a href={`tel:${company.phoneHref}`} className="btn btn--outline-light">
          Call
        </a>
      )}
    </div>
  );
}
