import clsx from "clsx";

export default function Button({
	text,
	onClick,
	className,
	leftIcon,
	rightIcon,
	disabled = false,
	tooltip,
}: {
	text: string;
	onClick?: () => void;
	className?: string;
	leftIcon?: string;
	rightIcon?: string;
	disabled?: boolean;
	tooltip?: string;
}) {
	return (
		<button
			data-tooltip-hidden={!tooltip}
			data-tooltip-id="default-tooltip"
			data-tooltip-content={tooltip}
			disabled={disabled}
			onClick={() => {
				if (!disabled && typeof onClick === "function") onClick();
			}}
			className={clsx(
				"font-bold rounded-md bg-accentBlue text-sm w-full h-[42px] flex items-center gap-1 justify-center",
				disabled
					? "!opacity-70 !cursor-not-allowed"
					: "hover:bg-accentBlueHovered",
				className
			)}
		>
			{" "}
			{leftIcon && <img src={leftIcon} alt="" />}
			<span>{text}</span>
			{rightIcon && <img src={rightIcon} alt="" />}
		</button>
	);
}
