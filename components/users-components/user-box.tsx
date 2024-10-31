"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Div } from "../ui/div";
import SidebarAvatar from "./avatar";
import LoadingModal from "../conversation-components/loading-modal";

interface UserBoxProps {
	data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = useCallback(() => {
		setIsLoading(true);
		axios
			.post("/api/conversations", {
				userId: data.id,
			})
			.then((response) => {
				router.push(`/conversations/${response.data.id}`);
			})
			.catch((error) => {
				console.error("Error creating conversation:", error);
			})
			.finally(() => setIsLoading(false));
	}, [data, router]);

	return (
		<>
			{isLoading && <LoadingModal />}
			<Div
				onClick={handleClick}
				onKeyPress={(e) => {
					if (e.key === "Enter") handleClick(); // Support keyboard interaction
				}}
				role="button" // Indicates that this is a clickable element
				tabIndex={0} // Makes it focusable
				className="w-full relative flex h-full items-center cursor-pointer bg-bg my-3"
				aria-disabled={isLoading} // Indicates loading state to assistive technologies
			>
				<SidebarAvatar user={data} />
				<div className="min-w-0 flex-1">
					<div className="focus:outline-none">
						<div className="flex justify-between items-center mb-1">
							<p className="text-sm font-medium text-black ml-2 overflow-hidden">{data.name}</p>
						</div>
					</div>
				</div>
			</Div>
		</>
	);
};

export default UserBox;
