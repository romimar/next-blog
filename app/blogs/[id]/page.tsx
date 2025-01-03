import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import BlogDetails from './BlogDetails';
import EditBlogButton from './EditBlogButton';

interface Props {
    params: { id: string }
}

const BlogPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
        where: { id: parseInt(id) }
    });

    if (!blog) notFound();

    return (
        <>
            {session && (
                <div className='mb-7'>
                    <EditBlogButton blogId={blog.id} />
                </div>
            )}
            <BlogDetails blog={blog} />
        </>
    )
}

export default BlogPage;