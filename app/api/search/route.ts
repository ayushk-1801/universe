import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const query = url.searchParams.get("query") || "";

        if (!query.trim()) {
            return NextResponse.json({ message: "No query provided.", results: [] }, { status: 400 });
        }

        // Query both Student and Professor models
        const students = await prisma.student.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        const professors = await prisma.professor.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        // Combine and add roles
        const results = [
            ...students.map((student) => ({ ...student, role: "student" })),
            ...professors.map((professor) => ({ ...professor, role: "professor" })),
        ];

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: "An error occurred while searching." }, { status: 500 });
    }
}
