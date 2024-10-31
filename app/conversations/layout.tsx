import ConversationList from "@/components/conversation-components/conversation-list";
import SideBar from "@/components/users-components/sidebar";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
	const conversations = await getConversations();
	const users = await getUsers();
	return (
		<SideBar>
			<div className="h-full">
				<ConversationList users={users} initialItems={conversations} />
				{children}
			</div>
		</SideBar>
	);
}
