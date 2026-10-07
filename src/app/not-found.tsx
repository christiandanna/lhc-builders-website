import Link from "next/link";
import { mainNav } from "@/data/navigation";

export default function NotFound() {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "80svh",
        paddingTop: "calc(var(--nav-h) + 4rem)",
        paddingBottom: "5rem",
        background: "var(--ink)",
        color: "var(--bone)",
      }}
    >
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
          Error 404
        </p>
        <h1
          className="display"
          style={{ fontSize: "var(--step-4)", maxWidth: "16ch" }}
        >
          That page is not here
        </h1>
        <p
          className="lede"
          style={{ maxWidth: "48ch", marginTop: "1.25rem" }}
        >
          The link may be out of date, or the page may have moved. Everything on
          the site is one click away below.
        </p>

        <div className="btn-row" style={{ marginTop: "2.5rem" }}>
          <Link href="/" className="btn btn--primary">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn--outline-light">
            Request a Consultation
          </Link>
        </div>

        <nav
          aria-label="All pages"
          className="chip-row"
          style={{ marginTop: "3rem" }}
        >
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="chip"
              style={{ borderColor: "var(--rule-dark)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
