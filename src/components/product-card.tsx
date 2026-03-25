import clsx from "clsx";

import type { ProductCard as ProductCardType } from "@/content/site";

type ProductCardProps = {
  product: ProductCardType;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const Wrapper = product.url ? "a" : "article";

  return (
    <Wrapper
      className={clsx("product-card", compact && "product-card-compact")}
      {...(product.url
        ? { href: product.url, target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <div className="product-preview" aria-label={product.screenshot.alt}>
        <div className="product-preview-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="product-preview-grid">
          <div className="product-preview-panel product-preview-panel-wide" />
          <div className="product-preview-panel" />
          <div className="product-preview-panel" />
          <div className="product-preview-panel product-preview-panel-tall" />
        </div>
        <div className="product-preview-label">{product.name}</div>
      </div>

      <div className="product-copy">
        <div className="product-meta">
          <span className="eyebrow eyebrow-inline">
            {product.category === "public" ? "Produkt publiczny" : "Prywatne wdrożenie"}
          </span>
          {product.url ? <span className="product-link-label">Live</span> : null}
        </div>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <ul className="tag-list" aria-label={`Stack projektu ${product.name}`}>
          {product.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="product-impact">{product.impact}</p>
      </div>
    </Wrapper>
  );
}
