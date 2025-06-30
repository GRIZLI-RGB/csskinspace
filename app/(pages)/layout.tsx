"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Tooltip } from "react-tooltip";
import Image from "next/image";

import Header from "../components/header";
import Footer from "../components/footer";
import {
	editProfile,
	getOauthSteamLink,
	getPaymentSystems,
	getUser,
} from "../utils/api";
import { UserType } from "../utils/types";
import {
	_globalLoading_,
	_isOpenPurchaseItemsModal_,
	_paymentSystems_,
	_user_,
} from "../utils/store";
import Loader from "../components/loader";
import Modal from "../components/modal";
import Input from "../components/input";
import Button from "../components/button";

import "react-tooltip/dist/react-tooltip.css";

export default function PagesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const globalLoading = useAtomValue(_globalLoading_);
	const setUser = useSetAtom(_user_);

	const [firstRegistrationData, setFirstRegistrationData] = useState<{
		tradeUrl: string;
		email: string;
	}>({
		tradeUrl: "",
		email: "",
	});
	const [isOpenFirstRegistrationModal, setIsOpenFirstRegistrationModal] =
		useState(false);

	const [localLoading, setLocalLoading] = useState(false);

	const [isOpenPurchaseItemsModal, setIsOpenPurchaseItemsModal] = useAtom(
		_isOpenPurchaseItemsModal_
	);

	const setPaymentSystems = useSetAtom(_paymentSystems_);

	useEffect(() => {
		const refId = searchParams.get("ref");
		const tokenFromUrl = searchParams.get("token");
		const savedToken = localStorage.getItem("token");

		const token = tokenFromUrl || savedToken;

		if (tokenFromUrl) {
			localStorage.setItem("token", tokenFromUrl);
		}

		if (!token && pathname.startsWith("/account")) {
			router.replace("/not-found");
			return;
		}

		if (!token) {
			if (refId) {
				window.location.href = getOauthSteamLink(refId);
			} else {
				return;
			}
		}

		if (!refId) {
			getUser()
				.then((res) => {
					const user: UserType = res.data;

					setUser(user);

					if (!user.steam_trade_url || !user.email) {
						setIsOpenFirstRegistrationModal(true);
					} else {
						getPaymentSystems().then((resp) =>
							setPaymentSystems(resp.data)
						);
					}
				})
				.catch(() => {
					setUser(null);

					localStorage.removeItem("token");

					if (pathname.startsWith("/account")) {
						router.replace("/not-found");
					}
				})
				.finally(() => {
					if (tokenFromUrl) router.replace("/");
				});
		}
	}, [pathname, searchParams, router]);

	return (
		<>
			{globalLoading && <Loader fullScreen />}

			<Tooltip
				id="default-tooltip"
				style={{
					zIndex: 999999,
					backgroundColor: "#1c1d26",
					color: "#dedede",
				}}
			/>

			<div className="flex flex-col min-h-screen">
				<Header />
				<main
					className={clsx(
						"flex-1 max-sm:py-12",
						pathname === "/"
							? "px-8 pt-6 pb-16"
							: "container pt-[50px] pb-[100px]"
					)}
				>
					{children}
				</main>
				<Footer />
			</div>

			{/* Ввод Trade URL и email при первом входе */}
			<Modal
				open={isOpenFirstRegistrationModal}
				onClose={() => {
					if (!localLoading) {
						localStorage.removeItem("token");
						window.location.reload();
					}
				}}
			>
				<div className="min-w-[450px] text-center max-sm:min-w-0">
					{localLoading && (
						<Loader size="sm" className="py-12 flex-middle" />
					)}

					{!localLoading && (
						<>
							<h6 className="font-semibold text-[22px] uppercase">
								Enter your trade URL and email
							</h6>

							<p className="text-secondaryText text-[13px] mb-6">
								To continue, please enter your trade URL and
								email address
							</p>

							<div className="flex flex-col gap-2 mb-4">
								<Input
									variant="secondary"
									placeholder="Steam Trade URL"
									value={firstRegistrationData.tradeUrl}
									setValue={(newValue) =>
										setFirstRegistrationData({
											...firstRegistrationData,
											tradeUrl: newValue,
										})
									}
								/>

								<Input
									variant="secondary"
									type="email"
									placeholder="Email"
									value={firstRegistrationData.email}
									setValue={(newValue) =>
										setFirstRegistrationData({
											...firstRegistrationData,
											email: newValue,
										})
									}
								/>
							</div>

							<Button
								className={clsx(
									(!firstRegistrationData.tradeUrl.startsWith(
										"https://steamcommunity.com/tradeoffer/new"
									) ||
										!(
											firstRegistrationData.tradeUrl.includes(
												"token"
											) &&
											firstRegistrationData.tradeUrl.includes(
												"partner"
											)
										) ||
										!firstRegistrationData.email.includes(
											"@"
										) ||
										firstRegistrationData.email.length <
											6) &&
										"pointer-events-none brightness-50"
								)}
								text="Confirm"
								onClick={() => {
									setLocalLoading(true);

									editProfile({
										email: firstRegistrationData.email,
										trade_url:
											firstRegistrationData.tradeUrl,
									})
										.then(() => {
											window.location.href =
												"/account/inventory";
										})
										.catch(() => {
											alert("Check the entered fields");
											setLocalLoading(false);
										});
								}}
							/>
						</>
					)}
				</div>
			</Modal>

			{/* Куплен предмет(ы) */}
			<Modal
				open={isOpenPurchaseItemsModal}
				onClose={() => setIsOpenPurchaseItemsModal(false)}
			>
				<div className="min-w-[360px] text-center max-sm:min-w-0">
					<h6 className="font-bold text-lg uppercase">
						Buying items
					</h6>

					<div className="relative pt-4 pb-8 flex-middle">
						<Image
							style={{
								filter: "drop-shadow(0px 0px 48px rgba(58, 53, 251, 0.48))",
							}}
							width={56}
							height={56}
							src="/icons/bag.svg"
							alt="Bag"
						/>
					</div>

					<div className="text-base font-bold">
						Payment successful
					</div>

					<p className="text-secondaryText font-medium text-[13px] mt-1 mb-4">
						Items successfilly purchased
						<br />
						Go to your personal account to get items
					</p>

					<Button
						text="Go to personal account"
						onClick={() =>
							(window.location.href = "/account/inventory")
						}
					/>
				</div>
			</Modal>
		</>
	);
}
