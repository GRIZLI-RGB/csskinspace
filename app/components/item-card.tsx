"use client";

import clsx from "clsx";
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";

import { ItemType } from "../utils/types";
import { _cartItems_, _user_ } from "../utils/store";

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

	return (
		<div
			onClick={() => {
				
			}}
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
	);
}
