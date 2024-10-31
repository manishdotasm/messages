import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";

const SocialLogins = () => {
	const { toast } = useToast();

	const socialAction = (action: string) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		signIn(action, { redirect: false }).then((callback: any) => {
			if (callback?.error) {
				toast({
					title: "Invalid Credentials!",
					action: <ToastAction altText="Okay">Okay</ToastAction>,
					duration: 2000,
				});
			}

			if (callback?.ok && !callback?.error) {
				toast({
					title: "Logged In!",
					action: <ToastAction altText="Okay">Okay</ToastAction>,
					duration: 2000,
				});
			}
		});
	};

	return (
		<div className="w-full">
			<Separator className="w-full" orientation="horizontal" />
			<div className="w-full flex justify-center my-1 mt-3">
				<span>Sign in with</span>
			</div>
			<div className="flex gap-10 w-full">
				<Button
					onClick={() => socialAction("github")}
					variant="reverse"
					type="button"
					className="w-full bg-gray-300 text-text dark:bg-secondaryBlack dark:text-darkText"
					aria-label="Sign in with GitHub" // Provides additional context for screen readers
				>
					<Github aria-hidden="true" /> {/* Hides the icon from screen readers */}
					<span className="sr-only">GitHub</span> {/* Visually hidden text for screen readers */}
					GitHub {/* Visible text for all users */}
				</Button>
			</div>
		</div>
	);
};

export default SocialLogins;
