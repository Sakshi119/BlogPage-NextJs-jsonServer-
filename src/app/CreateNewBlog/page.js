"use client";
import React, { useEffect, useState } from 'react'
// import './CreateForm.css'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
const CreateForm = () => {
    const { register, handleSubmit, reset,
        formState: { errors }
    } = useForm();

    const router = useRouter()
    const searchParams = useSearchParams()

    const blogId = searchParams.get("id");
    console.log(blogId, "Blog ID");


    const [editData, setEditData] = useState(null);

    useEffect(() => {
        if (blogId) {
            axios.get(`http://localhost:5000/blogData/${blogId}`).then(res => {
                setEditData(res.data);
                console.log(res.data, "data");

                reset({
                    title: res.data.title,
                    description: res.data.description,
                    image: ""
                })
            })
        }
    }, [blogId, reset])


    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error)
        })
    }

    const onSubmit = async (data) => {
        try {
            let base64Image = editData?.image || "";
            if (data.image && data.image[0]) {
                base64Image = await toBase64(data.image[0]);
            }


            if (blogId) {
                await axios.put(`http://localhost:5000/blogData/${blogId}`, {
                    id: Number(blogId),
                    title: data.title,
                    description: data.description,
                    image: base64Image
                })
                alert("Blog Updated Successfully")
            } else {
                const blogs = await axios.get("http://localhost:5000/blogData").then(res => res.data);
                const nextId = blogs.length > 0 ? Math.max(...blogs.map(b => Number(b.id))) + 1 : 1;

                const newBlog = {
                    id: nextId,
                    title: data.title,
                    description: data.description,
                    image: base64Image
                };
                await axios.post('http://localhost:5000/blogData', newBlog, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                alert("Blog Created Successfully")
            }

            reset();
            router.push("/");
        } catch (e) {
            console.error(e);
        }
        console.log(data);
    }

    return (
        <div>
            <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex  flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start" style={{ width: "100%" }}>

                    <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left" style={{ width: "100%" }}>

                        <div className="mainblog-top-head">
                            <div className="flex flex-col">
                                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                                    {blogId ? "Edit Blog" : "Create a New Blog"}
                                </h1>
                                <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                                    What do you want to share?
                                </p>

                                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                                    <div className='input-sec'>
                                        <label>Image:</label>
                                        <input
                                            placeholder='Enter the Blog Title'
                                            type='file'
                                            {...register("image", {
                                                // required:"Title is required"                                                
                                            })} />
                                        {/* {errors.image && <p className='error'>{errors.image.message}</p>}     */}
                                    </div>
                                    <div className='input-sec'>
                                        <label>Title:</label>
                                        <input
                                            placeholder='Enter the Blog Title'
                                            type='text'
                                            {...register("title", {
                                                required: "Title is required"
                                            })} />
                                        {errors.title && <p className='error'>{errors.title.message}</p>}
                                    </div>
                                    <div className='input-sec'>
                                        <label>Description:</label>
                                        <textarea
                                            placeholder='Enter the Blog Description'
                                            type='textbox'
                                            rows={5}
                                            cols={40}
                                            {...register("description", {
                                                required: "Description is required"
                                            })} />
                                        {errors.description && <p className='error'>{errors.description.message}</p>}
                                    </div>

                                    <button type='submit' className='b-btn'>{blogId? "Update" : "Submit"}</button>
                                </form>
                            </div>  
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default CreateForm