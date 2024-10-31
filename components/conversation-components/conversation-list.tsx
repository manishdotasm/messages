/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FullConversationType } from "@/app/types";
import useConversation from "@/hooks/useConversation";
import { GroupIcon, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import ConversationBox from "./conversation-box";
import { cn } from "@/lib/utils";
import GroupModal from "./group-modal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
	initialItems: FullConversationType[];
	users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
	const session = useSession();
	const [items, setItems] = useState(initialItems);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const router = useRouter();

	const { conversationId, isOpen } = useConversation();

	const pusherKey = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	useEffect(() => {
		if (!pusherKey) {
			return;
		}

		pusherClient.subscribe(pusherKey);

		const newHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				if (find(current, { id: conversation.id })) {
					return current;
				}

				return [conversation, ...current];
			});
		};

		const updateHandler = (conversation: FullConversationType) => {
			setItems((current) =>
				current.map((currentConversation) => {
					if (currentConversation.id === conversation.id) {
						return {
							...currentConversation,
							messages: conversation.messages,
						};
					}

					return currentConversation;
				})
			);
		};

		const removeHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				return [...current.filter((convo) => convo.id !== conversation.id)];
			});

			if (conversationId === conversation.id) {
				router.push("/conversations");
			}
		};

		pusherClient.bind("conversation:new", newHandler);
		pusherClient.bind("conversation:update", updateHandler);
		pusherClient.bind("conversation:remove", removeHandler);

		return () => {
			pusherClient.unsubscribe(pusherKey);
			pusherClient.unbind("conversation:new", newHandler);
			pusherClient.unbind("conversation:update", updateHandler);
			pusherClient.unbind("conversation:remove", removeHandler);
		};
	}, [pusherKey, conversationId, router]);
	return (
		<aside
			className={cn("fixed inset-y-0 lg:pb-0 lg:left-20 lg:w-80 lg:block pb-20 overflow-y-auto block w-full left-0 border-r-4 border-b-4 border-t-4 border-black bg-white", isOpen ? "hidden" : "block w-full left-0")}
			role="complementary" // Indicates that this is a complementary region
			aria-labelledby="users-list-title" // Associates the heading with the section
			tabIndex={0} // Makes the aside focusable
		>
			<div className="px-5">
				<div className="flex justify-between items-center gap-3 ">
					<h1 id="users-list-title" className="text-2xl font-bold text-black py-4">
						CONVERSATIONS
					</h1>
					<GroupModal users={users} />
				</div>
				{items.map((item: FullConversationType) => (
					<ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
				))}
			</div>
		</aside>
	);
};

export default ConversationList;
