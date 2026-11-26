import clsx from 'clsx';
import Image from 'next/image';
import { ElementType } from 'react';

import type { ProductCard as ProductCardType } from '@/content/site';

type ProductCardProps = {
  product: ProductCardType;
  compact?: boolean;
  variant?: 'default' | 'sheet';
  detailCode?: string;
};

export function ProductCard({
  product,
  compact = false,
  variant = 'default',
  detailCode,
}: ProductCardProps) {
  const isPublic = product.category === 'public';
  const hasUrl = isPublic && 'url' in product && Boolean(product.url);
  const Wrapper: ElementType = hasUrl ? 'a' : 'article';

  if (variant === 'sheet') {
    return (
      <Wrapper
        className={clsx(
          'gv-proof-card',
          isPublic ? 'gv-proof-card-public' : 'gv-proof-card-private',
        )}
        {...(hasUrl ? { href: product.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <div className="gv-proof-callout">
          <span className="gv-proof-category">
            {detailCode ? (
              <span className="gv-proof-code" aria-hidden="true">
                {detailCode}
              </span>
            ) : null}
            <span>{isPublic ? 'Produkt publiczny' : 'Prywatne wdrożenie'}</span>
          </span>
          {hasUrl ? (
            <span className="gv-proof-action">
              Otwórz
              <svg className="gv-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M6 3h7v7M13 3 4 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          ) : (
            <span className="gv-proof-badge">Bez linku</span>
          )}
        </div>

        {isPublic ? (
          <div className="gv-proof-media">
            <Image
              src={product.screenshot.src}
              alt={product.screenshot.alt}
              width={960}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 540px"
            />
          </div>
        ) : (
          <div
            className="gv-proof-media gv-proof-media-private"
            role="img"
            aria-label={product.screenshot.alt}
          >
            <div className="gv-proof-private-frame" aria-hidden="true">
              <span>Anonimowy przykład</span>
            </div>
          </div>
        )}

        <div className="gv-proof-copy">
          <h3>{product.name}</h3>
          <p>{product.summary}</p>
        </div>

        {hasUrl ? <span className="sr-only"> (otwiera się w nowej karcie)</span> : null}
      </Wrapper>
    );
  }

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
