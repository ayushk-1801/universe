import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();

  try {
    const proposal = await prisma.proposal.create({
      data: {
        title: data.title,
        description: data.description,
        userId: session.user.id,
      },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 500 });
  } 
}
