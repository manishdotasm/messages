"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface Props {
	src?: string | null;
	isOpen?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onOpenChange: any;
}

const ImageModal: React.FC<Props> = ({ isOpen, src, onOpenChange }) => {
	if (!src) return null;
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="w-fit h-fit bg-main p-2">
				<Image src={src} alt="Image" className="object-cover" height="800" width="800" />{" "}
			</DialogContent>
		</Dialog>
	);
};

export default ImageModal;
