/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useActiveList from "@/hooks/useActiveList";

interface AvatarProps {
	user?: User;
}

const SidebarAvatar: React.FC<AvatarProps> = ({ user }) => {
	const { members } = useActiveList();
	const isActive = members.indexOf(user?.email!) !== -1;
	return (
		<div className="relative mr-2">
			<div>
				<Avatar>
					<AvatarImage src={user?.image || "/images/placeholder.png"} alt="Avatar" />
					<AvatarFallback>{"JD"}</AvatarFallback>
				</Avatar>
			</div>
			{isActive && <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />}
		</div>
	);
};

export default SidebarAvatar;
