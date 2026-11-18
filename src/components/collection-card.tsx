import Image from "next/image";
import Link from "next/link";
import type { SampleCard } from "@/lib/sample-cards";

type CollectionCardProps = {
  card: SampleCard;
  priority?: boolean;
};

export function CollectionCard({
  card,
  priority = false,
}: CollectionCardProps) {
  return (
    <article className="collection-card" id={card.id}>
      <Link
        className="collection-card-link"
        href={`/collection#${card.id}`}
        aria-label={`View ${card.title} demo artwork in the collection`}
      >
        <div className="collection-card-image">
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes="(max-width: 640px) 84vw, (max-width: 960px) 42vw, 25vw"
            priority={priority}
          />
          <span className="demo-stamp">Demo</span>
        </div>
        <div className="collection-card-caption">
          <div>
            <p className="eyebrow">{card.label}</p>
            <h3>{card.title}</h3>
          </div>
          <span className="card-arrow" aria-hidden="true">↗</span>
        </div>
      </Link>
    </article>
  );
}
