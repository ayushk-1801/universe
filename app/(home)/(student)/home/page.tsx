"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Adjusted import to use proper Avatar components

interface Post {
    id: number;
    title: string;
    content: string;
    professorName: string;
}

function PostCard({ post }: { post: Post }) {
    return (
        <Card key={post.id} className="w-8/12 mx-auto mb-3 shadow-md">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage
                            src={`/api/avatar?name=${post.professorName}`}
                            alt={post.professorName}
                        />
                        <AvatarFallback>{post.professorName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{post.title}</CardTitle>
                        <div className="justify-between">
                            <CardDescription>By {post.professorName}</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p>{post.content}</p>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/student/posts");
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <p className="text-center">Loading posts...</p>;
    }

    return (
        <div className="p-6">
            {posts.length === 0 ? (
                <p className="text-center">No posts available.</p>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
