"use client";

import { useSession } from "next-auth/react";
import Auth from "@/components/Auth";
import { redirect } from "next/navigation";

const Home = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (session) {
		redirect("/home");
	} else {
		return (
			<div className="flex w-screen justify-center mt-48">
				<Auth type="signup" />
			</div>
		);
	}
};

export default Home;
