"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { User } from "@prisma/client";
import axios from "axios";
import { UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ToastAction } from "../ui/toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "./select-component";
import { DialogClose } from "@radix-ui/react-dialog";

interface GroupChatModalProps {
	users: User[];
}

const GroupModal: React.FC<GroupChatModalProps> = ({ users = [] }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const { register, handleSubmit, setValue, watch } = useForm<FieldValues>({
		defaultValues: {
			name: "",
			members: [],
		},
	});

	const members = watch("members");

	const { toast } = useToast();
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/conversations", {
				...data,
				isGroup: true,
			})
			.then(() => {
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
				setOpen(false);
			});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"sm"} className="bg-gray-300">
					<UserRoundPlus size={20} className="font-extrabold" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a Group.</DialogTitle>
					<DialogDescription>Assign a group name and add members to the group. </DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<Label htmlFor="name">Group Name</Label>
						<Input
							id="name"
							className="w-full"
							type="text"
							required
							disabled={isLoading}
							{...register("name")} // Register the input
						/>
					</div>
					<div className="w-full">
						<Label htmlFor="select">Select Members</Label>
						<Select
							id="select"
							disabled={isLoading}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							options={users.map((user: any) => ({
								value: user.id,
								label: user.name,
							}))}
							onChange={(value) =>
								setValue("members", value, {
									shouldValidate: true,
								})
							}
							value={members}
						/>
					</div>
					<div className="flex justify-stretch gap-3 w-full mt-4">
						<DialogClose className="">
							<Button disabled={isLoading} className="bg-redAccent w-full">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" disabled={isLoading} className="w-full">
							Create Group
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default GroupModal;
