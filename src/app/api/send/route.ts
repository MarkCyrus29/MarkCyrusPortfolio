import { NextResponse } from "next/server";
import { emailTemplateHTML } from "../../../components/EmailTemplate";
import type { EmailTemplateProps } from "../../../components/EmailTemplate";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_SENDER = process.env.RESEND_SENDER ?? "onboarding@resend.dev";

// --------------------
// ENV VALIDATION
// --------------------
if (!RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(RESEND_API_KEY);

// --------------------
// SIMPLE IN-MEMORY RATE LIMIT
// Works for single instance only
// --------------------
const rateLimitMap = new Map<string, { count: number; time: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.time > windowMs) {
    rateLimitMap.set(ip, { count: 1, time: now });
    return false;
  }

  if (entry.count >= maxRequests) return true;

  entry.count++;
  return false;
}

// --------------------
// HELPERS
// --------------------
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getIP(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getIP(request);
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as EmailTemplateProps;

    const { firstName, email, message } = body;

    if (!firstName || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (message.length > 2000) {
      return Response.json({ error: "Message is too long" }, { status: 400 });
    }

    const { captchaToken } = body;

    const verifyUrl =
      "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const verification = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: captchaToken,
      }),
    });

    const verifyJson = await verification.json();

    if (!verifyJson.success) {
      return NextResponse.json({ error: "Invalid Captcha" }, { status: 403 });
    }

    const adminEmail = await resend.emails.send({
      from: RESEND_SENDER,
      to: ["markcyrus.serrano@gmail.com"],
      subject: "📬 New Portfolio Message",
      html: emailTemplateHTML({ firstName, email, message, captchaToken }),
    });

    if (adminEmail.error) {
      console.error("Admin email failed:", adminEmail.error);
      return Response.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }

    // --------------------
    // AUTO-REPLY CONFIRMATION
    // --------------------
    await resend.emails.send({
      from: RESEND_SENDER,
      to: [email],
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hi ${firstName},</h2>
          <p>Thanks for reaching out through my portfolio!</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <br />
          <p>Best regards,<br/>Mark</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
