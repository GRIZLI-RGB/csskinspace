"use client";

import clsx from "clsx";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
	_globalLoading_,
	_isOpenReplenishmentModal_,
	_searchTransactionId_,
	_user_,
} from "@/app/utils/store";
import { editProfile } from "@/app/utils/api";
import Button from "@/app/components/button";

export default function PersonalAccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const user = useAtomValue(_user_);
	const setIsOpenReplenishmentModal = useSetAtom(_isOpenReplenishmentModal_);
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [isEmailEditing, setIsEmailEditing] = useState(false);
	const [newEmail, setNewEmail] = useState("No email");

	const [newTradeUrl, setNewTradeUrl] = useState("");

	const handleSaveNewEmail = () => {
		setGlobalLoading(true);

		editProfile({
			email: newEmail,
		}).finally(() => setGlobalLoading(false));

		setIsEmailEditing(false);
	};

	const handleCancelNewEmail = () => {
		setNewEmail(user?.email || "No email");
		setIsEmailEditing(false);
	};

	const handleSaveNewTradeUrl = () => {
		setGlobalLoading(true);

		editProfile({
			trade_url: newTradeUrl,
		}).finally(() => setGlobalLoading(false));
	};

	useEffect(() => {
		if (user) {
			setNewEmail(user.email || "No email");
			setNewTradeUrl(user.steam_trade_url || "");
		}
	}, [user]);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setGlobalLoading(true);

		try {
			await editProfile({ avatar: file });
		} catch (error) {
			console.error("Avatar load error:", error);
		} finally {
			setGlobalLoading(false);
		}
	};

	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(
			`https://csgomarket.webalchemy.fun?ref=${user?.id}`
		);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const isActiveTab = (item: string) =>
		pathname === `/account/${item.toLowerCase()}`;

	const [focused, setFocused] = useState(false);

	const [searchTransactionId, setSearchTransactionId] = useAtom(
		_searchTransactionId_
	);

	const [isEditingSteamTradeUrl, setIsEditingSteamTradeUrl] = useState(false);

	const isInvalidSteamTradeUrl =
		(user?.steam_trade_url || "") === newTradeUrl ||
		!newTradeUrl.startsWith("https://steamcommunity.com/tradeoffer/new") ||
		!(newTradeUrl.includes("token") && newTradeUrl.includes("partner"));

	if (user) {
		return (
			<>
				<div className="mb-4 flex items-stretch gap-4 max-md:flex-col">
					<div className="bg-[#16161D] rounded-2xl p-6 max-sm:rounded-xl max-sm:p-4 w-full flex gap-4 max-sm:flex-col max-sm:items-center max-sm:text-center">
						<div className="relative group">
							<Image
							quality={100}
								width={112}
								height={112}
								className={`
      block object-cover min-w-[112px] aspect-square rounded-lg 
      cursor-pointer transition-all duration-300
      group-hover:opacity-80 group-hover:ring-2 group-hover:ring-primary-500 max-sm:h-[112px]
    `}
								src={
									user?.avatar_url ||
									"/images/big-user-avatar.png"
								}
								alt="User avatar"
								onClick={handleAvatarClick}
							/>

							<div
								className="
    absolute inset-0 flex items-center justify-center
    opacity-0 group-hover:opacity-100 transition-opacity duration-300
    pointer-events-none
  "
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="text-white drop-shadow-md"
								>
									<path
										d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
										fill="currentColor"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
										fill="currentColor"
									/>
								</svg>
							</div>

							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileChange}
								accept="image/*"
								className="hidden"
							/>
						</div>
						<div className="w-full">
							<div>
								<h6 className="font-semibold text-base">
									{user.username}
								</h6>
								<div className="flex items-center gap-2 max-sm:justify-center">
									{isEmailEditing ? (
										<>
											<input
												type="email"
												className="rounded-md text-[13px] px-2 py-0.5 mt-1.5 border"
												value={newEmail}
												onChange={(e) =>
													setNewEmail(e.target.value)
												}
											/>
											<button
												className="pt-1 text-green-500 text-[13px] font-medium"
												onClick={handleSaveNewEmail}
											>
												Save
											</button>
											<button
												className="pt-1 text-red-500 text-[13px] font-medium"
												onClick={handleCancelNewEmail}
											>
												Cancel
											</button>
										</>
									) : (
										<>
											<span className="text-secondaryText">
												{user.email}
											</span>
											<button
												onClick={() =>
													setIsEmailEditing(true)
												}
												className="bg-[#363745] w-6 h-6 flex-middle rounded group pb-px"
											>
												<Image
													className="group-hover:brightness-200"
													width={14}
													height={14}
													alt="Edit email"
													src="/icons/pencil.svg"
												/>
											</button>
										</>
									)}
								</div>
							</div>
							<div className="mt-4 h-[52px] flex gap-2 max-sm:h-auto max-sm:flex-col">
								<div className="flex flex-col px-4 py-2.5 bg-[#1C1D26] rounded-md w-full">
									<span className="font-medium text-xs text-placeholderText">
										Steam Trade URL
									</span>
									<input
										disabled={!isEditingSteamTradeUrl}
										placeholder="https://steamcommunity.com/tradeoffer/new/?partner=431495871&token=n-M9g5yh"
										className="font-medium"
										type="text"
										value={newTradeUrl}
										onChange={(e) =>
											setNewTradeUrl(e.target.value)
										}
									/>
								</div>
								<Button
									className="h-full !w-auto px-4 whitespace-nowrap max-sm:!h-14"
									text="Get Link"
									onClick={() =>
										window.open(
											"http://steamcommunity.com/my/tradeoffers/privacy",
											"_blank"
										)
									}
								/>
								{isEditingSteamTradeUrl ? (
									<Button
										className="h-full !w-auto px-4 max-sm:!h-14"
										text="Save"
										disabled={isInvalidSteamTradeUrl}
										onClick={handleSaveNewTradeUrl}
									/>
								) : (
									<Button
										className="h-full !w-auto px-4 max-sm:!h-14"
										text="Edit"
										onClick={() =>
											setIsEditingSteamTradeUrl(true)
										}
									/>
								)}
							</div>
						</div>
					</div>
					<div
						className="rounded-2xl p-6 max-sm:rounded-xl max-sm:p-4 min-w-[250px] flex flex-col items-center"
						style={{
							background:
								"url(/images/decorations/account-balance.png) no-repeat center center / cover",
						}}
					>
						<span className="text-base text-secondaryText">
							Balance
						</span>
						<span className="font-semibold text-lg text-accentBlue">
							{user.currency_symbol}
							{+user.balance}
						</span>
						<Button
							onClick={() => setIsOpenReplenishmentModal(true)}
							className="max-w-[154px] mt-2"
							text="Replenish"
							leftIcon="/icons/replenish.svg"
						/>
					</div>
				</div>
				<div className="items-stretch gap-4 grid grid-cols-2 max-md:flex max-md:flex-col">
					<div className="bg-[#16161D] rounded-2xl p-6 max-sm:rounded-xl max-sm:p-4">
						<h6 className="font-semibold text-base mb-2">
							Referral link
						</h6>
						<div className="flex items-stretch h-[52px] gap-2 max-sm:flex-col max-sm:h-auto">
							<div className="flex flex-col px-4 py-2.5 bg-secondaryBackground rounded-md w-full">
								<span className="text-placeholderText text-xs">
									Your link
								</span>
								<span className="text-secondaryText font-medium">{`https://csgomarket.webalchemy.fun?ref=${user.id}`}</span>
							</div>
							<Button
								className="!h-full max-w-[68px] max-sm:!h-14 max-sm:max-w-full"
								text={copied ? "Copied!" : "Copy"}
								onClick={handleCopy}
							/>
						</div>
					</div>
					<div className="bg-[#16161D] rounded-2xl p-6 max-sm:rounded-xl max-sm:p-4 flex gap-2 max-sm:flex-col">
						<ul className="w-full grid grid-cols-3 rounded overflow-hidden bg-[#1D1D27] max-sm:grid-cols-1 max-sm:h-full">
							{[
								{
									label: "Percent",
									value: `${user.ref_percent}%`,
								},
								{
									label: "Referrals",
									value: user.ref_count,
								},
								{
									label: "You’ve arned it",
									value: `${
										user.currency_symbol
									}${+user.ref_balance}`,
								},
							].map(({ label, value }) => (
								<li
									className="last:border-0 border-r-[#16161D] border-r flex flex-col items-center h-20 justify-center max-sm:h-16"
									key={label}
								>
									<span className="text-lg font-semibold text-accentBlue">
										{value}
									</span>

									<span className="font-medium text-xs text-secondaryText">
										{label}
									</span>
								</li>
							))}
						</ul>
						<Button
							tooltip={
								user.ref_count === 0
									? "No referrals"
									: undefined
							}
							disabled={user.ref_count === 0}
							className="!h-full max-w-[95px] max-sm:max-w-full max-sm:!h-14"
							text="Bring out"
						/>
					</div>
				</div>
				<div className="mt-8 mb-4 flex justify-between items-center max-xs:flex-col max-xs:gap-2">
					<div className="flex gap-2 items-center max-xs:flex-col max-xs:gap-1 max-xs:items-center max-xs:justify-center max-xs:w-full">
						{[
							"Inventory",
							"Transactions",
							"Purchases",
							"Referrals",
						].map((item) => (
							<Link
								href={`/account/${item.toLowerCase()}`}
								key={item}
								className={clsx(
									"h-[52px] inline-flex gap-1 items-center px-4 relative rounded-md border max-xs:w-full max-xs:flex",
									isActiveTab(item)
										? "border-[#474769] !cursor-default"
										: "border-[#20202A] hover:border-[#2b2a5a] hover:!bg-[linear-gradient(90deg,#14132D_0%,#16161D_100%)]"
								)}
								style={{
									background: isActiveTab(item)
										? "linear-gradient(90deg, #25235C 0%, #16161D 100%)"
										: "#16161D",
								}}
							>
								<Image
									width={16}
									height={16}
									className={clsx(
										isActiveTab(item) && "brightness-200"
									)}
									src={`/icons/account/menu/${item.toLowerCase()}.svg`}
									alt={item}
								/>

								<span
									className={clsx(
										"font-semibold",
										isActiveTab(item)
											? "text-white"
											: "text-secondaryText"
									)}
								>
									{item}
								</span>
							</Link>
						))}
					</div>
					{pathname === "/account/transactions" && (
						<div
							className={clsx(
								"flex items-center gap-3 rounded-md px-[14px] h-[52px] max-xs:w-full",
								focused
									? "bg-[#1F202A]"
									: "bg-secondaryBackground"
							)}
						>
							<Image
								width={20}
								height={20}
								src="/icons/search.svg"
								alt="Search transaction by ID"
							/>
							<input
								value={searchTransactionId}
								onChange={(e) =>
									setSearchTransactionId(e.target.value)
								}
								type="text"
								placeholder="Transaction ID"
								onBlur={() => setFocused(false)}
								onFocus={() => setFocused(true)}
							/>
						</div>
					)}
				</div>
				{children}
			</>
		);
	}
}
