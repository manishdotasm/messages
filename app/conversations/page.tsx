"use client";

import useConversation from "@/hooks/useConversation";
import EmptyState from "@/components/users-components/empty-state";
import { cn } from "@/lib/utils";

const Home = () => {
	const { isOpen } = useConversation();

	return (
		<div className={cn("lg:pl-96 h-full lg:block", isOpen ? "block" : "hidden")}>
			<EmptyState />
		</div>
	);
};

export default Home;
