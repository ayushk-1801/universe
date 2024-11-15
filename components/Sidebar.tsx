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
import { signOut } from 'next-auth/react';

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

    return (
        <div className="flex flex-col justify-between h-screen max-w-64 w-2/12 bg-gray-100 shadow-md px-3 py-4">
            <div>

                <div className="flex items-center mb-6 text-violet-600">
                    <h1 className="text-2xl font-bold">Universe</h1>
                </div>
                {
                    role === 'student' && (
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
                    )
                }
                {
                    role === 'professor' && (
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
                    )
                }

            </div>

            <div className="flex items-center justify-center">
                <Button className="w-full" onClick={() => signOut()}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
