"use client";

import { useSession } from 'next-auth/react';

export const useSessionData = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return { loading: true, session: null };
    }

    if (!session) {
        return { loading: false, session: null };
    }

    return { loading: false, session };
};
