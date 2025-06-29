import clsx from "clsx";

export default function Loader({
	className,
	size = "md",
	fullScreen = false,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	fullScreen?: boolean;
}) {
	return (
		<div
			className={clsx(
				fullScreen &&
					"flex-middle w-screen h-screen fixed top-0 left-0 bg-primaryBackground z-[999]",
				className
			)}
		>
			<div
				className={clsx(
					"border-t-transparent border-primaryText rounded-full animate-spin",
					size === "sm" && "w-8 h-8 border-2",
					size === "md" && "w-16 h-16 border-4",
					size === "lg" && "w-24 h-24 border-8"
				)}
			/>
		</div>
	);
}
