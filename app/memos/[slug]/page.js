import { notFound } from "next/navigation";
import Script from "next/script";
import { Fragment } from "react";
import CollegeAdminDemo, { CourseEvidence } from "./CollegeAdminDemo";
import { getMemoBySlug, memos } from "../data";

export function generateStaticParams() {
  return memos.map((memo) => ({
    slug: memo.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const memo = getMemoBySlug(slug);

  if (!memo) {
    return {
      title: "Memo not found",
    };
  }

  return {
    title: `${memo.title} | localhost:40`,
    description: memo.dek,
  };
}

export default async function MemoPage({ params }) {
  const { slug } = await params;
  const memo = getMemoBySlug(slug);

  if (!memo) {
    notFound();
  }

  const isBologna = memo.slug === "1088-bologna";

  return (
    <>
      <a className="site-link" href="/">
        localhost:40
      </a>

      <a
        className="message-link"
        href="https://www.linkedin.com/in/camsadler/"
        rel="noreferrer"
        target="_blank"
      >
        message
      </a>

      {isBologna ? <BolognaMemo memo={memo} /> : <ComingSoonMemo memo={memo} />}
    </>
  );
}

function ComingSoonMemo({ memo }) {
  return (
    <main className="coming-soon-main">
      <article className="coming-soon">
        <p className="memo-kicker">{String(memo.order).padStart(2, "0")} / 40</p>
        <h1 className="coming-soon-title">{memo.title}</h1>
        <p className="coming-soon-message">
          This memo will be published before winter.
        </p>
      </article>
    </main>
  );
}

function BolognaMemo({ memo }) {
  return (
    <main className="article-main">
      <article className="memo-article">
        <header className="article-header">
          <h1 className="article-title">{memo.title}</h1>
          <p className="article-dek">{memo.dek}</p>
        </header>

        <figure className="memo-main-image">
          <img
            alt="Bologna piazza at dusk"
            src="/bologna.jpg"
          />
        </figure>

        <div className="article-body">
          {memo.sections.map((section) => (
            <section className="article-section" id={section.id} key={section.id}>
              <h2>{section.title}</h2>

              {section.embeds?.map((embed) =>
                embed.type === "tweet" ? (
                  <TweetEmbed key={embed.url} url={embed.url} />
                ) : null,
              )}

              {section.paragraphs.map((paragraph) => (
                <p key={getParagraphKey(paragraph)}>
                  <InlineParagraph paragraph={paragraph} />
                </p>
              ))}

              {section.chart ? <ResearchChart chart={section.chart} /> : null}
              {section.demo ? <CollegeAdminDemo label={section.demo} /> : null}
              {section.id === "courses" ? <CourseEvidence /> : null}
              {section.image ? (
                <SectionImage image={section.image} />
              ) : section.media ? (
                <SectionMedia type={section.media} />
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

function getParagraphKey(paragraph) {
  if (typeof paragraph === "string") {
    return paragraph;
  }

  return paragraph
    .map((part) => (typeof part === "string" ? part : part.text))
    .join("");
}

function InlineParagraph({ paragraph }) {
  if (typeof paragraph === "string") {
    return paragraph;
  }

  return paragraph.map((part, index) => {
    if (typeof part === "string") {
      return <Fragment key={`text-${index}`}>{part}</Fragment>;
    }

    return (
      <a href={part.href} key={`${part.href}-${part.text}`}>
        {part.text}
      </a>
    );
  });
}

function TweetEmbed({ url }) {
  return (
    <figure className="tweet-embed">
      <blockquote className="twitter-tweet" data-dnt="true">
        <a href={url}>Sam Altman on X</a>
      </blockquote>
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </figure>
  );
}

function ResearchChart({ chart }) {
  return (
    <figure className="research-chart">
      <iframe
        loading="lazy"
        src={chart.src}
        title={chart.title}
      />
      <figcaption>
        Source:{" "}
        <a href={chart.sourceUrl} rel="noreferrer" target="_blank">
          {chart.source}
        </a>
      </figcaption>
    </figure>
  );
}

function SectionMedia({ type }) {
  if (type === "image-grid") {
    return (
      <div className="placeholder-grid" aria-label="Image placeholders">
        <MediaPlaceholder type="image" label="Image placeholder" small />
        <MediaPlaceholder type="image" label="Image placeholder" small />
      </div>
    );
  }

  return <MediaPlaceholder type={type} label={`${type} placeholder`} inline />;
}

function SectionImage({ image }) {
  return (
    <figure className="section-image">
      <img alt={image.alt} src={image.src} />
    </figure>
  );
}

function MediaPlaceholder({ type, label, inline = false, small = false }) {
  const className = [
    "media-placeholder",
    `${type}-placeholder`,
    inline ? "inline-placeholder" : "",
    small ? "small-placeholder" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={className} aria-label={label}>
      <span>{label}</span>
    </figure>
  );
}
