
import React from 'react'

const BlogDetailsInner = ({params}) => {
    const {BlogDetails} =  params;
   
  return (
    <div>
        <h1>{params.BlogDetails}</h1>
        <h2>Inner Page</h2>
    </div>
  )
}

export default BlogDetailsInner