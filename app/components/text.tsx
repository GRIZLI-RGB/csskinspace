import clsx from "clsx";

export default function Text({
	children,
	className,
	center = false,
}: {
	children: React.ReactNode;
	className?: string;
	center?: boolean;
}) {
	return (
		<div
			className={clsx(
				"text-secondaryText",
				center && "text-center",
				className
			)}
		>
			{children}
		</div>
	);
}
