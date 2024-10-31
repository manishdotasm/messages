import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import SidebarAvatar from "./avatar";
import Image from "next/image";
import axios from "axios";

interface SettingsProps {
	currentUser: User;
}

const SettingsModal: React.FC<SettingsProps> = ({ currentUser }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(currentUser?.image);

	const formSchema = z.object({
		name: z.string().min(6, {
			message: "Username must be at least 6 characters.",
		}),
		image: z.string().optional(),
	});

	const { control, handleSubmit, setValue } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: currentUser?.name || "",
			image: currentUser?.image || "/images/placeholder.png",
		},
	});

	const { toast } = useToast();

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setFile(file);

			const previewUrl = URL.createObjectURL(file) as string;
			setPreview(previewUrl);
		}
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);

		try {
			if (!file) return;

			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "rchpw4f2");

			const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
				method: "POST",
				body: formData,
			}).then((r) => r.json());

			setValue("image", response.secure_url!);

			axios
				.post("/api/settings", values)
				.then(() => {
					router.refresh();
				})
				.catch(() => {
					toast({
						title: "Couldn't update your profile!",
						action: <ToastAction altText="Okay">Okay</ToastAction>,
						duration: 2000,
						variant: "destructive",
					});
				})
				.finally(() => setIsLoading(false));
		} catch (error) {
			console.log("ERROR: ", error);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-0 rounded-full">
					<SidebarAvatar user={currentUser} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
				</DialogHeader>
				{/* @ts-expect-error idk what this means */}
				<Form control={control}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-bold">
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Profile Image</FormLabel>
									<FormControl>
										<div className="relative flex items-center gap-3">
											<Image {...field} alt="Profile Image" className="w-12 h-12 rounded-full" width={48} height={48} src={preview || currentUser?.image || "/images/placeholder.png"} />
											<input
												onChange={handleFileChange}
												type="file"
												className="absolute inset-0 opacity-0 cursor-pointer w-12" // Position and hide the input
												id="file-upload"
												accept="image/*" // Restrict to image files
											/>
										</div>
									</FormControl>
									<FormDescription>Click to change your public display image.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="w-full flex justify-end">
							<Button disabled={isLoading}>Save Changes</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default SettingsModal;
