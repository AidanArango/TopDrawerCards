import Image from "next/image";
import Link from "next/link";
import { CollectionCard } from "@/components/collection-card";
import { sampleCards } from "@/lib/sample-cards";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">
            A collector&apos;s archive <span aria-hidden="true">/</span> Phase one
            demo
          </p>
          <h1>
            The joy is
            <br />
            <em>in the details.</em>
          </h1>
          <p className="hero-motto">Affordable Cards. Premium Appreciation.</p>
          <p className="hero-description">
            A personal archive of soccer cards worth looking at twice — for the
            art, the story, and what they mean to the people who collect them.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/collection">
              Explore the collection <span aria-hidden="true">↗</span>
            </Link>
            <a className="text-link" href="#about">
              Discover our approach <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="note-rule" />
            <span>Built around the collection, never the price tag.</span>
          </div>
        </div>

        <div className="hero-art" aria-label="Sample card artwork preview">
          <div className="hero-art-backdrop" />
          <div className="hero-art-caption">
            <span>01 — 04</span>
            <span>Studio studies · demo art</span>
          </div>
          <div className="hero-card hero-card-secondary">
            <Image
              src={sampleCards[1].image}
              alt=""
              fill
              sizes="(max-width: 760px) 30vw, 220px"
            />
          </div>
          <div className="hero-card hero-card-primary">
            <Image
              src={sampleCards[0].image}
              alt="Illustrated demo soccer card artwork, not a photograph of a real card"
              fill
              priority
              sizes="(max-width: 760px) 55vw, 340px"
            />
            <span className="hero-image-label">Illustrative demo artwork</span>
          </div>
          <div className="hero-index" aria-hidden="true">
            TDC
          </div>
        </div>
      </section>

      <section className="collection-section page-section" id="featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From the archive · demo content</p>
            <h2>A few worth a closer look.</h2>
          </div>
          <Link className="text-link section-link" href="/collection">
            View the collection <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="collection-grid collection-grid-home">
          {sampleCards.slice(0, 3).map((card, index) => (
            <CollectionCard key={card.id} card={card} priority={index === 0} />
          ))}
        </div>
      </section>

      <section className="manifesto-section" id="about">
        <div className="manifesto-mark" aria-hidden="true">TDC</div>
        <p className="eyebrow">A note on collecting</p>
        <h2>
          A card doesn&apos;t need
          <br />
          a big price to mean <em>a lot.</em>
        </h2>
        <p className="manifesto-copy">
          Top Drawer Cards is a personal archive for the pieces that make a
          collection feel like your own. The design, the player, the memory of
          finding it — that&apos;s part of the value, too.
        </p>
        <Link className="text-link" href="/collection">
          Start with the collection <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="home-endnote">
        <p className="eyebrow">Top Drawer Cards</p>
        <p>Soccer cards, collected with intention.</p>
      </section>
    </main>
  );
}
