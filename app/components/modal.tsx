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
	specialModal,
}: {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
	showCloseButton?: boolean;
	specialModal?: "itemOpened";
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
				modal: `!bg-secondaryBackground !rounded-2xl ${
					specialModal === "itemOpened"
						? "!p-0 !max-w-full"
						: "!p-8 max-xs:!p-6"
				}`,
			}}
		>
			<div className={clsx("relative", className)}>
				{showCloseButton && (
					<button
						onClick={onClose}
						className={clsx(
							"absolute hover:opacity-75 bg-[#363745] flex-middle rounded w-8 h-8 max-xs:w-7 max-xs:h-7",
							specialModal === "itemOpened"
								? "right-6 top-6"
								: "right-0 top-0"
						)}
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
