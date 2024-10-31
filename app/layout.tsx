import "./globals.css";
import "typeface-montserrat";
import { Toaster } from "@/components/ui/toaster";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "@/components/users-components/active-status";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Messages",
	description: "Messaging application",
	icons: {
		icon: ["./favicon.ico"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AuthContext>
					<Toaster />
					<ActiveStatus />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
