"use client";

import clsx from "clsx";
import { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAtom, useSetAtom } from "jotai";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "motion/react";

import Logo from "./logo";
import data from "../utils/data";
import {
	_cartItems_,
	_isMobileMenuOpen_,
	// _isOpenPurchaseItemsModal_,
	// _user_,
} from "../utils/store";

function CurrencySelector() {
	const [currentCurrency, setCurrentCurrency] = useState<"eur" | "gbp">(
		"eur"
	);
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleCurrencyChange = (currency: "eur" | "gbp") => {
		setCurrentCurrency(currency);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="px-2.5 relative" ref={wrapperRef}>
			<button
				className={clsx(
					"flex items-center gap-1 font-medium hover:text-primaryText group",
					isOpen ? "text-primaryText" : "text-secondaryText"
				)}
				onClick={toggleDropdown}
			>
				<Image
					src={`/images/currencies/${currentCurrency}.png`}
					quality={100}
					width={20}
					height={20}
					alt=""
				/>
				<span>{currentCurrency.toUpperCase()}</span>
				<Image
					src="/icons/arrow-down.svg"
					width={14}
					height={14}
					alt=""
					className={clsx(
						"group-hover:brightness-200",
						isOpen && "rotate-180 brightness-200"
					)}
				/>
			</button>

			{isOpen && (
				<div className="absolute top-full left-0 mt-2 w-32 bg-secondaryBackground border border-primaryBorder shadow-lg rounded-md z-10 overflow-hidden">
					{(["eur", "gbp"] as const)
						.filter((currency) => currency !== currentCurrency)
						.map((currency) => (
							<button
								key={currency}
								onClick={() => handleCurrencyChange(currency)}
								className={`flex items-center gap-2 w-full px-3 py-2 text-left ${
									currency === currentCurrency
										? "bg-primaryBackground !cursor-default"
										: "text-secondaryText hover:text-primaryText hover:bg-primaryBackground"
								}`}
							>
								<Image
									src={`/images/currencies/${currency}.png`}
									width={20}
									height={20}
									alt={currency}
								/>
								<span className="uppercase">{currency}</span>
							</button>
						))}
				</div>
			)}
		</div>
	);
}

