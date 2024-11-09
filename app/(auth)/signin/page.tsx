"use client"

import { useSession } from 'next-auth/react';
import Auth from '@/components/Auth';
import { redirect } from 'next/navigation';

const Home = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (session) {
        redirect('/home');
    } else {
        return (
            <div className="">
                <Auth type="signin" />
            </div>
        );
    }
};

export default Home;
