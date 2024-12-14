"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	if (session && session.user) {
		const { user } = session;
		return (
			<div className="bg-green-800">
				hi name: {user.name}
				<div>
					<Button onClick={() => signOut()}>Sign out</Button>
				</div>
			</div>
		);
	}
	return <div className="bg-red-800">bye bye bye...</div>;
}
