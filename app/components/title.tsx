import clsx from "clsx";

export default function Title({
	tag: Tag = "h6",
	center = false,
	children,
	className,
}: {
	tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	center?: boolean;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Tag
			className={clsx(
				center && "text-center",
				"font-semibold",
				Tag === "h1" && "text-[32px] max-sm:text-2xl",
				Tag === "h6" && "text-base max-sm:text-sm",
				className
			)}
		>
			{children}
		</Tag>
	);
}
