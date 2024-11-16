"use client";

import { useState } from 'react';
import Link from 'next/link';
import { GoHomeFill } from 'react-icons/go';
import { CgNotes } from "react-icons/cg";
import { PiBooksFill } from "react-icons/pi";
import { MdForwardToInbox } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { Button } from './ui/button';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { useSession } from 'next-auth/react';

interface CardProps {
    title: string;
    link: string;
    Icon: Icon;
    isActive: boolean;
    onClick: () => void;
}

function Card({
    title,
    link,
    Icon,
    isActive,
    onClick
}: CardProps) {
    return (
        <div
            className={`flex flex-col items-center cursor-pointer font-bold text-lg w-full ${isActive ? 'text-violet-600' : 'text-gray-500'}`}
            onClick={onClick}
        >
            <Link href={link} className="flex items-center gap-2 w-full px-4 py-2">
                <Icon style={{ width: '20px', height: '20px' }} />
                {title}
            </Link>
        </div>
    );
}

interface SidebarProps {
    role: 'student' | 'professor';
}

const Sidebar = ({ role }: SidebarProps) => {
    const [activeCard, setActiveCard] = useState('/home');
    const { data: session } = useSession();

    const getInitials = (name: string) => {
        const nameParts = name.split(' ');
        return nameParts.map((part) => part.charAt(0).toUpperCase()).join('');
    };

    return (
        <div className="flex flex-col h-screen w-64 bg-gray-100 shadow-md px-3 py-4">
            <div className="flex flex-col flex-grow">
                {role === 'student' && (
                    <nav className="flex flex-col gap-2 justify-start">
                        <Card
                            title="Home"
                            link="/home"
                            Icon={GoHomeFill}
                            isActive={activeCard === '/home'}
                            onClick={() => setActiveCard('/home')}
                        />
                        <Card
                            title="Proposal"
                            link="/proposal"
                            Icon={CgNotes}
                            isActive={activeCard === '/proposal'}
                            onClick={() => setActiveCard('/proposal')}
                        />
                        <Card
                            title="Resources"
                            link="/resources"
                            Icon={PiBooksFill}
                            isActive={activeCard === '/resources'}
                            onClick={() => setActiveCard('/resources')}
                        />
                    </nav>
                )}
                {role === 'professor' && (
                    <nav className="flex flex-col gap-2 justify-start">
                        <Card
                            title="Inbox"
                            link="/inbox"
                            Icon={MdForwardToInbox}
                            isActive={activeCard === '/inbox'}
                            onClick={() => setActiveCard('/inbox')}
                        />
                        <Card
                            title="Post"
                            link="/post"
                            Icon={MdOutlinePostAdd}
                            isActive={activeCard === '/post'}
                            onClick={() => setActiveCard('/post')}
                        />
                    </nav>
                )}
            </div>

            <div className="flex items-center gap-3 mt-auto mb-16 hover:bg-gray-200 cursor-pointer p-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
                    {session?.user?.name ? getInitials(session.user.name) : 'U'}
                </div>
                <span className="font-semibold text-lg">{session?.user?.name}</span>
            </div>
        </div>
    );
};

export default Sidebar;
