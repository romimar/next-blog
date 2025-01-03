import React from 'react';
import { Blog } from '@prisma/client';
import ReactMarkdown from 'react-markdown';

interface Props {
    blog: Blog;
}

const BlogDetails = ({ blog }: Props) => {
    return (
        <div className='text-slate-700 pb-7 pt-8'>
            <div className='text-3xl antialiased font-bold text-wrap w-[550px]'>{blog.title}</div>
            <div className='my-2 mb-6'>
                <div className='uppercase text-gray-400 text-sm mb-4'>{blog.created_at.toDateString()}</div>
                <div className='text-sm font-semibold'>by {blog.user_name || 'User'}</div>
            </div>
            <div className='prose'>
                <ReactMarkdown>{blog.description}</ReactMarkdown>
            </div>
        </div>
    )
}

export default BlogDetails;