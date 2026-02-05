"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const CreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [editData, setEditData] = useState(null);

  // 🔹 FETCH BLOG FOR EDIT
  useEffect(() => {
    if (!blogId) return;

    axios
      .get(`/api/blog?id=${blogId}`)
      .then((res) => {
        setEditData(res.data);

        reset({
          title: res.data.title,
          description: res.data.description,
          image: "",
        });
      })
      .catch(console.error);
  }, [blogId, reset]);

  // 🔹 IMAGE TO BASE64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // 🔹 SUBMIT HANDLER
  const onSubmit = async (data) => {
    try {
      let base64Image = editData?.image || "";

      if (data.image?.[0]) {
        base64Image = await toBase64(data.image[0]);
      }

      if (blogId) {
        // 🔁 UPDATE BLOG
        await axios.put(`/api/blog?id=${blogId}`, {
          id: Number(blogId),
          title: data.title,
          description: data.description,
          image: base64Image,
        });

        alert("Blog Updated Successfully");
      } else {
        // ➕ CREATE BLOG
        const blogs = await axios.get("/api/blog").then((res) => res.data);
        const nextId =
          blogs.length > 0
            ? Math.max(...blogs.map((b) => Number(b.id))) + 1
            : 1;

        await axios.post("/api/blog", {
          id: nextId,
          title: data.title,
          description: data.description,
          image: base64Image,
        });

        alert("Blog Created Successfully");
      }

      reset();
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="py-32 px-16 bg-white dark:bg-black w-full">
        <h1 className="text-3xl font-semibold">
          {blogId ? "Edit Blog" : "Create a New Blog"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-sec">
            <label>Image</label>
            <input type="file" {...register("image")} />
          </div>

          <div className="input-sec">
            <label>Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div className="input-sec">
            <label>Description</label>
            <textarea
              rows={5}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>

          <button type="submit">
            {blogId ? "Update" : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateForm;
