"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";

import { ItemType } from "../utils/types";
import { _cartItems_, _user_ } from "../utils/store";
import Modal from "./modal";
import Button from "./button";

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
				showCloseButton
				open={itemOpened !== null}
				onClose={() => setItemOpened(null)}
			>
				{itemOpened && (
					<div className="flex items-stretch">
						<div className="relative flex-middle p-6 bg-[#16161D]">
							<img
								className="max-w-[490px] max-h-[364px] block z-10"
								src={itemOpened.img}
								alt={itemOpened.market_hash_name}
							/>
							{/* TODO: Stickers */}
							<img
								className="absolute"
								src="/images/decorations/background-item-opened.png"
								alt=""
							/>
						</div>
						<div className="flex flex-col gap-1.5">
							<div className="p-6 bg-fourthBackground h-full">
								<h6 className="font-bold text-base">
									{itemOpened.market_hash_name.replace(
										/\s\([^)]+\)$/,
										""
									)}
								</h6>
								<div className="mt-2 mb-4 font-medium text-secondaryText">
									{itemOpened.wear}
								</div>
								<div className="bg-[#2E2F3D] p-4 rounded-t-lg">
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
											className="flex items-center justify-between last:border-t last:border-t-[#2C2C3A] bg-[#2E2F3D] p-4 first:pb-2 last:pt-2"
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
								<div className="mt-4 mb-2 text-accentBlue font-semibold text-xl">
									{itemOpened.currency_symbol}
									{itemOpened.price}
								</div>
								<div className="flex items-center gap-2">
									<Button
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
								Right bottom
							</div>
						</div>
					</div>
				)}
			</Modal>
		</>
	);
}
