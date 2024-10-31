import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSideBar from "./desktop-sidebar";
import MobileFooter from "./mobile-footer";

async function SideBar({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser();

	return (
		<div className="h-full border-4 border-black">
			<DesktopSideBar currentUser={currentUser!} />
			<MobileFooter />
			<main className="h-full sm:w-full">{children}</main>
		</div>
	);
}

export default SideBar;
