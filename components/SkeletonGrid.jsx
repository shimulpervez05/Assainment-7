export default function SkeletonGrid({ count = 8 }) {
  return <div className="product-grid">{Array.from({ length: count }, (_, i) => <div className="skeleton-card" key={i}><div className="skeleton skeleton-art"/><div className="skeleton skeleton-line short"/><div className="skeleton skeleton-line"/><div className="skeleton skeleton-line medium"/></div>)}</div>;
}
