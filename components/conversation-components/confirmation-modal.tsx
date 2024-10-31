"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CircleX, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import useConversation from "@/hooks/useConversation";

const ConfirmationModal = () => {
	const router = useRouter();
	const { conversationId } = useConversation();
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const onDelete = useCallback(() => {
		setIsLoading(true);
		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				router.push("/conversations");
				router.refresh();
			})
			.catch(() => {
				toast({
					title: "Something went wrong!",
					action: <ToastAction altText="Okay">Okay</ToastAction>,
					duration: 2000,
					variant: "destructive",
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [conversationId, router, toast]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"reverse"} className="bg-red-800 text-white" id="dialogTrigger">
					<Trash2 /> Delete{" "}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Delete Conversation</DialogTitle>
					<DialogDescription>Are you sure about this?</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<div className="w-full flex gap-3">
						<Button type="submit" variant={"default"} className="flex-1 bg-red-800 text-white" onClick={onDelete} disabled={isLoading}>
							<Trash2 /> Delete
						</Button>

						<DialogClose>
							<Button variant={"default"} disabled={isLoading}>
								<CircleX /> Cancel
							</Button>
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmationModal;
