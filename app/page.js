import { memoSlots } from "./memos/data";
import EmailCapture from "./EmailCapture";

export default function Home() {
  return (
    <>
      <a
        className="message-link"
        href="https://www.linkedin.com/in/camsadler/"
        rel="noreferrer"
        target="_blank"
      >
        message
      </a>

      <main>
        <h1>Welcome to localhost:40</h1>

        <section className="intro" aria-label="Introduction">
          <p>
            I&apos;m Cameron Sadler, a product engineer and former founder. This
            is where I write memos about products and markets I&apos;ve researched,
            developed, or allocated capital to.
          </p>
        </section>

        <nav aria-label="Memos">
          <ol className="memo-list">
            {memoSlots.map((memo, index) => (
              <li key={index}>
                {memo ? (
                  <a
                    href={`/memos/${memo.slug}`}
                    className={memo.slug === "1088-bologna" ? undefined : "is-dimmed"}
                  >
                    {memo.title}
                  </a>
                ) : (
                  <span>________</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <EmailCapture />
      </main>
    </>
  );
}
