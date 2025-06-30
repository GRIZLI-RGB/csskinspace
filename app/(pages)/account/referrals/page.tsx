"use client";

import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import Table from "@/app/components/table";
import { _globalLoading_ } from "@/app/utils/store";
import { ReferralUserType } from "@/app/utils/types";
import { getReferrals } from "@/app/utils/api";
import { formatDate } from "@/app/utils/helpers";

export default function AccountReferralsPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [referrals, setReferrals] = useState<ReferralUserType[]>([]);

	useEffect(() => {
		setGlobalLoading(true);

		getReferrals()
			.then((res) => setReferrals(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getTableData = () => {
		const data = referrals.map((referral) => [
			<div key="id">{referral.id}</div>,
			<div key="user" className="flex items-center gap-2.5">
				<img
					className="max-h-[25px]"
					src="/images/user-avatar.png"
					alt=""
				/>

				<span>{referral.username}</span>
			</div>,
			<div key="income" className="text-[#89EB5B]">
				+ {referral.currency_symbol}
				{referral.ref_balance}
			</div>,
			<div key="date" className="text-right">
				{formatDate(referral.created_at, "short")}
			</div>,
		]);

		return data;
	};

	return (
		<Table
			minWidth="1000px"
			headers={[
				{
					text: "ID",
					align: "left",
				},
				{
					text: "User",
					align: "left",
				},
				{
					text: "Your income",
					align: "left",
				},
				{
					text: "Registration date",
					align: "left",
				},
			]}
			data={getTableData()}
		/>
	);
}
