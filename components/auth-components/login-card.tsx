/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { signIn, useSession } from "next-auth/react";
import SocialLogins from "./social-logins";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

const LoginCard = () => {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.status === "authenticated") {
			router.push("/users");
		}
	}, [session?.status, router]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		signIn("credentials", {
			...values,
			redirect: false,
		})
			.then((callback) => {
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
					router.push("/users");
				}
			})
			.finally(() => setIsLoading(false));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-8 font-bold" aria-labelledby="login-form">
				<h2 id="login-form" className="sr-only">
					Login Form
				</h2>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="email">Email</FormLabel>
							<FormControl>
								<Input id="email" type="email" placeholder="ekmas@something.com" {...field} disabled={isLoading} aria-describedby="email-description" />
							</FormControl>
							<FormDescription id="email-description">This is your email.</FormDescription>
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
							<FormDescription id="password-description">Your password must be at least 8 characters.</FormDescription>
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

export default LoginCard;
