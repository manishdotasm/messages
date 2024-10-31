"use client";

import { Conversation, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetPortal, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import useOtherUser from "@/hooks/useOtherUser";
import { format } from "date-fns";
import { useMemo } from "react";
import { Bolt } from "lucide-react";
import SidebarAvatar from "../users-components/avatar";
import ConfirmationModal from "./confirmation-modal";
import AvatarGroup from "./avatar-group";
import useActiveList from "@/hooks/useActiveList";

interface ProfileDrawerProps {
	data: Conversation & {
		users: User[];
	};
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data }) => {
	const otherUser = useOtherUser(data);
	const { members } = useActiveList();
	// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
	const isActive = members.indexOf(otherUser?.email!) !== -1;

	const joinedDate = useMemo(() => {
		return format(new Date(otherUser.createdAt), "PP");
	}, [otherUser.createdAt]);

	const title = useMemo(() => {
		return data.name || otherUser.name;
	}, [data.name, otherUser.name]);

	const statusText = useMemo(() => {
		if (data.isGroup) return `${data.users.length} members`;

		return isActive ? "Active" : "Offline ";
	}, [data, isActive]);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={"neutral"} className="bg-redAccent">
					<Bolt />
				</Button>
			</SheetTrigger>
			<SheetPortal>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>
							<div className="flex flex-col items-center">
								{data.isGroup ? <AvatarGroup users={data.users} /> : <SidebarAvatar user={otherUser} />}
								<div className="mt-2 font-bold"> {title} </div>
								<div className="text-sm font-normal mt-1">{statusText}</div>
							</div>
						</SheetTitle>
						<SheetDescription>
							<div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
								<dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
									{data.isGroup && (
										<div>
											<dt className="text-sm font-bold sm:w-40 sm:flex-shrink"> Emails</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
												{data.users.map((user, index) => (
													<div key={index} className="w-full">
														{" "}
														{user.email}{" "}
													</div>
												))}
											</dd>
										</div>
									)}
									{!data.isGroup && (
										<div>
											<dt className="text-sm font-bold sm:w-40 sm:flex-shrink"> Email </dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{otherUser.email}</dd>
										</div>
									)}{" "}
									{!data.isGroup && (
										<>
											<hr />
											<div>
												<dt className="text-sm font-bold sm:w-40 sm:flex-shrink"> Joined </dt>
												<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
													<time dateTime={joinedDate}>{joinedDate}</time>
												</dd>
											</div>
										</>
									)}
								</dl>
							</div>
						</SheetDescription>
					</SheetHeader>

					<SheetFooter>
						<SheetClose asChild>
							<ConfirmationModal />
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</SheetPortal>
		</Sheet>
	);
};

export default ProfileDrawer;
