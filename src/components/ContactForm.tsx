"use client";

import { useId, useRef, useState } from "react";
import { company, isPlaceholder } from "@/data/company";
import { services } from "@/data/services";
import styles from "./ContactForm.module.css";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; showFallback: boolean };

const TIMELINES = [
  "As soon as possible",
  "Within 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "Still planning",
];

const BUDGETS = [
  "Under $25,000",
  "$25,000 – $75,000",
  "$75,000 – $150,000",
  "$150,000 – $500,000",
  "Over $500,000",
  "Not sure yet",
];

const CONTACT_PREFERENCES = ["Email", "Phone call", "Text message"];

/**
 * The enquiry form.
 *
 * Only name, email and a project description are required — a long mandatory
 * form loses more leads than it qualifies. Everything else helps LHC Builders
 * prepare for the first call, and is clearly marked optional.
 *
 * The form posts to /api/contact. If email delivery is not configured there,
 * the request fails and this component says so plainly and offers a direct
 * route instead. It never shows a success message for a message that was not
 * actually sent.
 */
export default function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const statusRef = useRef<HTMLDivElement>(null);

  const emailIsReal = !isPlaceholder(company.email);
  const phoneIsReal = !isPlaceholder(company.phone);

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus({ kind: "sending" });
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({ kind: "sent" });
        form.reset();
      } else if (response.status === 422 && payload.errors) {
        setErrors(payload.errors as Record<string, string>);
        setStatus({
          kind: "error",
          message: "Please check the highlighted fields and try again.",
          showFallback: false,
        });
      } else {
        setStatus({
          kind: "error",
          message:
            payload.error ??
            "Something went wrong sending that message.",
          showFallback: true,
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message:
          "We could not reach the server. Please check your connection and try again.",
        showFallback: true,
      });
    }

    // Move focus to the result so screen-reader users hear it immediately.
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={`${styles.row} ${styles.row2}`}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("name")}>
            Name
          </label>
          <input
            className={styles.input}
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
          />
          {errors.name && (
            <p className={styles.error} id={errorId("name")}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("email")}>
            Email
          </label>
          <input
            className={styles.input}
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
          />
          {errors.email && (
            <p className={styles.error} id={errorId("email")}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={`${styles.row} ${styles.row2}`}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("phone")}>
            Phone <span className={styles.optional}>(optional)</span>
          </label>
          <input
            className={styles.input}
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("projectType")}>
            Project type <span className={styles.optional}>(optional)</span>
          </label>
          <select
            className={styles.select}
            id={fieldId("projectType")}
            name="projectType"
            defaultValue=""
          >
            <option value="">Select one</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div className={`${styles.row} ${styles.row3}`}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("location")}>
            Project location <span className={styles.optional}>(optional)</span>
          </label>
          <input
            className={styles.input}
            id={fieldId("location")}
            name="location"
            type="text"
            placeholder="Neighbourhood or address"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("timeline")}>
            Timeline <span className={styles.optional}>(optional)</span>
          </label>
          <select
            className={styles.select}
            id={fieldId("timeline")}
            name="timeline"
            defaultValue=""
          >
            <option value="">Select one</option>
            {TIMELINES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("budget")}>
            Budget range <span className={styles.optional}>(optional)</span>
          </label>
          <select
            className={styles.select}
            id={fieldId("budget")}
            name="budget"
            defaultValue=""
          >
            <option value="">Select one</option>
            {BUDGETS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={fieldId("message")}>
          Project details
        </label>
        <textarea
          className={styles.textarea}
          id={fieldId("message")}
          name="message"
          required
          placeholder="What are you looking to build, renovate or repair? Anything you already know about scope, drawings or timing is useful."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
        />
        {errors.message && (
          <p className={styles.error} id={errorId("message")}>
            {errors.message}
          </p>
        )}
      </div>

      <fieldset className={styles.field} style={{ border: 0, padding: 0 }}>
        <legend className={styles.label} style={{ marginBottom: "0.45rem" }}>
          Preferred way to reply{" "}
          <span className={styles.optional}>(optional)</span>
        </legend>
        <div className="chip-row">
          {CONTACT_PREFERENCES.map((option) => (
            <label key={option} className="chip" style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="contactPreference"
                value={option}
                style={{ marginRight: "0.5rem" }}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot. Hidden from people; bots fill it and get silently dropped. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status.kind === "sending"}
        >
          {status.kind === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className={styles.consent}>
          Your details are used to reply to this enquiry and nothing else.
        </p>
      </div>

      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        style={{ outline: "none" }}
      >
        {status.kind === "sent" && (
          <div className={`${styles.status} ${styles.statusOk}`}>
            <p className={styles.statusTitle}>Enquiry sent.</p>
            <p>
              Thanks — your message is with {company.name}. You will get a reply
              as soon as someone has read it properly.
            </p>
          </div>
        )}

        {status.kind === "error" && (
          <div className={`${styles.status} ${styles.statusError}`}>
            <p className={styles.statusTitle}>Not sent.</p>
            <p>{status.message}</p>
            {status.showFallback && (emailIsReal || phoneIsReal) && (
              <p style={{ marginTop: "0.5rem" }}>
                You can reach us directly
                {emailIsReal && (
                  <>
                    {" "}
                    at <a href={`mailto:${company.email}`}>{company.email}</a>
                  </>
                )}
                {emailIsReal && phoneIsReal && " or"}
                {phoneIsReal && (
                  <>
                    {" "}
                    on <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
                  </>
                )}
                .
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
