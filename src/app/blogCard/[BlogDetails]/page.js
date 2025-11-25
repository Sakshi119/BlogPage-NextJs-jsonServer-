import axios from "axios";
// import "../BlogCard.css";

export default async function BlogDetailsInner({ params }) {
  const BlogDetails = (await params).BlogDetails; // FIX
  const res = await axios.get("http://localhost:5000/blogData");
  const allBlogs = res.data;

  const found = allBlogs.find(
    (b) => String(b.id) === String(BlogDetails)
  );

  if (!found) return <h1>❌ Blog Not Found</h1>;

  return (
    <div className="blogDetails">
      <h1 className="title">{found.title}</h1>
      <div className="blogDetails-banner">
        <img src={found.image} alt={found.title}/>
      </div>
      <p className="content">{found.description}</p>
    </div>
  );
}
