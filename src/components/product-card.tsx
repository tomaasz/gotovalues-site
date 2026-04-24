import clsx from 'clsx';
import Image from 'next/image';
import { ElementType } from 'react';

import type { ProductCard as ProductCardType } from '@/content/site';

type ProductCardProps = {
  product: ProductCardType;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const hasUrl = 'url' in product && product.url;
  const Wrapper: ElementType = hasUrl ? 'a' : 'article';

  return (
    <Wrapper
      className={clsx('product-card', compact && 'product-card-compact')}
      {...(hasUrl ? { href: product.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div className="product-preview" role="img" aria-label={product.screenshot.alt}>
        <div className="product-preview-bar">
          <span />
          <span />
          <span />
        </div>
        <Image
          src={product.screenshot.src}
          alt=""
          className="product-preview-image"
          width={800}
          height={600}
          unoptimized={typeof product.screenshot.src === 'string' ? product.screenshot.src.endsWith('.svg') : undefined}
        />
        <div className="product-preview-label">{product.name}</div>
      </div>

      <div className="product-copy">
        <div className="product-meta">
          <span className="eyebrow eyebrow-inline">
            {product.category === 'public' ? 'Produkt publiczny' : 'Prywatne wdrożenie'}
          </span>
          {hasUrl ? <span className="product-link-label">Live</span> : null}
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
      {hasUrl ? <span className="sr-only"> (otwiera się w nowej karcie)</span> : null}
    </Wrapper>
  );
}
