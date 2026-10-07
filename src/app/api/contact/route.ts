import { NextResponse } from "next/server";
import { company } from "@/data/company";

/**
 * ---------------------------------------------------------------------------
 * CONTACT FORM ENDPOINT
 * ---------------------------------------------------------------------------
 * This route never pretends. If email delivery is not configured it returns
 * 503 and the form tells the visitor to call or email directly — it does not
 * show a success message for a message that went nowhere.
 *
 * TO TURN IT ON
 *   1. Create an account at resend.com and verify the sending domain.
 *   2. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in the
 *      hosting environment (see .env.example). Never commit them.
 *   3. Redeploy. Nothing in this file needs changing.
 *
 * Resend is called over plain fetch, so there is no SDK dependency to keep
 * updated. Any provider with an HTTPS API can be swapped in at `sendEmail`.
 */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  location?: string;
  timeline?: string;
  budget?: string;
  contactPreference?: string;
  message?: string;
  /** Honeypot: a real person never fills this in. */
  website?: string;
};

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  email: 200,
  phone: 40,
  projectType: 80,
  location: 160,
  timeline: 80,
  budget: 80,
  contactPreference: 40,
  message: 4000,
};

function clean(value: unknown, field: string): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_LENGTHS[field] ?? 200);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(subject: string, html: string, replyTo: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: replyTo,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Email provider responded ${response.status}: ${detail}`);
  }
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { error: "That request could not be read." },
      { status: 400 },
    );
  }

  // Bots fill every field they find. Accept silently so they do not retry.
  if (clean(body.website, "name")) {
    return NextResponse.json({ ok: true });
  }

  const fields = {
    name: clean(body.name, "name"),
    email: clean(body.email, "email"),
    phone: clean(body.phone, "phone"),
    projectType: clean(body.projectType, "projectType"),
    location: clean(body.location, "location"),
    timeline: clean(body.timeline, "timeline"),
    budget: clean(body.budget, "budget"),
    contactPreference: clean(body.contactPreference, "contactPreference"),
    message: clean(body.message, "message"),
  };

  const errors: Record<string, string> = {};
  if (!fields.name) errors.name = "Please add your name.";
  if (!fields.email) {
    errors.email = "Please add an email address.";
  } else if (!isValidEmail(fields.email)) {
    errors.email = "That email address does not look right.";
  }
  if (!fields.message) errors.message = "Please tell us about the project.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const configured =
    Boolean(process.env.RESEND_API_KEY) &&
    Boolean(process.env.CONTACT_TO_EMAIL) &&
    Boolean(process.env.CONTACT_FROM_EMAIL);

  if (!configured) {
    // Deliberately a failure. Telling the visitor the enquiry was sent when no
    // mail service exists would lose real work.
    console.warn(
      "[contact] Email delivery is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json(
      {
        error:
          "The enquiry form is not connected yet, so this message was not sent.",
        code: "not_configured",
      },
      { status: 503 },
    );
  }

  const rows = (
    [
      ["Name", fields.name],
      ["Email", fields.email],
      ["Phone", fields.phone],
      ["Project type", fields.projectType],
      ["Project location", fields.location],
      ["Timeline", fields.timeline],
      ["Budget range", fields.budget],
      ["Preferred contact", fields.contactPreference],
    ] as const
  )
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;">${label}</td><td style="padding:4px 0;"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join("");

  const html = `
    <h2 style="font-family:Helvetica,Arial,sans-serif;">New website enquiry</h2>
    <table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;">${rows}</table>
    <h3 style="font-family:Helvetica,Arial,sans-serif;">Project details</h3>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;white-space:pre-wrap;">${escapeHtml(fields.message)}</p>
    <hr>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#888;">Sent from the ${company.name} website contact form.</p>
  `;

  try {
    await sendEmail(
      `Website enquiry — ${fields.name}${fields.projectType ? ` (${fields.projectType})` : ""}`,
      html,
      fields.email,
    );
  } catch (error) {
    console.error("[contact] Failed to send enquiry:", error);
    return NextResponse.json(
      {
        error:
          "We could not send that message. Please try again, or contact us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
