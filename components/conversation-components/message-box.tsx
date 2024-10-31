"use client";

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SidebarAvatar from "../users-components/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ImageModal from "./image-modal";
import { useState } from "react";

interface MessageBoxProps {
	data: FullMessageType;
	isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
	const session = useSession();
	const [imageModalOpen, setImageModelOpen] = useState(false);
	const isOwn = session?.data?.user?.email === data?.sender?.email;
	const seenList = (data.seen || [])
		.filter((user) => user.email !== data?.sender?.email)
		.map((user) => user.name)
		.join(", ");

	const container = cn("flex gap-3 py-2 px-4 items-start w-full pr-5", isOwn && "justify-end  pl-10");
	const avatar = cn(isOwn && "hidden");
	const body = cn("flex flex-col gap-2 max-w-full", isOwn && "items-end");
	const name = cn(isOwn && "hidden");

	return (
		<div className={container} role="region" aria-label={`Message from ${data.sender.name}`}>
			<div className={avatar}>
				<SidebarAvatar user={data.sender} />
			</div>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="flex flex-col max-w-64 md:max-w-md lg:max-w-lg" role="button" tabIndex={0} aria-haspopup="true">
							<Alert variant={isOwn ? "destructive" : "default"} className="">
								<AlertTitle className={avatar}>
									<div className="flex items-center gap-1 text-sm font-normal">
										<div className={name}>{data.sender.name}</div>
									</div>
								</AlertTitle>
								<AlertDescription className={body}>
									<ImageModal src={data.image} isOpen={imageModalOpen} onOpenChange={setImageModelOpen} />
									<div className="max-w-full break-words">{data.image ? <Image onClick={() => setImageModelOpen(true)} alt={`Image from ${data.sender.name}`} height="288" width="288" src={data.image} className="object-cover cursor-pointer hover:scale-110 transition" role="img" /> : <div className="font-bold">{data.body}</div>}</div>
								</AlertDescription>
							</Alert>
							<div className="text-xs text-gray-500 text-right mt-1" aria-live="polite">
								{format(new Date(data.createdAt), "p")}
							</div>
						</div>
					</TooltipTrigger>
					{isLast && isOwn && seenList.length > 0 && (
						<TooltipContent>
							<div role="tooltip">{seenList.length > 0 && <div>{`Seen by ${seenList}`}</div>}</div>
						</TooltipContent>
					)}
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export default MessageBox;
