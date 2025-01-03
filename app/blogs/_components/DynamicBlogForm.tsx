'use client'

import { Blog } from '@prisma/client';
import dynamic from 'next/dynamic';

const BlogForm = dynamic(
    () => import('@/app/blogs/_components/BlogForm'),
    {
        ssr: false,
        loading: () => <p>Loading...</p>
    }
);

interface Props {
    blog?: Blog;
}

const DynamicFormImport = ({ blog }: Props) => {
    return (
        <BlogForm blog={blog} />
    )
}

export default DynamicFormImport;