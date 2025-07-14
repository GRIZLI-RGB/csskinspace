"use client";

import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import Image from "next/image";

import Table from "@/app/components/table";
import { getInventory } from "@/app/utils/api";
import { _globalLoading_ } from "@/app/utils/store";
import { ItemType } from "@/app/utils/types";
import FloatBar from "@/app/components/float-bar";

export default function AccountInventoryPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [inventory, setInventory] = useState<ItemType[]>([]);

	useEffect(() => {
		setGlobalLoading(true);

		getInventory()
			.then((res) => setInventory(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getTableData = () => {
		return inventory.map((item) => [
			<div key="id">{item.id}</div>,
			<div key="item" className="flex items-center gap-2">
				<img
					className="max-w-[60px] max-h-[45px] object-cover block"
					src={item.img}
					alt=""
				/>

				<span>{item.market_hash_name.replace(/\s\([^)]+\)$/, "")}</span>

				<Image
					onClick={() => window.open(item.screenshot, "_blank")}
					className="cursor-pointer hover:brightness-150"
					width={16}
					height={16}
					alt="Open skin"
					src="/icons/open.svg"
				/>
			</div>,
			<div key="floath">
				{item.float && item.wear_short_name ? (
					<div className="flex items-center gap-2">
						<span>{+item.float}</span>
						<FloatBar float={+item.float} className="w-[160px]" />
						<span className="text-[#969698]">
							{item.wear_short_name}
						</span>
					</div>
				) : (
					"-"
				)}
			</div>,
			<div key="price" className="text-accent-purple">
				{item.currency_symbol}
				{item.price}
			</div>,
			<div key="availabillity">-</div>,
			<div key="status">Inventory</div>,
		]);
	};

	return (
		<Table
			minWidth="1060px"
			widths={["10%", "27%", "27%", "12%", "12%", "12%"]}
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
					text: "Float",
					align: "left",
				},
				{
					text: "Price",
					align: "left",
				},
				{
					text: "Availabillity",
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
