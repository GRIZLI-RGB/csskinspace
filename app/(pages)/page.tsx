"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useDebounceValue } from "usehooks-ts";
import Image from "next/image";

import { ApiGetItemsType, ItemType } from "../utils/types";
import { _globalLoading_, _searchQuery_ } from "../utils/store";
import { getItemFilters, getItems } from "../utils/api";
import FilterDropdown from "../components/filter-dropdown";
import ItemCard from "../components/item-card";

interface FiltersState {
	types: string[];
	phases: string[];
	price_min: string;
	price_max: string;
	wears: string[];
	rarities: string[];
	float_min: string;
	float_max: string;
	stattrack?: boolean;
	souvenir?: boolean;
	stickers?: number[];
}

// const FilterByType = ({ className }: { className?: string }) => {
// 	return (
// 		<section
// 			className={clsx(
// 				"flex gap-2.5 border-b border-[#1b212e] p-[18px] max-lg:gap-1",
// 				className
// 			)}
// 		>
// 			{[
// 				"Knife",
// 				"Gun",
// 				"Rifle",
// 				"AWP",
// 				"Submachine",
// 				"Shotgun",
// 				"Machinegun",
// 				"Gloves",
// 				"Sticker",
// 				"Other",
// 			].map((item) => (
// 				<DesiredItemDropdown
// 					className="max-lg:max-w-[200px] max-xs:!max-w-none"
// 					text={item}
// 					key={item}
// 					options={[
// 						{
// 							id: "1",
// 							name: "Karambit",
// 							image: "/images/knife.png",
// 						},
// 						{
// 							id: "2",
// 							name: "Knife",
// 							image: "/images/knife.png",
// 						},
// 					]}
// 					onSelect={(option) => console.log("Selected:", option)}
// 				/>
// 			))}
// 		</section>
// 	);
// };

