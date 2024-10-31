"use client";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Div } from "../ui/div";
import SidebarAvatar from "../users-components/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import AvatarGroup from "./avatar-group";

interface ConversationBoxProps {
	data: FullConversationType;
	selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
	const otherUser = useOtherUser(data);
	const session = useSession();
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [data.id, router]);

	const lastMessage = useMemo(() => {
		const messages = data.messages || [];
		return messages[messages.length - 1];
	}, [data.messages]);

	const userEmail = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	const hasSeen = useMemo(() => {
		if (!lastMessage) return false;

		const seenArray = lastMessage.seen || [];

		if (!userEmail) return false;

		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail, lastMessage]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return "Sent an image";
		}

		if (lastMessage?.body) {
			return lastMessage.body;
		}

		return "Started a conversation";
	}, [lastMessage]);

	return (
		<Div
			onClick={handleClick}
			onKeyPress={(e) => {
				if (e.key === "Enter") handleClick(); // Support keyboard interaction
			}}
			role="button" // Indicates that this is a clickable element
			tabIndex={0} // Makes it focusable
			className={cn("w-full relative flex h-full items-center cursor-pointer my-3", selected ? "bg-secondaryAccent" : "")}
		>
			{data.isGroup ? <AvatarGroup users={data.users} /> : <SidebarAvatar user={otherUser} />}

			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<p className="text-sm font-medium text-black ml-2 overflow-hidden">{data.name || otherUser.name}</p>
						{lastMessage?.createdAt && <p className="text-xs text-gray-700 font-bold">{format(new Date(lastMessage.createdAt), "p")}</p>}
					</div>
					<p className={cn("ml-2 truncate text-xs", hasSeen ? "text-gray-700" : "text-black text-bold")}>{lastMessageText}</p>
				</div>
			</div>
		</Div>
	);
};

export default ConversationBox;
