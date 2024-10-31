import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { MessageCircle, Users, LogOut } from "lucide-react";

const useRoutes = () => {
	const pathname = usePathname();
	const { conversationId } = useConversation();

	const routes = useMemo(
		() => [
			{
				label: "Chat",
				href: "/conversations",
				icon: MessageCircle,
				active: pathname === "/conversations" || !!conversationId,
			},
			{
				label: "Users",
				href: "/users",
				icon: Users,
				active: pathname === "/users",
			},
			{
				label: "LogOut",
				href: "#",
				onClick: () => signOut(),
				icon: LogOut,
			},
		],
		[pathname, conversationId]
	);

	return routes;
};

export default useRoutes;
