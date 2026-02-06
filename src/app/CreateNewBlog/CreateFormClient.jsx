"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import './CreateForm.css'

export default function CreateFormClient() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: "",
            description: ""
        }
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get("id");

    const [editData, setEditData] = useState(null);

    useEffect(() => {
        if (!blogId) return;

        const fetchBlog = async () => {
            try {
                const res = await axios.get(`/api/blog?id=${blogId}`);

                if (!res.data) return;

                setEditData(res.data);

                reset({
                    title: res.data.title || "",
                    description: res.data.description || ""
                });
            } catch (err) {
                console.error("Failed to load blog", err);
            }
        };

        fetchBlog();
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
            await axios.put(`/api/blog?id=${blogId}`, {
                id: Number(blogId),
                title: data.title,
                description: data.description,
                image: base64Image
            });
            alert("Blog Updated");
        } else {
            // const blogs = await axios.get("/api/blog").then(res => res.data);
            // const nextId = blogs.length
            //     ? Math.max(...blogs.map(b => Number(b.id))) + 1
            //     : 1;

            await axios.post("/api/blog", {
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
        <form className="blog-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-title">
                {blogId ? "Update Blog" : "Create New Blog"}
            </h2>



            <div className="input-sec">
                <label>Cover Image</label>
                <input type="file" {...register("image")} />

                {editData?.image && (
                    <div className="image-preview input-sec">
                        <img src={editData.image} alt="Current cover" width="300" height="400" />
                        <p className="preview-text">Current cover image</p>
                    </div>
                )}
            </div>

            <div className="input-sec">
                <label>Title</label>
                <input
                    type="text"
                    placeholder="Enter blog title"
                    {...register("title", { required: true })}
                />
                {errors.title && <p className="error">Title is required</p>}
            </div>

            <div className="input-sec">
                <label>Description</label>
                <textarea
                    rows="5"
                    placeholder="Write your blog content here..."
                    {...register("description", { required: true })}
                />
                {errors.description && (
                    <p className="error">Description is required</p>
                )}
            </div>

            <button className="b-btn" type="submit">
                {blogId ? "Update Blog" : "Publish Blog"}
            </button>
        </form>
    );
}
