import clsx from "clsx";

export default function Title({
	tag: Tag,
	center = false,
	children,
	className,
}: {
	tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	center?: boolean;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Tag
			className={clsx(
				center && "text-center",
				"text-[32px] font-semibold",
				className
			)}
		>
			{children}
		</Tag>
	);
}
