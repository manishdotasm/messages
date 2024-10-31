import AuthTabs from "@/components/auth-components/auth";
import AuthHero from "@/components/auth-components/hero";

export default function Home() {
	return (
		<section className="flex min-h-screen flex-col justify-center items-center py-12 px-10 bg-gray-100">
			<AuthHero />
			<AuthTabs />
		</section>
	);
}
