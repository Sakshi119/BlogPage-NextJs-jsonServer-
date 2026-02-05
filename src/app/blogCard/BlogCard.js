"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BlogCard = () => {
  const [blogData, setBlogData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogData(res.data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load blogs");
    }
  };

  const handleEdit = (id) => {
    router.push(`/CreateNewBlog?id=${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await axios.delete(`/api/blog?id=${id}`);

      toast.success("Blog deleted successfully");

      setTimeout(() => {
        setBlogData((prev) => prev.filter((blog) => blog.id !== id));
        setDeletingId(null);
      }, 300);
    } catch (e) {
      console.error(e);
      setDeletingId(null);
      toast.error("Failed to delete the blog");
    }
  };

  return (
    <>
      {blogData.map((data) => (
        <div
          key={data.id}
          className={`blog-card ${deletingId === data.id ? "deleting" : ""}`}
        >
          <span className="edit-btn" onClick={() => handleEdit(data.id)}>
            ✏️
          </span>

          <span className="delete-btn" onClick={() => handleDelete(data.id)}>
            🗑️
          </span>

          <Image
            src={data.image}
            alt={data.title}
            width={500}
            height={500}
          />

          <Link href={`/blogCard/${data.id}`}>
            <div className="blog-details">
              <h3 className="blog-title">{data.title}</h3>
              <p className="blog-summary">{data.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default BlogCard;
