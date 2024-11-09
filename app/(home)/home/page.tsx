"use client"

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const Home = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (session) {
        const { user } = session;
        return (
            <div className="bg-green-800">
                <h1>Hi, {user?.name}</h1>
                <div>
                    <Button onClick={() => signOut()}>Sign out</Button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="bg-red-800">
                <h1>You are not signed in</h1>
            </div>
        );
    }
};

export default Home;
