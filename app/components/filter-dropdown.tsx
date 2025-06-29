"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect, memo } from "react";

interface FilterDropdownProps {
	variant: string;
	options?: string[];
	min?: number | string;
	max?: number | string;
	selected?: string[];
	selectedMin?: string;
	selectedMax?: string;
	onChange?: (selected: string[]) => void;
	onChangeRange?: (min: string, max: string) => void;
	defaultOpen?: boolean;
	onlyOpen?: boolean;
}

function FilterDropdown({
	variant,
	options = [],
	min = 0,
	max = 100,
	selected = [],
	selectedMin = "",
	selectedMax = "",
	onChange,
	onChangeRange,
	defaultOpen = false,
	onlyOpen = false,
}: FilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [localSelected, setLocalSelected] = useState<string[]>(selected);
	const [localMin, setLocalMin] = useState(selectedMin);
	const [localMax, setLocalMax] = useState(selectedMax);

	useEffect(() => {
		if (defaultOpen) setIsOpen(true);
	}, [defaultOpen]);

	function arraysEqual(a: string[], b: string[]) {
		if (a === b) return true;
		if (a.length !== b.length) return false;
		return a.every((val, i) => val === b[i]);
	}

	useEffect(() => {
		if (
			!arraysEqual(localSelected, selected) ||
			localMin !== selectedMin ||
			localMax !== selectedMax
		) {
			setLocalSelected(selected);
			setLocalMin(selectedMin || "");
			setLocalMax(selectedMax || "");
		}
	}, [selected, selectedMin, selectedMax]);

	const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^[0-9]*\.?[0-9]*$/.test(value)) {
			onChangeRange?.(value, selectedMax);
		}
	};

	const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^[0-9]*\.?[0-9]*$/.test(value)) {
			onChangeRange?.(selectedMin, value);
		}
	};

	const handleBlur = () => {
		const validate = (value: string, defaultVal: string): string => {
			if (value === "") return "";
			const num = parseFloat(value);
			return isNaN(num)
				? defaultVal
				: Math.max(Number(min), Math.min(num, Number(max))).toString();
		};

		const validatedMin = validate(localMin, min.toString());
		const validatedMax = validate(localMax, max.toString());

		setLocalMin(validatedMin);
		setLocalMax(validatedMax);
		onChangeRange?.(validatedMin, validatedMax);
	};

	const toggleItem = (item: string) => {
		const newSelected = localSelected.includes(item)
			? localSelected.filter((i) => i !== item)
			: [...localSelected, item];

		setLocalSelected(newSelected);
		onChange?.(newSelected);
	};

	// Вспомогательные функции
	const getVariantTitle = () => {
		const titles: Record<string, string> = {
			type: "Type",
			price: "Price ($)",
			float: "Float",
			quality: "Quality",
			phase: "Phase",
			rarity: "Rarity",
			hold: "Hold",
			stickers: "Stickers",
			other: "Other",
		};
		return (
			titles[variant] ||
			variant.charAt(0).toUpperCase() + variant.slice(1)
		);
	};

	const getColorForRarity = (rarity: string) => {
		const colors: Record<string, string> = {
			"Consumer Grade": "#b0c3d9",
			"Industrial Grade": "#5e98d9",
			"Mil-Spec Grade": "#4b69ff",
			Restricted: "#8847ff",
			Classified: "#d32ce6",
			Covert: "#eb4b4b",
			Contraband: "#e4ae39",
		};
		return colors[rarity] || "#ffffff";
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={clsx(
					"h-[34px] flex items-center justify-between w-full",
					onlyOpen && "!cursor-default pointer-events-none"
				)}
			>
				<span
					className={clsx(
						isOpen && !onlyOpen
							? "text-primaryText"
							: "text-secondaryText"
					)}
				>
					{getVariantTitle()}
				</span>
				{!onlyOpen && (
					<Image
						className={clsx(
							isOpen && "-rotate-180 brightness-[190%]"
						)}
						width={14}
						height={14}
						src={"/icons/arrow-down.svg"}
						alt="Open"
					/>
				)}
			</button>

			{/* <div className="flex flex-col gap-3">
				<div>
					<label className="block text-xs text-[#6b7280] mb-1">
						Min value
					</label>
					<div className="relative">
						<input
							type="text"
							inputMode="decimal"
							value={localMin}
							onChange={handleMinChange}
							onBlur={handleBlur}
							onKeyDown={(e) => e.key === "Enter" && handleBlur()}
							placeholder={`From ${min}`}
							className="w-full bg-[#11151e] rounded-md px-3 py-2 text-sm pr-8"
						/>
						{localMin && (
							<button
								onClick={() => {
									setLocalMin("");
									onChangeRange?.("", localMax);
								}}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#6b7280] hover:text-white"
							>
								×
							</button>
						)}
					</div>
					{localMin && isNaN(parseFloat(localMin)) && (
						<p className="text-red-500 text-xs mt-1">
							Invalid number format
						</p>
					)}
				</div>

				<div>
					<label className="block text-xs text-[#6b7280] mb-1">
						Max value
					</label>
					<div className="relative">
						<input
							type="text"
							inputMode="decimal"
							value={localMax}
							onChange={handleMaxChange}
							onBlur={handleBlur}
							onKeyDown={(e) => e.key === "Enter" && handleBlur()}
							placeholder={`To ${max}`}
							className="w-full bg-[#11151e] rounded-md px-3 py-2 text-sm pr-8"
						/>
						{localMax && (
							<button
								onClick={() => {
									setLocalMax("");
									onChangeRange?.(localMin, "");
								}}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#6b7280] hover:text-white"
							>
								×
							</button>
						)}
					</div>
					{localMax && isNaN(parseFloat(localMax)) && (
						<p className="text-red-500 text-xs mt-1">
							Invalid number format
						</p>
					)}
				</div>
			</div> */}

			<div className={clsx(isOpen ? "block" : "hidden")}>
				{variant === "price" || variant === "float" ? (
					<div>
						<div className="flex items-center gap-2.5 h-[42px]">
							<input
								type="text"
								inputMode="decimal"
								value={localMin}
								onChange={handleMinChange}
								onBlur={handleBlur}
								onKeyDown={(e) =>
									e.key === "Enter" && handleBlur()
								}
								className="rounded bg-secondaryBackground h-full text-center w-full focus:bg-[#1F202A]"
								placeholder="Min"
							/>
							<div className="h-0.5 bg-secondaryText rounded-full w-[14px] min-w-[14px]" />
							<input
								type="text"
								inputMode="decimal"
								value={localMax}
								onChange={handleMaxChange}
								onBlur={handleBlur}
								onKeyDown={(e) =>
									e.key === "Enter" && handleBlur()
								}
								className="rounded bg-secondaryBackground h-full text-center w-full focus:bg-[#1F202A]"
								placeholder="Max"
							/>
						</div>
						{variant === "float" && (
							<div className="mt-2 text-[#43454D] text-xs">
								Range: 0 - 1
							</div>
						)}
					</div>
				) : (
					options.map((option) => (
						<button
							key={option}
							onClick={() => toggleItem(option)}
							className="h-[34px] flex items-center w-full gap-2 group"
							style={{
								color:
									variant === "rarity"
										? getColorForRarity(option)
										: "#787e87",
							}}
						>
							<div
								className={clsx(
									"rounded-full w-[18px] h-[18px] flex-middle border",
									localSelected.includes(option)
										? "border-accentBlue bg-accentBlue"
										: "border-[#363744] group-hover:border-accentBlue"
								)}
							>
								<div
									className={clsx(
										"w-2 h-2 rounded-full",
										localSelected.includes(option)
											? "bg-white opacity-100"
											: "opacity-0"
									)}
								/>
							</div>
							<span>{option}</span>
						</button>
					))
				)}
			</div>
		</div>
	);
}

export default memo(FilterDropdown);
