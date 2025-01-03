import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

interface Props {
    blogId: number;
}

const EditBlogButton = ({ blogId }: Props) => {
    return (
        <Button variant="outline">
            <FaRegEdit />
            <Link href={`/blogs/${blogId}/edit`}>Edit Blog</Link>
        </Button>
    )
}

export default EditBlogButton;