"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import Table from "@/app/components/table";
import { getTransactions } from "@/app/utils/api";
import { formatDate } from "@/app/utils/helpers";
import {
	_globalLoading_,
	_searchTransactionId_,
	_user_,
} from "@/app/utils/store";
import { TransactionType } from "@/app/utils/types";

export default function AccountTransactionsPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [transactions, setTransactions] = useState<TransactionType[]>([]);

	const user = useAtomValue(_user_);

	const searchByTransactionId = useAtomValue(_searchTransactionId_);

	useEffect(() => {
		setGlobalLoading(true);

		getTransactions()
			.then((res) => setTransactions(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getTableData = () => {
		return transactions
			.filter((transaction) => {
				return transaction.id
					.toString()
					.toLowerCase()
					.includes(searchByTransactionId.toLowerCase());
			})
			.map((transaction) => [
				<div key="id">{transaction.id}</div>,
				<div key="payment_system">
					{transaction.payment_system_name}
				</div>,
				<div key="amount" className="text-accent-purple">
					{user?.currency_symbol}
					{transaction.sum}
				</div>,
				<div key="status" className="text-[#25f37c]">
					{transaction.status_name}
				</div>,
				<div key="date" className="text-right">
					{formatDate(transaction.created_at, "short")}
				</div>,
			]);
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
					text: "Payment system",
					align: "left",
				},
				{
					text: "Amount",
					align: "left",
				},
				{
					text: "Status",
					align: "left",
				},
				{
					text: "Date",
					align: "left",
				},
			]}
			data={getTableData()}
		/>
	);
}
