/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { CircleAlert, Github } from "lucide-react";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import SocialLogins from "./social-logins";
import { signIn } from "next-auth/react";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

const RegisterCard = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		axios
			.post("/api/register", values)
			.then(() => signIn("credentials", values))
			.catch(() => {
				toast({
					title: "Couldn't register!",
					action: <ToastAction altText="Okay">Okay</ToastAction>,
					duration: 2000,
					variant: "destructive",
				});
			})
			.finally(() => setIsLoading(false));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-bold" aria-labelledby="register-form">
				<h2 id="register-form" className="sr-only">
					Register
				</h2>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="name">Username</FormLabel>
							<FormControl>
								<Input id="name" type="text" placeholder="Enter your username" {...field} disabled={isLoading} aria-describedby="name-description" />
							</FormControl>
							<FormDescription id="name-description">This is your public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="email">Email</FormLabel>
							<FormControl>
								<Input id="email" type="email" placeholder="you@example.com" {...field} disabled={isLoading} aria-describedby="email-description" />
							</FormControl>
							<FormDescription id="email-description">Please enter a valid email address.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="password">Password</FormLabel>
							<FormControl>
								<Input id="password" type="password" placeholder="********" {...field} disabled={isLoading} aria-describedby="password-description" />
							</FormControl>
							<FormDescription id="password-description">Your password must be at least 6 characters.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" variant="default" className="w-full bg-white text-text dark:bg-secondaryBlack dark:text-darkText" disabled={isLoading}>
					{isLoading ? "Submitting..." : "Submit"}
				</Button>
				<SocialLogins />
			</form>
		</Form>
	);
};

export default RegisterCard;
