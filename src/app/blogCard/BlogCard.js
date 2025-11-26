"use client";
// import './BlogCard.css'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const BlogCard = () => {
    const [blogData, setBlogData] = useState([]);
    const router = useRouter()
    const [deletingId, setDeletingId] = useState(null)


    useEffect(() => {
        getBlogData()
    }, [])

    const getBlogData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/blogData');
            setBlogData(response.data)
            // console.log("data", response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const handleEdit = (id) => {
        router.push(`/CreateNewBlog?id=${id}`)
    }

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/blogData/${id}`)
            // alert("Blog deleted successfully")
            toast.success("Blog deleted successfully")
            setDeletingId(id);
            setTimeout(() => {
                setBlogData(prev => prev.filter(blog => blog.id !== id))
            },300)

        } catch (e) {
            console.error(e, "error deleting the blog")
            // alert("Failed to delete the blog.");
            toast.error("Failed to delete the blog.")
        }
    }

    return (
        <>
            {blogData && blogData.map((data) => {
                return (
                    <div className={`blog-card ${deletingId === data.id ? "deleting" : ""}`} key={data.id}>

                        <span className='edit-btn' onClick={() => handleEdit(data.id)}>✏️</span>
                        <span className='delete-btn' onClick={() => handleDelete(data.id)}>🗑️</span>
                        <Image src={data.image} alt="img1" width={500} height={500}></Image>
                        <Link href={`/blogCard/${data.id}`}>
                            <div className='blog-details'>
                                <h3 className='blog-title'>{data.title}</h3>
                                <p className='blog-summary'>{data.description}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}

        </>

    )
}

export default BlogCard