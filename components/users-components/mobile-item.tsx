"use client";

import { cn } from "@/lib/utils";
import { Link } from "../ui/link";

interface MobileItemProps {
	href: string;
	icon: React.ElementType; // Changed from any to React.ElementType for better type safety
	active?: boolean;
	onClick?: () => void;
	label: string; // Added label prop for accessibility
}

const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick, label }) => {
	const handleClick = () => {
		if (onClick) return onClick();
	};

	return (
		<Link
			href={href}
			onClick={handleClick}
			className={cn("leading-6 rounded-none bg-white w-full", active && "bg-main")}
			variant={"noShadow"}
			aria-label={label} // Add aria-label for screen readers
			role="button" // Set role to button for better semantics
			tabIndex={0} // Make it focusable
			onKeyDown={(e) => {
				// Handle Enter key press for accessibility
				if (e.key === "Enter") {
					handleClick();
				}
			}}
		>
			<Icon className="h-6 w-6" aria-hidden="true" /> {/* Hide icon from screen readers */}
			{label} {/* Add visible label */}
		</Link>
	);
};

export default MobileItem;
