"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);

        try {
            const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            setSearchResults(data);
            setPopoverOpen(true);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    const togglePopover = () => setPopoverOpen((prev) => !prev);

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
            <div className="text-2xl font-bold text-violet-600">Universe</div>

            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-96 gap-2"
                />

                {popoverOpen && (
                    <div
                        className="absolute w-96 bg-white border rounded shadow-lg p-4 mt-2"
                        onMouseLeave={() => setPopoverOpen(false)}
                    >
                        {searchResults.length === 0 && searchQuery ? (
                            <p className="text-center">No results found.</p>
                        ) : (
                            <ul className="space-y-2">
                                {searchResults.map((user) => (
                                    <li
                                        key={user.id}
                                        className="flex justify-between p-2 border rounded-md"
                                    >
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs rounded ${user.role === "professor"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-blue-200 text-blue-800"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">

                <Button variant="destructive" onClick={() => signOut()}>
                    Logout
                </Button>

            </div>
        </nav>
    );
};

export default Navbar;
