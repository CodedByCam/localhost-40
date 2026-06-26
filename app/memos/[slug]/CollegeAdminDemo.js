"use client";

import { useState } from "react";

const demoCards = {
  Admissions: {
    label: "admissions",
    value: "Submit enrollment file",
    doneValue: "File submitted",
    statuses: [
      "Transcript ready to send",
      "Placement step chosen",
      "Orientation comes next",
    ],
    doneStatuses: [
      "File sent to the school",
      "Transcript watch is on",
      "Next step will appear here",
    ],
    cta: "Submit enrollment file",
    doneCta: "Enrollment file sent",
    note: "Send one complete packet instead of chasing a long checklist.",
    doneNote: "We will watch for confirmations, exceptions, and the next school response.",
  },
  Courses: {
    label: "courses",
    value: "Pick my courses",
    doneValue: "Courses picked",
    statuses: [
      "Enough credits for aid",
      "Courses match your goal",
      "Support added for hard course",
    ],
    doneStatuses: [
      "Course seats saved",
      "Aid still looks good",
      "Schedule watch is on",
    ],
    cta: "Pick these courses",
    doneCta: "Courses picked",
    note: "Choose courses that fit your life and keep your funding on track.",
    doneNote: "We will watch seats, aid, degree progress, and workload changes.",
  },
};

const campusActions = [
  {
    name: "Get enrolled",
    detail: "Know what to send, where it goes, and what happens next.",
    signal: "start",
    keywords: "admissions enroll start transcript orientation placement",
  },
  {
    name: "Find your refund",
    detail: "See money left after tuition and move it to your bank.",
    signal: "$",
    keywords: "aid refund payment money pell grant bank",
  },
  {
    name: "Pick courses",
    detail: "Choose courses that fit your life and keep aid on track.",
    signal: "course",
    keywords: "courses schedule credits registration aid",
  },
  {
    name: "Fix a hold",
    detail: "Understand the blocker and send the right proof.",
    signal: "now",
    keywords: "hold blocker records proof registration",
  },
];

const courseReviews = [
  {
    title: "Great experience!",
    date: "Aug 27",
    author: "KitaOchoa",
    body: "I was so blessed to find Nox. In a time of need for college they helped and provided me with a laptop for school. As soon as I entered their building with my family we were greeted with a warm smile. They welcomed us with open arms and answered every question I had with ease. It was a wonderful experience and they are wonderful people.",
  },
  {
    title: "Amazing Experience",
    date: "Aug 26",
    author: "Ricardo77022",
    body: "The team at NOX are great people with a goal to help us students succeed. They have provided and are continuing to provide us with not only their services but also their time.",
  },
  {
    title: "Amazing app",
    date: "Mon",
    author: "yueerrrr",
    body: "Nox is not only an app it's a family. The people are amazing and are with you every step of the way to support you on your journey",
  },
  {
    title: "Helping a first generation student",
    date: "Aug 26",
    author: "kayllanicolle",
    body: "i'm a first generation student so everything about college was so scary for me and i had to do everything on my own until i joined nox. Nox has helped me so much with learning to get out of my comfort zone and has introduced me to so many opportunities and provided me with so much to help me with school. This community is amazing!",
  },
  {
    title: "Excited to be in the Nox fam",
    date: "Sun",
    author: "efeny1234567",
    body: "Love this app - super easy signup and the benefits are A1",
  },
  {
    title: "Nox Rocks",
    date: "Aug 26",
    author: "Messyjones",
    body: "This app rocks. Very excited for it.",
  },
];

const courseImages = [
  {
    alt: "Nox campus activation table with students",
    src: "/course-table.jpg",
  },
  {
    alt: "Nox team working through a product demo",
    src: "/course-group.jpg",
  },
  {
    alt: "Nox team standing together",
    src: "/course-team.jpg",
  },
];

export default function CollegeAdminDemo({ label }) {
  if (label === "Automated college administration") {
    return <CommandCenterDemo />;
  }

  if (label === "Financial aid payments") {
    return <PaymentsDemo />;
  }

  if (demoCards[label]) {
    return <StudentCardDemo card={demoCards[label]} label={label} />;
  }

  return null;
}

