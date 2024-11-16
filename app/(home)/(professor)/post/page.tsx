"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/PostCards';

const PostsPage = () => {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || session.user.role !== 'professor') {
            setError('You must be logged in as a professor to view posts.');
            return;
        }

        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/professor/posts');
                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError('Error loading posts.');
            }
        };

        fetchPosts();
    }, [session, status]);

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            setError('Please provide both title and content.');
            return;
        }

        try {
            const res = await fetch('/api/professor/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    professorId: session?.user.id,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to create post');
            }

            const newPost = await res.json();
            setPosts([newPost, ...posts]);
            setTitle('');
            setContent('');
        } catch (err) {
            setError('Error creating post.');
        }
    };

    if (status === 'loading') {
        return <div className="text-center text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="font-bold text-3xl text-center mb-6">Your Posts</h1>

            <form onSubmit={handlePostSubmit} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
                <div>
                    <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
                    <textarea
                        id="content"
                        placeholder="Enter content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={6}
                        required
                    />
                </div>

                <Button type="submit" className="w-full" size={"lg"}>
                    Create Post
                </Button>
            </form>

            <div className="mt-6">
                {posts.length === 0 ? (
                    <p className="text-center text-gray-500">No posts available.</p>
                ) : (
                    <div>
                        <h2 className="font-bold text-2xl mb-4">All Posts</h2>
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default PostsPage;
