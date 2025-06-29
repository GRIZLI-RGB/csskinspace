import clsx from "clsx";

export default function Button({
	text,
	onClick,
	className,
}: {
	text: string;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				"font-bold rounded-md bg-accentBlue hover:bg-accentBlueHovered text-sm w-full h-[42px]",
				className
			)}
		>
			{text}
		</button>
	);
}
