"use client";
import './BlogCard.css'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BlogCard = () => {
    const [blogData, setBlogData] = useState([]);

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


    return (
        <>
            {blogData && blogData.map((data) => {
                return (
                    <div className='blog-card' key={data.id}>
                        <Link href={'/blogCard/${data.id}'}>
                            <Image src={data.image} alt="img1" width={500} height={500}></Image>
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