import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import prisma from '@/prisma/client';
import Link from 'next/link';

const BlogsPage = async () => {
    const blogs = await prisma.blog.findMany();

    return (
        <>
            <div className='mb-7'>
                <Button variant="outline" asChild>
                    <Link href="/blogs/new">New Blog</Link>
                </Button>
            </div>
            <div>
                {blogs.map(blog => (
                    <div key={blog.id} className='border-b text-slate-700 pb-7 pt-8'>
                        <div className='mb-4'>
                            <Skeleton className='h-[125px] w-full rounded-md' />
                        </div>
                        <div className='font-medium antialiased'>
                            <div className='uppercase text-gray-400 text-sm'>
                                {blog.created_at.toDateString()}
                            </div>
                            <div className='mt-1'>
                                <Link href={`/blogs/${blog.id}`} className='text-xl font-semibold'>
                                    {blog.title}
                                </Link>
                                <div className='line-clamp-3 mt-2 text-gray-500 text-lg font-normal'>
                                    {blog.description}
                                </div>
                            </div>
                        </div>
                    </div>
                )).reverse()}
            </div >
        </>
    )
}

export default BlogsPage;