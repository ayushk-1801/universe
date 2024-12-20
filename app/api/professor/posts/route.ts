import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'professor') {
            return NextResponse.json(
                { error: 'Unauthorized access' },
                { status: 403 }
            );
        }

        const professorId = session.user.id;
        const posts = await prisma.post.findMany({
            where: { professorId },
            include: {
                professor: {
                    select: { name: true },
                },
            },
        });

        const formattedPosts = posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            professorName: post.professor.name,
            createdAt: post.createdAt,
        }));

        return NextResponse.json(formattedPosts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'professor') {
            return NextResponse.json(
                { error: 'Unauthorized access' },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { title, content, professorId } = body;

        if (!title || !content || !professorId) {
            return NextResponse.json(
                { error: 'All fields are required: title, content, professorId' },
                { status: 400 }
            );
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                professorId,
            },
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
    }
}

