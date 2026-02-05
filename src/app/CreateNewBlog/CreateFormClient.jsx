"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateFormClient() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (blogId) {
      axios.get(`/api/blog/${blogId}`).then(res => {
        setEditData(res.data);
        reset({
          title: res.data.title,
          description: res.data.description,
          image: ""
        });
      });
    }
  }, [blogId, reset]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const onSubmit = async (data) => {
    let base64Image = editData?.image || "";
    if (data.image?.[0]) {
      base64Image = await toBase64(data.image[0]);
    }

    if (blogId) {
      await axios.put(`/api/blog/${blogId}`, {
        id: Number(blogId),
        title: data.title,
        description: data.description,
        image: base64Image
      });
      alert("Blog Updated");
    } else {
      const blogs = await axios.get("/api/blog").then(res => res.data);
      const nextId = blogs.length
        ? Math.max(...blogs.map(b => Number(b.id))) + 1
        : 1;

      await axios.post("/api/blog", {
        id: nextId,
        title: data.title,
        description: data.description,
        image: base64Image
      });
      alert("Blog Created");
    }

    reset();
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("image")} />
      <input type="text" {...register("title", { required: true })} />
      <textarea {...register("description", { required: true })} />
      <button type="submit">{blogId ? "Update" : "Submit"}</button>
    </form>
  );
}
