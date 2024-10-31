"use client";

import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "./desktop-item";
import { User } from "@prisma/client";
import SettingsModal from "./settings-modal";

interface DesktopSideBarProps {
	currentUser: User;
}

const DesktopSideBar: React.FC<DesktopSideBarProps> = ({ currentUser }) => {
	const routes = useRoutes();

	return (
		<div className="hidden h-full lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-bg border-4 border-black lg:pb-4 lg:flex lg:flex-col justify-between">
			<nav className="mt-4 flex flex-col justify-between">
				<ul role="list" className="flex flex-col items-center space-y-1">
					{routes.map((item) => (
						<DesktopItem key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} onClick={item.onClick} />
					))}
				</ul>
			</nav>
			<nav className="mt-4 flex flex-col justify-between items-center">
				<SettingsModal currentUser={currentUser} />
			</nav>
		</div>
	);
};

export default DesktopSideBar;
