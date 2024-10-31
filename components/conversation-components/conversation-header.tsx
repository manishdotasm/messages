"use client";

import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";
import { Link } from "../ui/link";
import { MoveLeft } from "lucide-react";
import useOtherUser from "@/hooks/useOtherUser";
import SidebarAvatar from "../users-components/avatar";
import ProfileDrawer from "./profile-drawer";
import AvatarGroup from "./avatar-group";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps {
	conversation: Conversation & {
		users: User[];
	};
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
	const otherUser = useOtherUser(conversation);
	const { members } = useActiveList();
	// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
	const isActive = members.indexOf(otherUser?.email!) !== -1;

	const statusText = useMemo(() => {
		if (conversation.isGroup) return `${conversation.users.length} members`;

		return isActive ? "Active" : "Offline"; // Adjust this logic as necessary
	}, [conversation, isActive]);

	return (
		<div className="w-full flex border-b-[2px] border-black sm:px-4 py-3 px-4 lg:px-6 justify-between items-center">
			<div className="flex gap-5 items-center">
				<Link className="lg:hidden cursor-pointer" href="/conversations" aria-label="Back to conversations">
					<MoveLeft />
				</Link>
				{conversation.isGroup ? <AvatarGroup users={conversation.users} /> : <SidebarAvatar user={otherUser} />}
				<div className="flex flex-col">
					<div className="font-bold">{conversation.name || otherUser.name}</div>
					<div className="text-sm font-light "> {statusText}</div>
				</div>
			</div>
			<div>
				<ProfileDrawer data={conversation} />
			</div>
		</div>
	);
};

export default Header;
