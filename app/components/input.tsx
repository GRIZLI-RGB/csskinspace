"use client";

import clsx from "clsx";
import { useState } from "react";

export default function Input({
	value,
	setValue,
	className,
	placeholder,
	type = "text",
	variant = "primary",
}: {
	value: string;
	setValue: (newValue: string) => void;
	className?: string;
	placeholder?: string;
	type?: "text" | "number" | "email";
	variant?: "primary" | "secondary";
}) {
	const [focused, setFocused] = useState(false);

	return (
		<div
			className={clsx(
				"rounded-md flex items-center px-3 h-[42px] gap-3 w-full",
				focused
					? variant === "primary"
						? "bg-[#1F202A]"
						: "bg-[#1A1B22]"
					: variant === "primary"
					? "bg-secondaryBackground"
					: "bg-[#191920]",
				className
			)}
		>
			<input
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={() => setFocused(false)}
				onFocus={() => setFocused(true)}
				placeholder={placeholder}
				className="font-medium text-xs"
			/>
		</div>
	);
}