function CartButton({ className }: { className?: string }) {
	const [isOpenCart, setIsOpenCart] = useState(false);

	const setIsMobileMenuOpen = useSetAtom(_isMobileMenuOpen_);

	const cartRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(cartRef as RefObject<HTMLDivElement>, () =>
		setIsOpenCart(false)
	);

	useEffect(() => {
		if (!isOpenCart) return;

		let lastScrollTop =
			window.pageYOffset || document.documentElement.scrollTop;

		const handleScroll = () => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;

			if (scrollTop > lastScrollTop + 10) {
				setIsOpenCart(false);
			}

			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isOpenCart]);

	const [cartItems] = useAtom(_cartItems_);

	// const user = useAtomValue(_user_);

	// const handleRemoveItemFromCart = (id: number) => {
	// 	setCartItems(cartItems.filter((item) => item.id !== id));
	// };

	// const isEnoughMoney =
	// 	user && cartItems.length > 0
	// 		? +user.balance >=
	// 		  cartItems.reduce((acc, item) => +item.price + acc, 0)
	// 		: false;

	// const setIsOpenPurchaseItemsModal = useSetAtom(_isOpenPurchaseItemsModal_);

	return (
		<div className={clsx("relative h-full", className)} ref={cartRef}>
			<button
				onClick={() => {
					setIsMobileMenuOpen(false);
					setIsOpenCart(!isOpenCart);
				}}
				className="w-[42px] min-w-[42px] bg-thirdyBackground rounded-sm relative flex-middle group h-full"
			>
				<Image
					className={clsx(
						isOpenCart
							? "brightness-200"
							: "group-hover:brightness-200"
					)}
					src="/icons/shopping-cart.svg"
					alt="Shopping cart"
					width={18}
					height={18}
				/>
				<div className="absolute right-2 bottom-1.5 bg-accentBlue w-[14px] h-[14px] rounded-sm flex-middle font-medium text-[8px] leading-[100%]">
					{cartItems.length}
				</div>
			</button>
			<AnimatePresence>
				{isOpenCart && (
					<motion.div
						initial={{ opacity: 0, scale: 1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1 }}
						transition={{ duration: 0.2 }}
						className="w-[795px] overflow-hidden absolute top-full mt-4 right-0 rounded-2xl bg-primaryBorder flex justify-between items-start"
					>
						<div className="p-6 pr-1.5 w-full">
							<div className="scrollbar-cart max-h-[192px]">
								<div className="pr-4 flex flex-col gap-4">
									{[
										{ id: 1 },
										{ id: 2 },
										{ id: 3 },
										{ id: 4 },
										{ id: 5 },
										{ id: 6 },
									].map((cartItem) => (
										<div
											key={cartItem.id}
											className="bg-fourthBackground rounded-md w-full p-[14px] flex items-stretch gap-[14px] justify-between"
										>
											<Image
												quality={100}
												src="/images/sticker.png"
												alt=""
												width={82}
												height={60}
											/>
											<div className="flex flex-col">
												<h6 className="text-accentPurple font-semibold">
													Sticker | huNter- | Copen
												</h6>
												<div className="flex items-center gap-1 text-secondaryText">
													<span>FN</span>
													<div className="bg-secondaryText w-0.5 h-0.5 rounded-full" />
													<span>0.0185</span>
												</div>
												<span className="font-semibold">
													€0.01
												</span>
											</div>
											<div className="flex flex-col gap-1">
												{[...new Array(4)].map(
													(_, index) => (
														<Image
															quality={100}
															key={index}
															width={16}
															height={12}
															src="/images/mini-sticker.png"
															alt=""
														/>
													)
												)}
											</div>
											<div>
												<button className="bg-[#363745] flex-middle p-2.5 h-full rounded hover:opacity-75">
													<Image
														src="/icons/close.svg"
														alt="Close cart"
														width={10}
														height={10}
													/>
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="p-6 bg-fourthBackground min-w-[369px]">
							<ul>
								{[
									{
										label: "Items",
										value: 2,
									},
									{
										label: "Total amount",
										value: "€16,502.29",
									},
								].map(({ label, value }) => (
									<li
										key={label}
										className="flex items-center justify-between last:border-t last:border-t-[#2C2C3A] bg-[#2E2F3D] first:rounded-t-lg p-4 first:pb-2 last:pt-2"
									>
										<span className="text-secondaryText">
											{label}
										</span>
										<span className="font-semibold">
											{value}
										</span>
									</li>
								))}
							</ul>
							<p className="text-center text-xs text-secondaryText my-4">
								By buying skins, i agree with the{" "}
								<a
									className="text-accentBlue underline hover:brightness-90"
									href="/privacy-policy"
									target="_blank"
								>
									policy of confidentiality
								</a>
							</p>
							<button className="flex-middle gap-1 rounded w-full text-center bg-accentBlue p-3 hover:opacity-75">
								<Image
									className="brightness-200"
									src="/icons/shopping-cart.svg"
									alt="Buy now"
									width={18}
									height={18}
								/>
								<span className="text-white font-bold">
									Buy now
								</span>
							</button>
							<div className="flex-middle">
								<button className="mt-2 hover:text-primaryText text-secondaryText text-center text-xs">
									Empty the shopping cart
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function SearchBar() {
	const [search, setSearch] = useState<{
		query: string;
		focused: boolean;
	}>({
		query: "",
		focused: false,
	});

	return (
		<div
			className={
				"rounded-md flex items-center px-3 h-[42px] max-w-[278px] gap-3 w-full bg-secondaryBackground"
			}
		>
			<Image
				className={clsx(search.focused && "brightness-200")}
				src="/icons/search.svg"
				alt="Search"
				width={20}
				height={20}
			/>
			<input
				value={search.query}
				onChange={(e) =>
					setSearch((prev) => ({
						...prev,
						query: e.target.value,
					}))
				}
				onBlur={() =>
					setSearch((prev) => ({
						...prev,
						focused: false,
					}))
				}
				onFocus={() =>
					setSearch((prev) => ({
						...prev,
						focused: true,
					}))
				}
				placeholder="CS2 Skin Search"
				className="font-medium text-xs"
			/>
		</div>
	);
}

export default function Header() {
	const pathname = usePathname();

	return (
		<header className="px-8 h-[72px] flex items-center justify-between gap-6">
			<div className="flex items-center gap-[128px] w-full">
				<Logo />
				<SearchBar />
			</div>
			<div className="h-full flex items-center gap-8 w-full justify-end">
				<div className="flex items-center h-full">
					<nav className="flex h-full items-center">
						{data.header.navigation.map(({ link, text }) => (
							<div
								key={text}
								className="px-2.5 relative h-full items-center flex justify-center"
							>
								<Link
									className={clsx(
										"font-medium hover:text-primaryText",
										pathname === link
											? "text-primaryText !cursor-default"
											: "text-secondaryText"
									)}
									href={link}
								>
									{text}
								</Link>

								<div
									className={clsx(
										"absolute top-0 w-1/2 rounded-b-sm bg-accentBlue h-1",
										pathname === link
											? "opacity-100"
											: "opacity-0"
									)}
								/>
							</div>
						))}
					</nav>
					<CurrencySelector />
				</div>
				<div className="h-[42px] items-stretch flex gap-2">
					<CartButton />
					<div className="bg-thirdyBackground rounded-sm flex items-center gap-2.5 p-1.5 pl-2.5">
						<span className="font-medium">€16,502.50</span>
						<button className="bg-accentBlue rounded-sm flex-middle w-[30px] h-[30px] hover:opacity-75">
							<Image
								quality={100}
								src="/icons/plus.svg"
								width={13}
								height={13}
								alt="Add balance"
							/>
						</button>
					</div>
					<button className="flex gap-2 p-1 bg-thirdyBackground rounded-sm pr-2 group">
						<Image
							className="rounded-sm min-w-[34px]"
							src="/images/avatar.png"
							alt="Avatar"
							width={34}
							height={34}
						/>
						<Image
							className="group-hover:brightness-200"
							src="/icons/arrow-down.svg"
							alt=""
							width={14}
							height={14}
						/>
					</button>
				</div>
			</div>
		</header>
	);
}
