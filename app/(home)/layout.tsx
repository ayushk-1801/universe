"use client"

import { useSessionData } from "../session";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { loading, session } = useSessionData(); // Use the custom hook

    // If session is loading, show a loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    // If no session (user is not authenticated), you can redirect or show a message
    if (!session) {
        return (
            redirect('/signin')
        );
    }

    // Assuming the role is stored in session.user.role
    const role = session.user?.role || 'student'; // Default to 'Student' if no role is available

    return (
        <div className="flex">
            {/* Pass the role to Sidebar component */}
            <Sidebar role={role} />

            <main className="flex-1 p-4 bg-gray-50">
                {children}
            </main>
        </div>
    );
}
