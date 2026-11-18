import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link className="footer-brand" href="/">
            TOP DRAWER CARDS
          </Link>
          <p>Affordable Cards. Premium Appreciation.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/collection">Collection</Link>
          <Link href="/#about">Our approach</Link>
          <a
            href="https://www.instagram.com/topdrawercards/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Top Drawer Cards</span>
        <span>Phase one preview · sample content</span>
      </div>
    </footer>
  );
}
