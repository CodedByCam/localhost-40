"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("done");
        setMessage("Thanks — I'll be in touch shortly.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="email-capture" aria-label="Get in touch">
      <p className="email-capture-label">Leave your email to start a conversation.</p>
      <form className="email-capture-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={status === "sending" || status === "done"}
          aria-label="Email address"
        />
        <button type="submit" disabled={status === "sending" || status === "done"}>
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </form>
      {message ? (
        <p
          className="email-capture-message"
          data-state={status}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
