import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                professor: {
                    select: { name: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const formattedPosts = posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            professorName: post.professor.name,
            createdAt: post.createdAt,
        }));

        return NextResponse.json(formattedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}
