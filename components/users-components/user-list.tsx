"use client";

import { User } from "@prisma/client";
import UserBox from "./user-box";

interface UsersListProps {
	items: User[];
}

const UsersList: React.FC<UsersListProps> = ({ items }) => {
	return (
		<aside
			className="fixed inset-y-0 lg:pb-0 lg:left-20 lg:w-80 lg:block pb-20 overflow-y-auto block w-full left-0 border-t-4 border-b-4 border-r-4 bg-white  border-black"
			role="complementary" // Indicates that this is a complementary region
			aria-labelledby="users-list-title" // Associates the heading with the section
			tabIndex={0} // Makes the aside focusable
		>
			<div className="px-5">
				<div className="flex-col">
					<h1 id="users-list-title" className="text-2xl font-bold text-black py-4">
						PEOPLE
					</h1>
				</div>
				{items.length > 0 ? (
					items.map((item) => <UserBox key={item.id} data={item} />)
				) : (
					<p className="text-gray-500">No users available.</p> // Provides feedback if there are no items
				)}
			</div>
		</aside>
	);
};

export default UsersList;
