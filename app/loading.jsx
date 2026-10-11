import SkeletonGrid from "@/components/SkeletonGrid";
export default function Loading() { return <section className="container page-section"><div className="skeleton skeleton-title"/><div className="skeleton skeleton-line medium"/><SkeletonGrid count={8}/></section>; }
