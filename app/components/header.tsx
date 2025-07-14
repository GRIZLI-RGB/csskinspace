"use client";

import clsx from "clsx";
import { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "motion/react";

import Logo from "./logo";
import data from "../utils/data";
import {
	_cartItems_,
	_globalLoading_,
	_isMobileMenuOpen_,
	_isOpenPurchaseItemsModal_,
	_isOpenReplenishmentModal_,
	_paymentSystems_,
	_searchQuery_,
	_user_,
} from "../utils/store";
import Modal from "./modal";
import {
	buyItems,
	getCurrencies,
	getOauthSteamLink,
	paymentInit,
	setCurrency,
} from "../utils/api";
import { CurrencyType, UserType } from "../utils/types";
import { FiLogOut } from "react-icons/fi";
import Button from "./button";
import Input from "./input";
import Loader from "./loader";

function CurrencySelector() {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [currencies, setCurrencies] = useState<{
		currencies: CurrencyType[];
		current_id: number;
		current_name: string;
		current_symbol: string;
		current_img: string;
	}>();

	const toggleDropdown = () => setIsOpen((prev) => !prev);

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

	useEffect(() => {
		getCurrencies().then((res) => setCurrencies(res.data));
	}, []);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	const changeCurrency = (currencyId: number) => {
		setGlobalLoading(true);

		setCurrency(currencyId)
			.then(() => window.location.reload())
			.catch(() => setGlobalLoading(false));
	};

	if (currencies)
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
						className="w-5 h-5 rounded-full object-cover"
						src={currencies.current_img}
						alt={currencies.current_name}
						quality={100}
						width={20}
						height={20}
					/>
					<span>{currencies.current_name}</span>
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

				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, scale: 1 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 1 }}
							transition={{ duration: 0.2 }}
							className="absolute mt-2 w-full left-0 righ-0 bg-[#2A2C3C] rounded p-1 z-[50]"
						>
							{currencies.currencies.map((currency) => (
								<button
									onClick={() => {
										if (
											currency.id !==
											currencies.current_id
										) {
											changeCurrency(currency.id);
										}
									}}
									key={currency.id}
									className={clsx(
										"flex gap-1 items-center w-full rounded px-4 py-2.5",
										currency.id === currencies.current_id
											? "opacity-50 !cursor-default"
											: "hover:bg-primaryText/5"
									)}
								>
									<Image
										className="rounded-full w-5 h-5 object-cover"
										src={currency.img}
										alt={currency.name}
										width={20}
										height={20}
									/>
									<span className="text-secondaryText font-medium uppercase">
										{currency.name}
									</span>
								</button>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
}

function CartButton({ className }: { className?: string }) {
	const [isOpenCart, setIsOpenCart] = useState(false);

	const setIsMobileMenuOpen = useSetAtom(_isMobileMenuOpen_);
	const setGlobalLoading = useSetAtom(_globalLoading_);

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

	const [cartItems, setCartItems] = useAtom(_cartItems_);

	const user = useAtomValue(_user_);

	const handleRemoveItemFromCart = (id: number) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	const isEnoughMoney =
		user && cartItems.length > 0
			? +user.balance >=
			  cartItems.reduce((acc, item) => +item.price + acc, 0)
			: false;

	const setIsOpenPurchaseItemsModal = useSetAtom(_isOpenPurchaseItemsModal_);

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
							? "brightness-[195%]"
							: "group-hover:brightness-[195%]"
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
						className="max-md:flex-col w-[795px] max-md:w-[320px] overflow-hidden absolute top-full mt-4 right-0 max-md:right-[-60px] rounded-2xl bg-primaryBorder flex justify-between items-start"
					>
						<div className="p-6 pr-1.5 w-full max-md:pl-4">
							{cartItems.length > 0 ? (
								<div className="scrollbar-cart max-h-[192px]">
									<div className="pr-4 max-md:pr-2.5 flex flex-col gap-4">
										{cartItems.map((cartItem) => (
											<div
												key={cartItem.id}
												className="bg-fourthBackground rounded-md w-full max-md:px-2 max-md:py-3 p-[14px] flex items-stretch gap-[14px] justify-between"
											>
												<Image
													className="max-md:w-12 max-md:min-w-12 max-md:self-center"
													quality={100}
													src={cartItem.img}
													alt="Item image"
													width={82}
													height={60}
												/>
												<div className="flex flex-col max-md:text-xs">
													<h6 className="text-accentPurple font-semibold">
														{
															cartItem.market_hash_name
														}
													</h6>
													{cartItem.wear_short_name && (
														<div className="flex items-center gap-1 text-secondaryText">
															<span>
																{
																	cartItem.wear_short_name
																}
															</span>
															<div className="bg-secondaryText w-0.5 h-0.5 rounded-full" />
															<span>
																{cartItem.float ||
																	"-"}
															</span>
														</div>
													)}
													<span className="font-semibold">
														{
															cartItem.currency_symbol
														}
														{cartItem.price}
													</span>
												</div>
												{/* <div className="flex flex-col gap-1">
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
												</div> */}
												<div>
													<button
														onClick={() =>
															handleRemoveItemFromCart(
																cartItem.id
															)
														}
														className="bg-[#363745] flex-middle p-2.5 h-full rounded hover:opacity-75"
													>
														<Image
															className="min-w-2.5"
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
							) : (
								<div className="font-semibold flex-middle py-5 text-center mx-auto">
									Cart is empty
								</div>
							)}
						</div>
						<div className="p-6 bg-fourthBackground min-w-[372px] max-md:min-w-auto">
							<ul>
								{[
									{
										label: "Items",
										value: cartItems.length || 0,
									},
									{
										label: "Total amount",
										value: `${
											user?.currency_symbol || "$"
										}${Number(
											cartItems
												.reduce(
													(acc, item) =>
														acc + +item.price,
													0
												)
												.toFixed(2)
										)}`,
									},
								].map(({ label, value }) => (
									<li
										key={label}
										className="flex items-center justify-between last:border-t last:border-t-[#2C2C3A] bg-[#2E2F3D] first:rounded-t-lg p-3.5 first:pb-2 last:pt-2"
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
									className="text-accentBlue underline hover:text-accentBlueHovered font-semibold"
									href="/privacy-policy"
									target="_blank"
								>
									policy of confidentiality
								</a>
							</p>
							<button
								onClick={() => {
									if (isEnoughMoney) {
										setGlobalLoading(true);

										buyItems(cartItems.map(({ id }) => id))
											.then(() => {
												setIsOpenPurchaseItemsModal(
													true
												);
											})
											.catch(() => alert("Unknown error"))
											.finally(() =>
												setGlobalLoading(false)
											);
									}
								}}
								data-tooltip-hidden={isEnoughMoney}
								data-tooltip-id="default-tooltip"
								data-tooltip-content={"Not enough funds"}
								className={clsx(
									"flex-middle gap-1 rounded w-full text-center bg-accentBlue p-3",
									!isEnoughMoney
										? "opacity-50 !cursor-not-allowed"
										: "hover:bg-accentBlueHovered"
								)}
							>
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
								<button
									onClick={() => setCartItems([])}
									className="mt-2 hover:text-primaryText text-secondaryText text-center text-xs"
								>
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

function SearchBar({ className }: { className?: string }) {
	const [search, setSearch] = useState<{
		query: string;
		focused: boolean;
	}>({
		query: "",
		focused: false,
	});

	const [searchQuery, setSearchQuery] = useAtom(_searchQuery_);

	return (
		<div
			className={clsx(
				"rounded-md flex items-center px-3 h-[42px] max-w-[278px] gap-3 w-full",
				search.focused ? "bg-[#1F202A]" : "bg-secondaryBackground",
				className
			)}
		>
			<Image
				src="/icons/search.svg"
				alt="Search"
				width={20}
				height={20}
			/>
			<input
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
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

function Balance({ className, user }: { className?: string; user: UserType }) {
	const [isOpenReplenishmentModal, setIsOpenReplenishmentModal] =
		useAtom(_isOpenReplenishmentModal_);
	const [isOpenPurchasePaymentModal, setIsOpenPurchasePaymentModal] =
		useState(false);

	// const [currency, setCurrency] = useState<string>("eur");
	// const [isOpenCurrenciesDropdown, setIsOpenCurrenciesDropdown] =
	// 	useState(false);

	// const currenciesRef = useRef<HTMLDivElement>(null);
	// useOnClickOutside(currenciesRef as RefObject<HTMLDivElement>, () =>
	// 	setIsOpenCurrenciesDropdown(false)
	// );

	// const [currencies, setCurrencies] = useState<{
	// 	currencies: CurrencyType[];
	// 	current_id: number;
	// 	current_name: string;
	// 	current_symbol: string;
	// 	current_img: string;
	// }>();

	// useEffect(() => {
	// 	getCurrencies().then((res) => setCurrencies(res.data));
	// }, []);

	const paymentSystems = useAtomValue(_paymentSystems_);
	const [paymentData, setPaymentData] = useState<{
		payment_system: number;
		amount: string;
	}>({
		payment_system: 1,
		amount: "10",
	});
	const [paymentUrl, setPaymentUrl] = useState<string | "error" | null>(null);

	const [localLoading, setLocalLoading] = useState(false);

	const handleProceedToPayment = () => {
		setLocalLoading(true);

		paymentInit({
			payment_system: paymentData.payment_system,
			amount: parseFloat(paymentData.amount),
		})
			.then((res) => {
				const resData: {
					success: boolean;
					transaction_id: number;
					payment_url: string;
				} = res.data;

				if (resData.success) {
					setPaymentUrl(resData.payment_url);
				} else {
					setPaymentUrl("error");
				}
			})
			.finally(() => {
				setIsOpenReplenishmentModal(false);
				setIsOpenPurchasePaymentModal(true);
				setLocalLoading(false);
			});
	};

	return (
		<>
			<div
				className={clsx(
					"bg-thirdyBackground rounded-sm flex items-center gap-2.5 p-1.5 pl-2.5",
					className
				)}
			>
				<span className="font-medium">
					{user.currency_symbol}
					{user.balance}
				</span>
				<button
					onClick={() => setIsOpenReplenishmentModal(true)}
					className="bg-accentBlue hover:bg-accentBlueHovered rounded-sm flex-middle w-[30px] h-[30px]"
				>
					<Image
						quality={100}
						src="/icons/plus.svg"
						width={13}
						height={13}
						alt="Add balance"
					/>
				</button>
			</div>

			{/* Пополнение баланса шаг 1 */}
			<Modal
				className="max-w-[360px]"
				open={isOpenReplenishmentModal}
				onClose={() => setIsOpenReplenishmentModal(false)}
				showCloseButton
			>
				{localLoading && (
					<Loader className="flex-middle py-10" size="sm" />
				)}

				{!localLoading && (
					<>
						<h6 className="uppercase flex items-center gap-2 mb-6">
							<Image
								src="/icons/empty-wallet.svg"
								alt=""
								width={24}
								height={24}
							/>
							<span className="font-bold text-lg">
								Balance top up
							</span>
						</h6>
						{/* <div className="relative" ref={currenciesRef}>
						<button
							onClick={() =>
								setIsOpenCurrenciesDropdown(
									!isOpenCurrenciesDropdown
								)
							}
							className={clsx(
								"rounded-md flex items-center justify-between py-2.5 px-4 w-full",
								isOpenCurrenciesDropdown
									? "bg-[#2A2C3C]"
									: "hover:bg-[#2A2C3C] bg-fourthBackground"
							)}
						>
							<div className="-mt-0.5 pb-0.5">
								<span className="text-[#51525B] text-xs font-medium">
									Select currency
								</span>
								<div className="flex gap-2 items-center">
									<Image
										width={20}
										height={20}
										alt=""
										src={`/images/currencies/${currency}.png`}
									/>
									<span>{currency.toUpperCase()}</span>
								</div>
							</div>
							<Image
								className={clsx(
									isOpenCurrenciesDropdown && "-rotate-180"
								)}
								src="/icons/arrow-down.svg"
								alt=""
								width={14}
								height={14}
							/>
						</button>

						<AnimatePresence>
							{isOpenCurrenciesDropdown && (
								<motion.div
									initial={{ opacity: 0, scale: 1 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 1 }}
									transition={{ duration: 0.2 }}
									className="absolute mt-2 w-full left-0 righ-0 bg-[#2A2C3C] rounded p-1 z-[50]"
								>
									{currencies.currencies.map((item) => (
										<button
											onClick={() => {
												if (
													item.name.toLocaleLowerCase() !==
													currency.toLocaleLowerCase()
												) {
													setCurrency(item.name.toLocaleLowerCase());
													setIsOpenCurrenciesDropdown(
														false
													);
												}
											}}
											key={item}
											className={clsx(
												"flex gap-1 items-center w-full rounded px-4 py-2.5",
												item === currency
													? "opacity-50 !cursor-default"
													: "hover:bg-primaryText/5"
											)}
										>
											<Image
												src={`/images/currencies/${item}.png`}
												alt=""
												width={20}
												height={20}
											/>
											<span className="text-secondaryText font-medium uppercase">
												{item}
											</span>
										</button>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div> */}
						<div className="flex items-stretch gap-2 my-4">
							{paymentSystems.length > 0 &&
								paymentSystems.map((paymentSystem) => (
									<button
										onClick={() =>
											setPaymentData((prev) => ({
												...prev,
												payment_system:
													paymentSystem.id,
											}))
										}
										className={clsx(
											"w-full h-[92px] flex-middle rounded-md max-xs:h-16",
											paymentSystem.id ===
												paymentData.payment_system
												? "!cursor-default bg-[#2B2D40]"
												: "bg-fourthBackground hover:bg-[#2A2C3C]"
										)}
										key={paymentSystem.id}
									>
										<img
											className="block max-w-16"
											alt={paymentSystem.name.toUpperCase()}
											src={paymentSystem.img}
										/>
									</button>
								))}
						</div>
						<Input
							variant="secondary"
							type="number"
							placeholder="Enter amount"
							value={paymentData.amount}
							setValue={(newValue) => {
								setPaymentData((prev) => ({
									...prev,
									amount: newValue,
								}));
							}}
						/>
						<Button
							onClick={handleProceedToPayment}
							className={clsx(
								"mt-6 mb-2",
								(!paymentData.amount ||
									parseFloat(paymentData.amount) < 5) &&
									"opacity-50 pointer-events-none"
							)}
							text="Go to payment"
						/>
						<p className="text-center text-secondaryText font-medium">
							By clicking the button above, you agree to the{" "}
							<a
								className="font-semibold underline text-accentBlue hover:text-accentBlueHovered"
								href="/privacy-policy"
								target="_blank"
							>
								Privacy Policy
							</a>{" "}
							and{" "}
							<a
								className="font-semibold underline text-accentBlue hover:text-accentBlueHovered"
								href="/terms-of-use"
								target="_blank"
							>
								Terms of Use
							</a>
						</p>
					</>
				)}
			</Modal>

			{/* Пополнение баланса шаг 2 */}
			<Modal
				open={isOpenPurchasePaymentModal}
				onClose={() => setIsOpenPurchasePaymentModal(false)}
			>
				<div className="min-w-[360px] text-center max-sm:min-w-0">
					<h6 className="font-bold text-lg uppercase">
						Payment for purchase
					</h6>

					<div className="flex flex-col gap-2 max-w-[360px] mt-2">
						<p className="max-w-[360px] mb-7 text-secondaryText font-medium">
							Click the button below to pay. The payment will be
							credited within 15 minutes. You have 60 minutes to
							pay.
						</p>

						{paymentUrl && paymentUrl !== "error" && (
							<Button
								onClick={() =>
									window.open(paymentUrl, "_blank")
								}
								text="Go to payment"
							/>
						)}

						<p className="text-secondaryText font-medium">
							Please note that the amount exceeding the specified
							value os not eligible for credit or refund.
						</p>
					</div>
				</div>
			</Modal>
		</>
	);
}

function Menu({ className }: { className?: string }) {
	const pathname = usePathname();

	return (
		<nav className={clsx("flex h-full items-center", className)}>
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
							"absolute top-0 w-1/2 rounded-b-sm bg-accentBlue h-1 max-md:hidden",
							pathname === link ? "opacity-100" : "opacity-0"
						)}
					/>
				</div>
			))}
		</nav>
	);
}

function User({ className, user }: { className?: string; user: UserType }) {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	return (
		<div className="flex items-center gap-2">
			<Link
				href="/account/inventory"
				className={clsx(
					"flex gap-2 p-1 bg-thirdyBackground rounded-sm group hover:bg-fourthBackground",
					className
				)}
			>
				<Image
					quality={100}
					className="rounded-sm min-w-[34px]"
					src={user?.avatar_url || "/images/avatar.png"}
					alt="Avatar"
					width={34}
					height={34}
				/>
			</Link>
			<button
				onClick={() => {
					setGlobalLoading(true);
					localStorage.removeItem("token");
					window.location.href = "/";
				}}
				className="aspect-square h-full flex items-center justify-center bg-thirdyBackground rounded-sm hover:bg-fourthBackground group"
				title="Logout"
			>
				<FiLogOut
					className="group-hover:brightness-[195%] text-secondaryText"
					size={16}
				/>
			</button>
		</div>
	);
}

const SteamAuthButton = ({ className }: { className?: string }) => {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	return (
		<button
			onClick={() => {
				setGlobalLoading(true);

				window.location.href = getOauthSteamLink();
			}}
			className={clsx(
				"flex gap-1 items-center h-[42px] px-4 rounded bg-accentBlue hover:bg-accentBlueHovered",
				className
			)}
		>
			<Image
				width={18}
				height={18}
				src="/icons/steam.svg"
				alt="Steam auth button"
			/>

			<span className="text-white font-bold max-xs:hidden">Log in with steam</span>
			<span className="text-white font-bold hidden max-xs:inline-block">Log in</span>
		</button>
	);
};

export default function Header() {
	const user = useAtomValue(_user_);

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(_isMobileMenuOpen_);

	return (
		<div className="relative">
			<header className="px-8 h-[72px] flex items-center justify-between gap-6 z-[100] relative">
				<div className="flex items-center gap-[128px] w-full">
					<Logo />
					<SearchBar className="max-md:hidden" />
				</div>
				<div className="h-full flex items-center gap-8 w-full justify-end">
					<div className="flex items-center h-full max-md:hidden">
						<Menu className="max-md:hidden" />
						{user && <CurrencySelector />}
					</div>
					{user ? (
						<div className="h-[42px] items-stretch flex gap-2">
							<CartButton />
							<Balance user={user} className="max-md:hidden" />
							<User user={user} className="max-md:hidden" />
						</div>
					) : (
						<SteamAuthButton />
					)}
				</div>
				<div
					className="hidden max-md:flex flex-col gap-1 cursor-pointer"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<div
						className={`w-6 h-0.5 rounded-full bg-primaryText ${
							isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
						}`}
					/>
					<div
						className={`w-6 h-0.5 rounded-full bg-primaryText ${
							isMobileMenuOpen ? "opacity-0" : "opacity-100"
						}`}
					/>
					<div
						className={`w-6 h-0.5 rounded-full bg-primaryText ${
							isMobileMenuOpen
								? "-rotate-45 -translate-y-1.5"
								: ""
						}`}
					/>
				</div>
			</header>
			<div
				className={clsx(
					"z-[100] absolute top-[72px] left-0 w-full transform origin-top bg-fourthBackground p-5",
					isMobileMenuOpen
						? "scale-y-100 opacity-100"
						: "scale-y-0 opacity-0 pointer-events-none"
				)}
			>
				<div className="flex flex-col gap-6">
					{user && (
						<div className="flex items-center gap-4">
							<CurrencySelector />
							<Balance user={user} />
							<User user={user} />
						</div>
					)}
					<SearchBar className="w-full max-w-full" />
					<Menu className="!flex-col !items-start !gap-4 !h-auto" />
				</div>
			</div>
			<div
				className={clsx(
					"backdrop-blur-sm fixed top-0 left-0 w-screen h-screen",
					isMobileMenuOpen
						? "opacity-100 z-[10]"
						: "opacity-0 pointer-events-none"
				)}
			/>
		</div>
	);
}
