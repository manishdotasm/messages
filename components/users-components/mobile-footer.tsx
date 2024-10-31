"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./mobile-item";

const MobileFooter = () => {
	const routes = useRoutes();
	const { isOpen } = useConversation();

	if (isOpen) return null;

	return (
		<div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-bg border-t-[1px] lg:hidden">
			{routes.map((item) => (
				<MobileItem key={item.label} label={item.label} href={item.href} icon={item.icon} active={item.active} onClick={item.onClick} />
			))}
		</div>
	);
};

export default MobileFooter;
