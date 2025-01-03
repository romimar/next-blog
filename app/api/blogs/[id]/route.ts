import authOptions from "@/app/auth/authOptions";
import { blogSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest, 
    { params }: { params: { id: string }}
) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = blogSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const blog = await prisma.blog.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!blog)
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

    const updatedBlog = await prisma.blog.update({
        where: { id: blog.id },
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(updatedBlog);
}
