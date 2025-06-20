export default function Link({
	href,
	children,
	target,
}: {
	href: string;
	children: React.ReactNode;
	target?: "_blank" | "_self" | "_parent" | "_top";
}) {
	return (
		<a
			target={target}
			rel={target === "_blank" ? "noopener noreferrer" : undefined}
			className="underline text-accentBlue hover:text-accentBlueHovered font-medium"
			href={href}
		>
			{children}
		</a>
	);
}
