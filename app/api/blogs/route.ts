import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { blogSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });
    
    const body = await request.json();
    const validation = blogSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newBlog = await prisma.blog.create({
        data: { title: body.title, description: body.description, user_name: body.userName }
    });

    return NextResponse.json(newBlog, { status: 201 });
}
