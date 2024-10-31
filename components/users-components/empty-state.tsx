import React from "react";

const EmptyState = () => {
	return (
		<div className="w-full px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-redAccent  border-black">
			<div className="text-center items-center flex flex-col bg-redAccent">
				<h2 className="mt-2 text-2xl font-semibold text-gray-900 bg-redAccent">Select a chat or start a new conversation.</h2>
			</div>
		</div>
	);
};

export default EmptyState;