function CommandCenterDemo() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const normalizedQuery = query.toLowerCase().trim();
  const results =
    normalizedQuery.length === 0
      ? campusActions
      : campusActions.filter((action) =>
          `${action.name} ${action.detail} ${action.keywords}`
            .toLowerCase()
            .includes(normalizedQuery),
        );
  const visibleActions = results.length > 0 ? results : campusActions;
  const activeAction = visibleActions[Math.min(activeIndex, visibleActions.length - 1)];

  return (
    <section className="embedded-demo command-center-demo" aria-label="Campus automation search demo">
      <header>
        <h3>The fastest student experience</h3>
      </header>

      <label className="automation-search">
        <span>prompt</span>
        <input
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          placeholder="find my refund"
          value={query}
        />
      </label>

      <div className="command-action-list">
        {visibleActions.map((action, index) => (
          <button
            aria-pressed={activeAction.name === action.name}
            key={action.name}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h4>{action.name}</h4>
              <p>{action.detail}</p>
            </div>
            <strong>{action.signal}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function StudentCardDemo({ card, label }) {
  const [activated, setActivated] = useState(false);

  return (
    <section className="embedded-demo student-card-demo" aria-label={`${label} demo`}>
      <header>
        <p>{card.label}</p>
        <h3>{activated ? card.doneValue : card.value}</h3>
      </header>

      <StatusTerminal active={activated} lines={activated ? card.doneStatuses : card.statuses} />

      <button onClick={() => setActivated(true)} type="button">
        {activated ? card.doneCta : card.cta}
      </button>

      <p>{activated ? card.doneNote : card.note}</p>
    </section>
  );
}

function PaymentsDemo() {
  const [connected, setConnected] = useState(false);

  return (
    <section className="embedded-demo payments-demo" aria-label="Payments demo">
      <header>
        <p>available financial aid</p>
        <h3>$1,842.00</h3>
      </header>

      <StatusTerminal
        active={connected}
        lines={
          connected
            ? ["Bank connected", "Withdrawal queued", "Text update ready"]
            : ["Aid confirmed", "Tuition covered", "Refund ready"]
        }
      />

      <button onClick={() => setConnected(true)} type="button">
        {connected ? "Bank connected" : "Connect bank to withdraw"}
      </button>

      <p>{connected ? "Withdrawal queued for review." : "Secure transfer via connected bank account."}</p>
    </section>
  );
}

function StatusTerminal({ active, lines }) {
  return (
    <div className="status-terminal" aria-label="Progress">
      {lines.map((line, index) => (
        <span
          className="status-line"
          data-cursor={index === lines.length - 1}
          key={`${active}-${line}`}
          style={{ "--line-index": `${index}` }}
        >
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span>{line}</span>
        </span>
      ))}
    </div>
  );
}

export function CourseEvidence() {
  return (
    <div className="course-evidence">
      <div className="course-image-stack" aria-label="Course demo images">
        {courseImages.map((image) => (
          <figure className="course-image" key={image.src}>
            <img alt={image.alt} src={image.src} />
          </figure>
        ))}
      </div>

      <div className="review-showcase">
        <figure className="review-showcase-image">
          <img
            alt="Nox App Store screenshots: MacBook, meal plan and more for $0, book benefits in one click, use financial aid instantly, and get inspired by your community"
            src="/nox-app-store.webp"
          />
        </figure>

        <figure className="review-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Nox app product demo"
          >
            <source src="/nox.mp4" type="video/mp4" />
          </video>
        </figure>
      </div>

      <div className="review-grid" aria-label="Course demo review images">
        {courseReviews.map((review) => (
          <article className="review-card" key={`${review.title}-${review.author}`}>
            <header>
              <div>
                <h3>{review.title}</h3>
                <p aria-label="Five star rating">*****</p>
              </div>
              <p>
                <span>{review.date}</span>
                <span>{review.author}</span>
              </p>
            </header>
            <p>{review.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
