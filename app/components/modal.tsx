"use client";

import clsx from "clsx";
import Image from "next/image";
import { Modal as ReactResponsiveModal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";

export default function Modal({
	open,
	onClose,
	children,
	className,
	showCloseButton = false,
}: {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
	showCloseButton?: boolean;
}) {
	return (
		<ReactResponsiveModal
			focusTrapped={false}
			center
			closeOnEsc
			open={open}
			onClose={onClose}
			showCloseIcon={false}
			closeOnOverlayClick
			classNames={{
				overlay: "!backdrop-blur-xs",
				modal: "!bg-secondaryBackground !rounded-2xl !p-8 max-xs:!p-6",
				modalContainer: "!hide-scrollbar"
			}}
		>
			<div className={clsx("relative", className)}>
				{showCloseButton && (
					<button
						onClick={onClose}
						className="absolute right-0 top-0 hover:opacity-75 bg-[#363745] flex-middle rounded w-8 h-8 max-xs:w-7 max-xs:h-7"
					>
						<Image
							src="/icons/close.svg"
							alt="Close modal"
							width={10}
							height={10}
						/>
					</button>
				)}
				{children}
			</div>
		</ReactResponsiveModal>
	);
}
