"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";

import { BlogArticleType } from "@/app/utils/types";
import { _globalLoading_ } from "@/app/utils/store";
import { getBlogArticles } from "@/app/utils/api";
import { formatDate, truncateString } from "@/app/utils/helpers";
import Title from "@/app/components/title";

export default function BlogPage() {
	const [articles, setArticles] = useState<BlogArticleType[] | null>(null);
	const [popularArticles, setPopularArticles] = useState<
		BlogArticleType[] | null
	>(null);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		getBlogArticles({
			limit: 5,
			most_viewed: true,
		})
			.then((res) => setPopularArticles(res.data))
			.finally(() => {
				(async () => {
					try {
						const firstPage = await getBlogArticles({
							page: 1,
							limit: 10,
						});
						const totalPages = firstPage.data.last_page;
						const allArticles = [...firstPage.data.data];

						for (let page = 2; page <= totalPages; page++) {
							const res = await getBlogArticles({
								page,
								limit: 10,
							});
							allArticles.push(...res.data.data);
						}

						setArticles(allArticles);
					} finally {
						setGlobalLoading(false);
					}
				})();
			});
	}, []);

	return (
		<>
			<Title tag="h1" center>
				Blog
			</Title>
			<div className="flex items-start gap-8 mt-2 max-sm:gap-4 max-sm:flex-col">
				<div className="grid grid-cols-2 gap-4 max-sm:gap-3">
					{(articles || []).map((article) => (
						<Link
							className="rounded-2xl overflow-hidden group bg-[#16161D] hover:brightness-110"
							href={`/blog/${article.id}`}
							key={article.id}
						>
							<img
								className="max-sm:h-[180px] w-full h-[252px] object-cover"
								src={article.preview_url.toString()}
								alt=""
							/>

							<div className="p-6">
								<h6 className="font-semibold text-lg leading-[120%]">
									{truncateString(article.title)}
								</h6>

								<p
									className="break-all text-[#787E87] mt-2"
									dangerouslySetInnerHTML={{
										__html: truncateString(
											article.content,
											128
										),
									}}
								/>
							</div>
						</Link>
					))}
				</div>

				{popularArticles && (
					<div className="w-[282px] shrink-0 flex flex-col gap-4 max-sm:gap-3 max-sm:w-full">
						<h6 className="flex items-center gap-1 text-xl font-semibold">
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									opacity="0.4"
									d="M4.30404 12C4.38654 11.6325 4.23654 11.1075 3.97404 10.845L2.15154 9.0225C1.58154 8.4525 1.35654 7.845 1.52154 7.32C1.69404 6.795 2.22654 6.435 3.02154 6.3L5.36154 5.91C5.69904 5.85 6.11154 5.55 6.26904 5.2425L7.55904 2.655C7.93404 1.9125 8.44404 1.5 8.99904 1.5C9.55404 1.5 10.064 1.9125 10.439 2.655L11.729 5.2425C11.8265 5.4375 12.029 5.625 12.2465 5.7525L4.16904 13.83C4.06404 13.935 3.88404 13.8375 3.91404 13.6875L4.30404 12Z"
									fill="#3A35FB"
								/>
								<path
									d="M14.0246 10.845C13.7546 11.115 13.6046 11.6325 13.6946 12L14.2121 14.2575C14.4296 15.195 14.2946 15.9 13.8296 16.2375C13.6421 16.3725 13.4171 16.44 13.1546 16.44C12.7721 16.44 12.3221 16.2975 11.8271 16.005L9.62961 14.7C9.28461 14.4975 8.71461 14.4975 8.36961 14.7L6.17211 16.005C5.33961 16.4925 4.62711 16.575 4.16961 16.2375C3.99711 16.11 3.86961 15.9375 3.78711 15.7125L12.9071 6.5925C13.2521 6.2475 13.7396 6.09 14.2121 6.1725L14.9696 6.3C15.7646 6.435 16.2971 6.795 16.4696 7.32C16.6346 7.845 16.4096 8.4525 15.8396 9.0225L14.0246 10.845Z"
									fill="#3A35FB"
								/>
							</svg>

							<span>Popular blogs</span>
						</h6>

						{popularArticles.map((article) => (
							<Link
								href={`/blog/${article.id}`}
								key={article.id}
								className="rounded-2xl bg-[#16161D] p-[14px] group hover:brightness-110"
							>
								<div className="font-semibold">
									{truncateString(article.title)}
								</div>

								<div
									className="break-words text-xs text-[#787E87] mt-2 mb-4"
									dangerouslySetInnerHTML={{
										__html: truncateString(
											article.content,
											128
										),
									}}
								/>

								<div className="text-[10px] text-[#4E535C]">
									{formatDate(article.created_at)}
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
}
