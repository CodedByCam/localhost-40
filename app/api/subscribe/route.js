import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Basic, pragmatic email validation. Not RFC-perfect, but rejects the
// obvious garbage before we hand anything to Resend.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Where signups land. Defaults to the site owner.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "cameron@sadlerrobotics.com";

// The "from" address Resend sends as. `onboarding@resend.dev` works with zero
// setup but can ONLY deliver to the Resend account owner's address — perfect
// for the owner notification. Once a domain is verified in Resend, set
// CONTACT_FROM_EMAIL to something like "hello@yourdomain.com" and the signer
// will automatically be CC'd so the intro copies you both.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

const usingVerifiedDomain = !FROM_EMAIL.endsWith("@resend.dev");

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Email is not configured yet. Please reach out directly." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 200) : "";

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const who = name ? `${name} (${email})` : email;

  // When sending from a verified domain we can copy the signer so the message
  // doubles as a warm introduction. On the default resend.dev sender we only
  // notify the owner, since external CCs won't deliver.
  const cc = usingVerifiedDomain ? [email] : undefined;

  const subject = usingVerifiedDomain
    ? `Intro: ${who}`
    : `New signup: ${who}`;

  const intro = usingVerifiedDomain
    ? `Hi${name ? ` ${name}` : ""},\n\nThanks for reaching out through localhost:40 — I've copied us both here so we can pick up the conversation directly. Looking forward to it.\n\n— Cameron`
    : `New signup from localhost:40\n\nEmail: ${email}${name ? `\nName: ${name}` : ""}\n\nReply directly to start the introduction.`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `localhost:40 <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        ...(cc ? { cc } : {}),
        reply_to: email,
        subject,
        text: intro,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", res.status, detail);
      return NextResponse.json(
        { error: "Something went wrong sending your details. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to reach Resend:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }
}
