import clsx from "clsx";

export default function FloatBar({
	float,
	className,
	widthFull = false,
}: {
	float: number;
	className?: string;
	widthFull?: boolean;
}) {
	return (
		<div
			className={clsx(
				"relative h-[3px]",
				widthFull && "w-full",
				className
			)}
		>
			<div
				className="absolute left-0 top-0 h-full bg-[#3F95E2]"
				style={{ width: "7.07%" }}
			/>
			<div
				className="absolute left-[7.07%] top-0 h-full bg-[#3BE07A]"
				style={{ width: "7.07%" }}
			/>
			<div
				className="absolute left-[14.14%] top-0 h-full bg-[#FACF33]"
				style={{ width: "15.15%" }}
			/>
			<div
				className="absolute left-[29.29%] top-0 h-full bg-[#FA9D40]"
				style={{ width: "15.15%" }}
			/>
			<div
				className="absolute left-[44.44%] top-0 h-full bg-[#FF4B4C]"
				style={{ width: "55.56%" }}
			/>

			<div
				className="absolute -top-[5px] -translate-x-1/2 h-3 w-1.5 rounded-full bg-white border-[2px] border-black"
				style={{
					left: `${Math.min(Math.max(float * 100, 0), 100)}%`,
				}}
			/>
		</div>
	);
}
