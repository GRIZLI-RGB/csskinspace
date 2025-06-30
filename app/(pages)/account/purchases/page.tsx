"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import Image from "next/image";

import Table from "@/app/components/table";
import { getPurchases } from "@/app/utils/api";
import { _globalLoading_, _user_ } from "@/app/utils/store";
import { PurchaseType } from "@/app/utils/types";
import { formatDate } from "@/app/utils/helpers";

export default function AccountPurchasesPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [purchases, setPurchases] = useState<PurchaseType[]>([]);

	const user = useAtomValue(_user_);

	useEffect(() => {
		setGlobalLoading(true);

		getPurchases()
			.then((res) => setPurchases(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getTableData = () => {
		return purchases.map((purchase) => [
			<div key="id">{purchase.id}</div>,
			<div key="item" className="flex items-center gap-2">
				<img
					className="max-w-[60px] max-h-[45px] object-cover block"
					src={purchase.offer.img}
					alt=""
				/>

				<span>
					{purchase.offer.market_hash_name.replace(
						/\s\([^)]+\)$/,
						""
					)}
				</span>

				<Image
					onClick={() =>
						window.open(purchase.offer.screenshot, "_blank")
					}
					className="cursor-pointer hover:brightness-150"
					width={16}
					height={16}
					alt="Open skin"
					src="/icons/open.svg"
				/>
			</div>,
			<div key="price" className="text-accent-purple">
				{user?.currency_symbol}
				{purchase.offer.price}
			</div>,
			<div key="date" className="text-right">
				{formatDate(purchase.created_at, "short")}
			</div>,
			<div key={"status"}>{purchase.status_name}</div>,
		]);
	};

	return (
		<Table
			minWidth="1060px"
			headers={[
				{
					text: "ID",
					align: "left",
				},
				{
					text: "Item",
					align: "left",
				},
				{
					text: "Price",
					align: "left",
				},
				{
					text: "Date",
					align: "left",
				},
				{
					text: "Status",
					align: "left",
				},
			]}
			data={getTableData()}
		/>
	);
}
