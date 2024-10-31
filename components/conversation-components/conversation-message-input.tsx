"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
	placeholder?: string;
	id: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MessageInput: React.FC<MessageInputProps> = ({ placeholder, id, type, required, register, errors }) => {
	return (
		<div className="relative w-full">
			<input id={id} type={type} autoComplete={id} {...register(id, { required })} placeholder={placeholder} className="flex h-10 w-full rounded-base border-2 text-text dark:text-darkText font-base selection:bg-main selection:text-black border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
		</div>
	);
};

export default MessageInput;
