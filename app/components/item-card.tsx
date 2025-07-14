"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";

import { ItemQualityType, ItemType, WearCategoryType } from "../utils/types";
import { _cartItems_, _user_ } from "../utils/store";
import Modal from "./modal";
import Button from "./button";
import { getItem } from "../utils/api";
import Loader from "./loader";

export default function ItemCard({ item }: { item: ItemType }) {
	const [hovered, setHovered] = useState(false);

	const [cartItems, setCartItems] = useAtom(_cartItems_);
	const isInCart = cartItems.some(({ id }) => id === item.id);

	const toggleCart = () => {
		const updatedCart = isInCart
			? cartItems.filter(({ id }) => id !== item.id)
			: [
					...cartItems,
					{
						id: item.id,
						market_hash_name: item.market_hash_name,
						wear_short_name: item.wear_short_name,
						float: item.float,
						currency_symbol: item.currency_symbol,
						img: item.img,
						price: item.price,
					},
			  ];

		setCartItems(updatedCart);
	};

	const user = useAtomValue(_user_);

	const [itemOpened, setItemOpened] = useState<ItemType | null>(null);
	const [itemLoading, setItemLoading] = useState(true);

	const [isFavorited, setIsFavorited] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("favorites");
		const favorites: number[] = stored ? JSON.parse(stored) : [];
		setIsFavorited(favorites.includes(item.id));
	}, [item.id]);

	const toggleFavorite = () => {
		const stored = localStorage.getItem("favorites");
		let favorites: number[] = stored ? JSON.parse(stored) : [];

		if (favorites.includes(item.id)) {
			favorites = favorites.filter((favId) => favId !== item.id);
			setIsFavorited(false);
		} else {
			favorites.push(item.id);
			setIsFavorited(true);
		}

		localStorage.setItem("favorites", JSON.stringify(favorites));
	};

	const [offers, setOffers] = useState<{
		currency_symbol: string;
		offer: ItemType;
		requested_category: ItemQualityType;
		similar_offers: {
			data: ItemType[];
			total: number;
			current_page: number;
			per_page: number;
			to: number;
			from: number;
			last_page: number;
		};
		wear_categories: WearCategoryType[];
	} | null>(null);

	useEffect(() => {
		setItemLoading(true);

		if (itemOpened) {
			getItem({ id: itemOpened.id })
				.then((res) => setOffers(res.data))
				.catch(() => (window.location.href = "/"))
				.finally(() => setItemLoading(false));
		}
	}, [itemOpened]);

	const handleBuyItem = (itemId: number) => {
		alert(`Item ID: ${itemId}`);
	};

	return (
		<>
			<div
				onClick={() => setItemOpened(item)}
				className={
					"cursor-pointer relative bg-secondaryBackground p-[14px] rounded-md hover:bg-fourthBackground flex flex-col h-[230px] group"
				}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<div
					className={clsx(
						"flex gap-2 h-[18px] w-full",
						item.stickers.length === 0 && "opacity-0"
					)}
				>
					{item.stickers.map((sticker, index) => (
						<img
							className="h-[18px]"
							key={`${sticker.id}-${index}`}
							src={sticker.img}
							alt={sticker.name}
						/>
					))}
				</div>

				<div className="absolute left-[14px] right-[14px] top-[15%] max-h-[104px] group-hover:max-h-[96px] text-center">
					<img
						className="mx-auto w-full block h-full object-cover group-hover:w-[90%]"
						src={item.img}
						alt=""
					/>
				</div>

				<div className="flex flex-col gap-0.5 mt-auto">
					{hovered && (
						<span
							style={{
								color: item.rarity_color,
							}}
							className="font-semibold brightness-[165%]"
						>
							{item.type}
						</span>
					)}

					{item.wear_short_name && (
						<div className="text-secondaryText flex items-center gap-1 text-xs">
							<span>{item.wear_short_name}</span>
							<div className="rounded-full bg-secondaryText w-0.5 h-0.5" />
							<span>{item.float || "-"}</span>
						</div>
					)}

					<div className="font-semibold">
						{item.currency_symbol}
						{item.price}
					</div>
				</div>

				{hovered && (
					<div className="flex gap-px h-[30px] min-h-[30px] rounded overflow-hidden mt-1">
						{user && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									toggleCart();
								}}
								className={clsx(
									"h-full w-full flex-middle",
									isInCart
										? "bg-accentBlue/40 hover:bg-accentBlueHovered"
										: "bg-accentBlue hover:bg-accentBlueHovered"
								)}
							>
								<Image
									className="brightness-[1000%]"
									alt="Add to cart"
									src="/icons/shopping-cart.svg"
									width={16}
									height={16}
								/>
							</button>
						)}
						<button
							onClick={(e) => {
								e.stopPropagation();
								window.open(item.screenshot, "_blank");
							}}
							className={clsx(
								"h-full bg-accentBlue flex-middle hover:bg-accentBlueHovered",
								user ? "w-10" : "w-full"
							)}
						>
							<Image
								alt="Resize image"
								src="/icons/resize.svg"
								width={16}
								height={16}
							/>
						</button>
					</div>
				)}
			</div>

			{/* Выбранный предмет */}
			<Modal
				specialModal="itemOpened"
				showCloseButton={!itemLoading}
				open={itemOpened !== null}
				onClose={() => setItemOpened(null)}
			>
				{itemLoading && (
					<Loader className="flex-middle p-6" size="sm" />
				)}
				{!itemLoading && itemOpened && (
					<div className="flex items-stretch max-lg:flex-col">
						<div className="relative flex-middle p-6 bg-[#16161D] flex-col">
							<img
								className="max-w-[490px] max-h-[364px] block z-10 top-[20%] relative max-md:w-40"
								src={itemOpened.img}
								alt={itemOpened.market_hash_name}
							/>
							<div className="flex gap-2 px-1 z-10 mt-auto max-md:justify-between max-md:gap-4">
								{[
									...itemOpened.stickers.slice(0, 6),
									...Array(
										6 - itemOpened.stickers.length
									).fill(null),
								]
									.slice(0, 6)
									.map((sticker, index) => (
										<div
											key={index}
											className="w-[122px] py-4 max-md:w-8 max-md:py-0"
										>
											<div className="w-12 h-12 max-md:w-full max-md:h-full">
												<img
													src={
														sticker?.img ||
														"/icons/sticker-placeholder.svg"
													}
													alt={sticker?.name || ""}
													className="block w-full h-full object-cover"
												/>
											</div>
										</div>
									))}
							</div>
							<img
								className="absolute"
								src="/images/decorations/background-item-opened.png"
								alt=""
							/>
						</div>
						<div className="flex flex-col gap-1 w-[398px] max-lg:w-full z-[10]">
							<div className="p-6 bg-fourthBackground h-full">
								<h6 className="font-bold text-base">
									{itemOpened.market_hash_name.replace(
										/\s\([^)]+\)$/,
										""
									)}
								</h6>
								<div className="mb-2.5 font-medium text-secondaryText">
									{itemOpened.wear}
								</div>
								<div className="bg-[#2E2F3D] px-4 py-3 rounded-t-lg">
									<div className="flex items-center justify-between">
										<span className="text-secondaryText">
											Float
										</span>
										<span className="text-white font-semibold">
											{itemOpened.float}
										</span>
									</div>
									<div className="relative w-full h-[3px] mt-2">
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
												left: `${Math.min(
													Math.max(
														itemOpened.float * 100,
														0
													),
													100
												)}%`,
											}}
										/>
									</div>
								</div>
								<ul className="mt-1">
									{[
										{
											label: "Type",
											value: itemOpened.type,
										},
										{
											label: "Rarity",
											value: itemOpened.rarity,
										},
									].map(({ label, value }) => (
										<li
											key={label}
											className="flex items-center justify-between last:border-t last:border-t-[#2C2C3A] bg-[#2E2F3D] px-4 py-3 first:pb-2 last:pt-2"
										>
											<span className="text-secondaryText">
												{label}
											</span>
											<span className="text-white font-semibold">
												{value}
											</span>
										</li>
									))}
								</ul>
								<div className="mt-4 mb-2 text-accentBlue font-semibold text-xl leading-[100%]">
									{itemOpened.currency_symbol}
									{itemOpened.price}
								</div>
								<div className="flex items-center gap-2">
									<Button
										onClick={() => {
											if (
												user &&
												+user.balance >= +item.price
											) {
												handleBuyItem(item.id);
											}
										}}
										tooltip={
											!user
												? "Need auth"
												: +user.balance < +item.price
												? "Low balance"
												: undefined
										}
										disabled={
											!user || +user.balance < +item.price
										}
										text="Buy now"
										leftIcon={
											"/icons/shopping-cart-white.svg"
										}
									/>
									<button
										onClick={toggleFavorite}
										className="flex-middle w-[42px] aspect-square min-w-[42px] group bg-[#363745] hover:bg-[#3D3E4E] rounded"
									>
										<Image
											width={18}
											height={18}
											src={`/icons/favorite-${
												isFavorited ? "on" : "off"
											}.svg`}
											alt="Add to favorite"
										/>
									</button>
								</div>
							</div>
							<div className="p-6 bg-fourthBackground h-full">
								<div className="flex items-center justify-between mb-2 -mt-2">
									<span className="font-bold text-base">
										{offers?.similar_offers.data.length}{" "}
										offers
									</span>
									<span className="text-secondaryText">
										{offers?.similar_offers.data.length}{" "}
										offers from {user?.currency_symbol}
										{offers?.similar_offers.data.length
											? Math.min(
													...offers.similar_offers.data.map(
														(o) => Number(o.price)
													)
											  )
											: "—"}
									</span>
								</div>
								<div className="pt-2 relative pr-1 bg-[#2E2F3D] rounded-lg">
									<div className="h-[240px] overflow-y-auto">
										{offers?.similar_offers.data.map(
											(offer) => (
												<div
													key={offer.id}
													className="px-4 flex items-center justify-between h-[54px] border-b border-[#2C2C3A] last:border-b-0"
												>
													<div className="flex items-center gap-2">
														{/* <Image
															width={38}
															height={38}
															alt=""
															src="/icons/unblocked.svg"
														/> */}
														<span className="text-secondaryText">
															Float:
														</span>
														<span className="font-semibold text-white">
															{+offer.float}
														</span>
													</div>
													<div className="flex items-center gap-2">
														<span className="font-semibold">
															{
																offer.currency_symbol
															}
															{+offer.price}
														</span>
														<button
															disabled
															data-tooltip-id="default-tooltip"
															data-tooltip-content={
																"Unavailable"
															}
															className="!cursor-not-allowed opacity-70 flex-middle bg-accentBlue hover1:bg-accentBlueHovered w-[38px] h-[38px] min-w-[38px] rounded"
														>
															<Image
																src="/icons/shopping-cart-white.svg"
																width={18}
																height={18}
																alt=""
															/>
														</button>
													</div>
												</div>
											)
										)}
									</div>
									<img
										className="z-10 absolute left-0 right-0 bottom-0 rounded-b-lg block pointer-events-none"
										alt=""
										src="/images/decorations/blur.png"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</Modal>
		</>
	);
}