export default function HomePage() {
	// const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [items, setItems] = useState<ItemType[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const bottomRef = useRef(null);

	const searchQuery = useAtomValue(_searchQuery_);
	const [searchQueryDebounced] = useDebounceValue(searchQuery, 800);

	const [filters, setFilters] = useState<FiltersState>({
		types: [],
		phases: [],
		price_min: "",
		price_max: "",
		wears: [],
		rarities: [],
		float_min: "",
		float_max: "",
	});

	const [debouncedFilters] = useDebounceValue(filters, 500);

	const [filtersData, setFiltersData] = useState({
		types: [],
		phases: [],
		min_price: "0",
		max_price: "0",
		wears: [],
		rarities: [],
		float_min: 0,
		float_max: 1,
	});

	useEffect(() => {
		const loadFilters = async () => {
			try {
				const res = await getItemFilters();
				setFiltersData(res.data);
			} catch (err) {
				console.error("Failed to load filters", err);
			}
		};

		loadFilters();
	}, []);

	useEffect(() => {
		if (!bottomRef.current || !hasMore || loading) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) fetchItems();
			},
			{ rootMargin: "200px" }
		);

		observer.observe(bottomRef.current);
		return () => observer.disconnect();
	}, [hasMore, loading]);

	useEffect(() => {
		setHasMore(true);
		fetchItems(true);
	}, [debouncedFilters, searchQueryDebounced]);

	const fetchItems = useCallback(
		async (isNewSearch = false) => {
			if (loading || !hasMore) return;

			setLoading(true);
			const targetPage = isNewSearch ? 1 : page;

			try {
				const apiFilters: ApiGetItemsType = { page: targetPage };

				if (filters.types.length > 0) apiFilters.types = filters.types;
				if (filters.phases.length > 0)
					apiFilters.phases = filters.phases;
				if (filters.price_min)
					apiFilters.price_min = parseFloat(filters.price_min);
				if (filters.price_max)
					apiFilters.price_max = parseFloat(filters.price_max);
				if (filters.wears.length > 0) apiFilters.wears = filters.wears;
				if (filters.rarities.length > 0)
					apiFilters.rarities = filters.rarities;
				if (filters.float_min)
					apiFilters.float_min = parseFloat(filters.float_min);
				if (filters.float_max)
					apiFilters.float_max = parseFloat(filters.float_max);
				if (filters.stattrack !== undefined)
					apiFilters.stattrack = filters.stattrack;
				if (filters.souvenir !== undefined)
					apiFilters.souvenir = filters.souvenir;

				if (searchQueryDebounced)
					apiFilters.search = searchQueryDebounced;

				const res = await getItems(apiFilters);

				setItems((prev) =>
					isNewSearch ? res.data.data : [...prev, ...res.data.data]
				);
				setHasMore(res.data.data.length > 0);
				setPage(targetPage + 1);
			} catch (err) {
				console.error("Ошибка загрузки:", err);
			} finally {
				setLoading(false);
				setGlobalLoading(false);
			}
		},
		[page, filters, searchQueryDebounced, hasMore, loading]
	);

	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		const hidden = localStorage.getItem("bannerHidden");
		setShowBanner(hidden !== "true");
	}, []);

	const closeBanner = () => {
		setShowBanner(false);
		localStorage.setItem("bannerHidden", "true");
	};

	return (
		<>
			<div className="flex items-start gap-7 max-sm:flex-col">
				<section className="max-sm:w-full w-[283px] shrink-0">
					<div className="flex items-center justify-between gap-2">
						<div className="flex gap-2 items-center">
							<img src="/icons/settings.svg" alt="" />
							<span className="font-bold">Filters</span>
						</div>

						<button
							className="text-[#535357] font-medium hover:text-primaryText"
							onClick={() => {
								setFilters({
									types: [],
									phases: [],
									price_min: "",
									price_max: "",
									wears: [],
									rarities: [],
									float_min: "",
									float_max: "",
								});
								setItems([]);
								setPage(1);
								setHasMore(true);
							}}
						>
							Reset
						</button>
					</div>

					{/* <div className="mt-8 mb-6">
						<label className="text-secondaryText block mb-2">
							Price ($)
						</label>
						<div className="flex items-center gap-2.5 h-[42px]">
							<input
								className="rounded bg-secondaryBackground h-full text-center w-full focus:bg-[#1F202A]"
								type="number"
								placeholder="Min"
							/>
							<div className="h-0.5 bg-secondaryText rounded-full w-[14px] min-w-[14px]" />
							<input
								className="rounded bg-secondaryBackground h-full text-center w-full focus:bg-[#1F202A]"
								type="number"
								placeholder="Max"
							/>
						</div>
					</div> */}

					<div className="mt-8 mb-6">
						<FilterDropdown
							onlyOpen
							defaultOpen
							variant="price"
							min={filtersData.min_price}
							max={filtersData.max_price}
							selectedMin={filters.price_min}
							selectedMax={filters.price_max}
							onChangeRange={(min, max) =>
								setFilters({
									...filters,
									price_min: min,
									price_max: max,
								})
							}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<FilterDropdown
							variant="type"
							options={filtersData.types}
							selected={filters.types}
							onChange={(selected) =>
								setFilters({
									...filters,
									types: selected as string[],
								})
							}
						/>

						<FilterDropdown
							variant="float"
							min={filtersData.float_min}
							max={filtersData.float_max}
							selectedMin={filters.float_min}
							selectedMax={filters.float_max}
							onChangeRange={(min, max) =>
								setFilters({
									...filters,
									float_min: min,
									float_max: max,
								})
							}
						/>

						<FilterDropdown
							variant="quality"
							options={filtersData.wears}
							selected={filters.wears}
							onChange={(selected) =>
								setFilters({
									...filters,
									wears: selected as string[],
								})
							}
						/>

						{/* <FilterDropdown
							variant="phase"
							options={filtersData.phases}
							selected={filters.phases}
							onChange={(selected) =>
								setFilters({
									...filters,
									phases: selected as string[],
								})
							}
						/> */}

						<FilterDropdown
							variant="rarity"
							options={filtersData.rarities}
							selected={filters.rarities}
							onChange={(selected) =>
								setFilters({
									...filters,
									rarities: selected as string[],
								})
							}
						/>

						<FilterDropdown
							variant="hold"
							options={["StatTrak™", "Souvenir"]}
							selected={[
								...(filters.stattrack ? ["StatTrak™"] : []),
								...(filters.souvenir ? ["Souvenir"] : []),
							]}
							onChange={(selected) =>
								setFilters({
									...filters,
									stattrack: selected.includes("StatTrak™"),
									souvenir: selected.includes("Souvenir"),
								})
							}
						/>
					</div>
				</section>

				<section className="w-full relative">
					<div
						className="
	grid grid-cols-9 gap-1
	max-[400px]:grid-cols-1
	max-[520px]:grid-cols-2
	max-[768px]:grid-cols-3
	max-[1168px]:grid-cols-4
	max-[1520px]:grid-cols-6
	max-h-[850px] overflow-auto hide-scrollbar
"
					>
						{!loading && showBanner && (
							<div
								className="
		col-span-4
		max-[1168px]:col-span-3
		max-[768px]:col-span-2
		max-[520px]:col-span-1
		rounded-md overflow-hidden relative max-h-[230px]
	"
							>
								<img
									src="/images/banner.png"
									className="w-full h-full block object-cover rounded-md"
									alt="Banner"
								/>
								<button
									onClick={closeBanner}
									className="absolute rounded w-8 h-8 flex items-center justify-center bg-[#363745] right-[14px] top-[14px] hover:opacity-75"
								>
									<Image
										src="/icons/close.svg"
										alt="Close banner"
										width={10}
										height={10}
									/>
								</button>
							</div>
						)}

						{items.map((item, index) => (
							<ItemCard key={`${item.id}-${index}`} item={item} />
						))}

						{loading && (
							<div className="font-semibold text-[16px] 4w-full text-center p-4">
								Loading...
							</div>
						)}

						<div ref={bottomRef} className="w-full h-4" />
					</div>

					{!loading && (
						<img
							className="z-[5] absolute left-0 right-0 bottom-0 pointer-events-none"
							src="/images/decorations/items-shadow.png"
							alt=""
						/>
					)}
				</section>
			</div>
		</>
	);
}
