import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "./login-card";
import RegisterCard from "./register-card";

const AuthTabs = () => {
	return (
		<Tabs defaultValue="login" className="xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-1/2 my-10" aria-label="Authentication Tabs">
			<TabsList className="grid w-full grid-cols-2 bg-main" role="tablist">
				<TabsTrigger value="login" role="tab" aria-selected="true">
					Login
				</TabsTrigger>
				<TabsTrigger value="register" role="tab" aria-selected="false">
					Register
				</TabsTrigger>
			</TabsList>
			<TabsContent value="login" role="tabpanel" aria-labelledby="login-tab">
				<Card>
					<CardHeader>
						<CardTitle>Log In</CardTitle>
						<CardDescription>Log in to your account.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<LoginCard />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="register" role="tabpanel" aria-labelledby="register-tab">
				<Card>
					<CardHeader>
						<CardTitle>Register</CardTitle>
						<CardDescription>Register a new account.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<RegisterCard />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default AuthTabs;
