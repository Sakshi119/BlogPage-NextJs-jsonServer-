import Link from "next/link";

export default async function BlogDetailsInner({ params }) {
  const { BlogDetails } = await params;

  const res = await fetch("/api/blog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const allBlogs = await res.json();

  const found = allBlogs.find(
    (b) => String(b.id) === String(BlogDetails)
  );

  if (!found) {
    return <h1>❌ Blog Not Found</h1>;
  }

  return (
    <div className="blogDetails">
      <Link href="/">
        <span className="back-btn">🔙</span>
      </Link>

      <h1 className="title">{found.title}</h1>

      <div className="blogDetails-banner">
        <img src={found.image} alt={found.title} />
      </div>

      <p className="content">{found.description}</p>
    </div>
  );
}
