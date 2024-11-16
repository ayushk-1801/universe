"use client";

import { useSessionData } from "../session";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
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
        return redirect('/signin');
    }

    const role = session.user?.role || 'student';

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar session={session} />

            <div className="flex flex-1">
                {/* Sidebar with fixed height */}
                <Sidebar role={role} className="h-screen" />

                {/* Main content with scrolling enabled */}
                <main className="flex-1 pt-4 bg-gray-50 px-40 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
