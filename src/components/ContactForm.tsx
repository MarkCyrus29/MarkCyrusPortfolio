"use client";

import { useState } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import React from "react";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [token, setToken] = useState<string>("");
  const turnstileRef = React.useRef<TurnstileInstance>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          message,
          captchaToken: token,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setToken("");
      turnstileRef.current?.reset();
      setFirstName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-dark/20 border border-dark/40 focus:border-primary outline-none transition-all"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-dark/20 border border-dark/40 focus:border-primary outline-none transition-all"
        />
      </div>

      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full px-4 py-2 rounded-md bg-dark/20 border border-dark/40 focus:border-primary outline-none transition-all resize-y min-h-25 max-h-40"
      />
      <div className="flex justify-center my-2">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => setToken(token)}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !token}
        className="bg-primary/80 hover:bg-primary/90 disabled:opacity-50 text-white rounded-md px-4 py-2 transition-all"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {/* Status Messages */}
      {status === "success" && (
        <p className="text-green-400 text-sm">✅ Message sent successfully!</p>
      )}

      {status === "error" && (
        <p className="text-red-400 text-sm">
          ❌ Failed to send message. Please try again.
        </p>
      )}
    </form>
  );
}
