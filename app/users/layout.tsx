import SideBar from "@/components/users-components/sidebar";
import getUsers from "../actions/getUsers";
import UsersList from "@/components/users-components/user-list";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
	const users = await getUsers();
	return (
		<SideBar>
			<div className="h-full">
				<UsersList items={users} />
				{children}
			</div>
		</SideBar>
	);
}
