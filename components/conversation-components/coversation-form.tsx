"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { ImageDown, Send } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./conversation-message-input";
import { Button } from "../ui/button";
import { CldUploadWidget } from "next-cloudinary";

const ConversationForm = () => {
	const { conversationId } = useConversation();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue("message", "", { shouldValidate: true });
		axios.post("/api/messages", {
			...data,
			conversationId,
		});
	};

	interface CloudinaryUploadWidgetInfo {
		secure_url: string;
	}

	function isCloudinaryUploadWidgetInfo(info: string | CloudinaryUploadWidgetInfo): info is CloudinaryUploadWidgetInfo {
		return typeof info === "object" && info !== null && "secure_url" in info;
	}

	return (
		<div className="border-t-[2px] border-black p-4 w-full flex items-center lg:gap-4">
			<CldUploadWidget
				uploadPreset="rchpw4f2"
				options={{ sources: ["local", "url"] }}
				onSuccess={({ info }) => {
					const image = isCloudinaryUploadWidgetInfo(info!) ? info.secure_url : "";
					axios.post("/api/messages", {
						image,
						conversationId,
					});
				}}
			>
				{({ open }) => {
					return (
						<button
							className="button"
							onClick={() => {
								open();
							}}
						>
							<ImageDown />
						</button>
					);
				}}
			</CldUploadWidget>
			<form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-2 w-full">
				<MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
				<Button type="submit" className="rounded-full">
					{" "}
					<Send size={18} />
				</Button>
			</form>
		</div>
	);
};

export default ConversationForm;
