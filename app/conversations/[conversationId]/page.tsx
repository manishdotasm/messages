import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Body from "@/components/conversation-components/conversation-body";
import Header from "@/components/conversation-components/conversation-header";
import ConversationForm from "@/components/conversation-components/coversation-form";
import EmptyState from "@/components/users-components/empty-state";

interface IParams {
	conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
	const conversation = await getConversationById(params.conversationId);
	const messages = await getMessages(params.conversationId);

	if (!conversation) {
		return (
			<div className="lg:pl-96 lg:ml-4 h-full">
				<div className="h-full flex flex-col">
					<EmptyState />
				</div>
			</div>
		);
	}
	return (
		<div className="lg:pl-96 lg:ml-4 h-full">
			<div className="h-full flex flex-col">
				<Header conversation={conversation} />

				{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
				{/* @ts-expect-error */}
				<Body initialMessages={messages} />
				<ConversationForm />
			</div>
		</div>
	);
};

export default ConversationId;
