import Image from "next/image";

const AuthHero = () => {
	return (
		<div className="sm:mx-auto sm:w-full">
			<Image
				src="/images/messages.svg"
				alt="Illustration of messages"
				height={40} // Adjusted height for better visibility
				width={40} // Adjusted width for better visibility
				className="mx-auto w-20"
				role="img" // Specify the role for clarity
			/>
			<h1 className="mt-6 text-center text-4xl font-extrabold tracking-tight" role="heading" aria-level={1}>
				AUTHENTICATION
			</h1>
		</div>
	);
};

export default AuthHero;
