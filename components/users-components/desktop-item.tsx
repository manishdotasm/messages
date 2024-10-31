"use client";

import { cn } from "@/lib/utils";
import { Link } from "../ui/link";

interface DesktopItemProps {
	label: string; // Still needed for screen reader accessibility
	icon: React.ElementType; // Use React.ElementType for better type safety
	href: string;
	onClick?: () => void;
	active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label, icon: Icon, href, onClick, active }) => {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};

	return (
		<li>
			<Link
				href={href}
				className={cn("leading-6 bg-white", active && "bg-main")}
				variant={"noShadow"}
				onClick={handleClick}
				role="menuitem" // Specify that this is a menu item
				tabIndex={0} // Make it focusable
				onKeyDown={(e) => {
					// Handle Enter key press for accessibility
					if (e.key === "Enter") {
						handleClick();
					}
				}}
				aria-label={label} // Add aria-label for screen reader access
			>
				<Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> {/* Hide icon from screen readers */}
				<span className="sr-only">{label}</span> {/* Visually hidden text for screen readers */}
			</Link>
		</li>
	);
};

export default DesktopItem;
