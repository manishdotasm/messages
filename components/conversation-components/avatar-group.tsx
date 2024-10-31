/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { User } from "@prisma/client";
import SidebarAvatar from "../users-components/avatar";

interface AvatarGroupProps {
	users: User[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffleArray(array: any) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
	const slicedUsers = shuffleArray(users.slice()).slice(0, 3);

	return (
		<div className="flex items-center">
			{slicedUsers.map((user: { name: string | null; id: string; email: string | null; emailVerified: Date | null; image: string | null; hashedPassword: string | null; createdAt: Date; updatedAt: Date; conversationIds: string[]; seenMessageIds: string[] } | undefined, index: number) => (
				<div key={index} className={`relative  ${index === 0 ? "-ml-2" : "-ml-10"}`}>
					<SidebarAvatar user={user} />
				</div>
			))}
		</div>
	);
};

export default AvatarGroup;
