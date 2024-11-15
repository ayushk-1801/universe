"use client"

import { useSessionData } from "../session";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { loading, session } = useSessionData();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!session) {
        return (
            redirect('/signin')
        );
    }

    const role = session.user?.role || 'student';

    return (
        <div className="flex">
            <Sidebar role={role} />

            <main className="flex-1 pt-4 bg-gray-50 px-40">
                {children}
            </main>
        </div>
    );
}
