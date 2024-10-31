import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import Link from "next/link"; // Import Link from next/link
import { cn } from "@/lib/utils";

const linkVariants = cva("inline-flex items-center text-text justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
	variants: {
		variant: {
			default: "bg-main border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none",
			noShadow: "bg-main border-2 border-border dark:border-darkBorder",
			neutral: "bg-white dark:bg-secondaryBlack dark:text-darkText border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none",
			reverse: "bg-main border-2 border-border dark:border-darkBorder hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-light dark:hover:shadow-dark",
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 px-3",
			lg: "h-11 px-8",
			icon: "h-10 w-10",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
	asChild?: boolean;
	href: string; // Ensure href is included
}

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, variant, size, asChild = false, href, ...props }, ref) => {
	const Comp = asChild ? Slot : Link; // Use Link as the default component

	return (
		<Comp
			href={href} // Pass the href prop to Link
			className={cn(linkVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});

CustomLink.displayName = "CustomLink";

export { CustomLink as Link, linkVariants };
