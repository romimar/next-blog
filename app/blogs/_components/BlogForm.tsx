'use client';

import { blogSchema } from '@/app/validationSchema';
import ErrorMessage from '@/components/ErrorMessage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import SimpleMDE from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';
import { Blog } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type BlogFormData = z.infer<typeof blogSchema>;

interface Props {
    blog?: Blog;
}

const BlogForm = ({ blog }: Props) => {
    const { status, data: session } = useSession();

    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<BlogFormData>({
        resolver: zodResolver(blogSchema)
    });
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSaving(true);
            if (blog)
                await axios.patch('/api/blogs/' + blog.id, data);
            else
                await axios.post('/api/blogs', data);
            router.push('/blogs');
            router.refresh();
        } catch (error) {
            setIsSaving(false);
            setError('Unexpected error occured. Try again.');
        }
    });

    return (
        <div className='max-w-xl mb-8'>
            {error &&
                <Alert variant="destructive" className='mb-6'>
                    <MdErrorOutline className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            }
            <div className='text-2xl antialiased font-semibold mb-8'>{blog ? 'Updating a blog' : 'Adding a new Blog'}</div>
            <form
                className='space-y-4'
                onSubmit={onSubmit}
            >
                <Input id="user" defaultValue={session ? session.user!.name! : 'User'} {...register('userName')} disabled />
                <Input id="title" defaultValue={blog?.title} placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={blog?.description}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <div className='space-x-2'>
                    <Button disabled={isSaving}>
                        {blog ? 'Update' : 'Save'}{' '}
                        {isSaving && <Spinner />}
                    </Button>
                    <Button variant={'outline'}>
                        <Link href='/blogs'>
                            Go back{' '}
                            {isSaving && <Spinner />}
                        </Link>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm;