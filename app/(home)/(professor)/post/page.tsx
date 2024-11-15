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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 className='font-bold text-xl'>Your Posts</h1>

            <form onSubmit={handlePostSubmit}>
                <div>
                    Title:
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    Content:
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit">Create Post</Button>
            </form>

            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
        </div>
    );
};

export default PostsPage;
