"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

export type TableProps = {
	headers: {
		text: string;
		align?: "left" | "right" | "center";
	}[];
	className?: string;
	cns?: {
		row?: string;
	};
	widths?: string[];
	data: React.ReactNode[][];
	maxHeight?: string;
	minWidth?: string;
	disableShadow?: boolean;
};

export default function Table({
	headers,
	className,
	cns,
	widths,
	data,
	maxHeight,
	minWidth,
}: TableProps) {
	const tableRef = useRef(null);

	useEffect(() => {
		if (tableRef.current) {
			OverlayScrollbars(
				{ target: tableRef.current },
				{ scrollbars: { autoHide: "never" } }
			);
		}
	}, []);

	return (
		<div
			className={clsx(
				"bg-[#16161D] rounded-2xl pb-2.5 relative overflow-hidden",
				className
			)}
		>
			<div
				className="max-w-full overflow-x-auto custom-scrollbar relative"
				ref={tableRef}
			>
				<div
					style={{
						minWidth,
					}}
					className={clsx(
						"text-secondaryText flex items-center pt-6 pb-2 px-6"
					)}
				>
					{headers.map((header, index) => (
						<div
							style={{
								width: widths
									? widths[index]
									: `${100 / headers.length}%`,
								textAlign: header?.align || "center",
							}}
							key={header.text}
						>
							{header.text}
						</div>
					))}
				</div>

				<div
					className="flex flex-col gap-2 overflow-y-auto hide-scrollbar"
					style={{
						minWidth,
						maxHeight,
					}}
				>
					{data.length > 0 &&
						data.map((row, index) => (
							<div
								className={clsx(
									"px-6 flex items-center w-full min-h-[77px] border-b border-[#121217] last:border-b-0",
									cns?.row
								)}
								key={index}
							>
								{row.map((cell, index) => (
									<div
										className="flex items-center h-full font-medium"
										style={{
											width: widths
												? widths[index]
												: `${100 / row.length}%`,
											justifyContent:
												headers[index]?.align ||
												"center",
										}}
										key={index}
									>
										{cell}
									</div>
								))}
							</div>
						))}

					{!(data.length > 0) && (
						<div
							className={
								"flex-middle text-center font-semibold py-10"
							}
						>
							No data
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
