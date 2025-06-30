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
			// .then(() =>
			// 	setInventory([
			// 		{
			// 			asset: 28960135121,
			// 			base_id: 334,
			// 			chance_to_transfer: 70,
			// 			classid: 5228256059,
			// 			currency_symbol: "€",
			// 			float: "0.2815",
			// 			id: 4082693155,
			// 			img: "https://csgomarket.webalchemy.fun/api/items/image/P2000%20|%20Red%20FragCam%20(Field-Tested)",
			// 			instanceid: 188530139,
			// 			market_hash_name: "P2000 | Red FragCam (Field-Tested)",
			// 			old_price: "24.80",
			// 			paintindex: "275",
			// 			paintseed: "805",
			// 			phase: "",
			// 			price: "3.67",
			// 			rarity: "Field-Tested",
			// 			rarity_color: "#2c479fcc",
			// 			rarity_gradient: {
			// 				from: "#2E2F3F80",
			// 				via: "#2E376533",
			// 				to: "#2c479fcc",
			// 			},
			// 			real_instance: 188530139,
			// 			ru_name:
			// 				"P2000 | Красные фрагменты (После полевых испытаний)",
			// 			ru_rarity: "Армейское качество",
			// 			screenshot:
			// 				"https://csgomarket.webalchemy.fun/api/items/screenshot/P2000%20|%20Red%20FragCam%20(Field-Tested)",
			// 			souvenir: false,
			// 			stamp: "2025-06-21T04:42:42.000000Z",
			// 			stattrack: false,
			// 			stickers: [],
			// 			type: "Pistol",
			// 			wear: "Field-Tested",
			// 			wear_short_name: "FT",
			// 		},
			// 	])
			// )
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
