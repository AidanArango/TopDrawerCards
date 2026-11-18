import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";
import { sampleCards } from "@/lib/sample-cards";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Browse the Top Drawer Cards collection archive. Artwork and details shown here are clearly marked phase-one demos.",
};

export default function CollectionPage() {
  return (
    <main className="collection-page page-section" id="main-content">
      <header className="collection-page-heading">
        <p className="eyebrow">The archive · sample content</p>
        <h1>Collected for the love of the game.</h1>
        <p>
          A first look at the gallery layout. Every image and title below is
          illustrative demo content, not a photograph or record of an owned
          card.
        </p>
        <span className="demo-notice">Phase one preview · {sampleCards.length} demo cards</span>
      </header>
      <div className="collection-grid">
        {sampleCards.map((card, index) => (
          <CollectionCard key={card.id} card={card} priority={index < 2} />
        ))}
      </div>
    </main>
  );
}
