import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import DynamicBlogForm from "../../_components/DynamicBlogForm";

interface Props {
    params: { id: string };
}

const EditBlogPage = async ({ params }: Props) => {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
        where: { id: parseInt(id) }
    });

    if (!blog) notFound();

    return (
        <DynamicBlogForm blog={blog} />
    )
}

export default EditBlogPage;