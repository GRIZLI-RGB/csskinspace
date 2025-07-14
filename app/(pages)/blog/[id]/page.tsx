"use client";

import { useSetAtom } from "jotai";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getBlogArticle, getBlogArticles } from "@/app/utils/api";
import { _globalLoading_ } from "@/app/utils/store";
import { BlogArticleType } from "@/app/utils/types";
import { formatDate, truncateString } from "@/app/utils/helpers";

export default function BlogArticlePage() {
	const { id } = useParams();

	const [article, setArticle] = useState<BlogArticleType | null>(null);
	const [recentArticles, setRecentArticles] = useState<
		BlogArticleType[] | null
	>(null);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		if (id) {
			getBlogArticle(id.toString())
				.then((res) => setArticle(res.data))
				.finally(() => {
					getBlogArticles({ limit: 4 })
						.then((res) => setRecentArticles(res.data.data))
						.finally(() => setGlobalLoading(false));
				});
		} else {
			window.location.href = "/";
		}
	}, [id]);

	if (article) {
		return (
			<div className="py-12 px-5 max-w-[1250px] mx-auto max-md:py-8">
				<article>
					{article.photo_url && (
						<img
							className="block rounded-2xl w-full mb-8 object-cover h-[690px] max-md:h-[25vh]"
							src={article.photo_url.toString()}
							alt=""
						/>
					)}

					<div className="mt-8 mb-2">
						<h1 className="text-[32px] font-semibold max-sm:text-[24px]">
							{article.title}
						</h1>
						<span className="text-[#4E535C]">
							{formatDate(article.created_at)}
						</span>
					</div>

					<div
						className="mt-4 mb-16 text-[#787E87] [&>p]:leading-[120%] [&>p]:my-6 max-sm:[&>p]:text-[12px]"
						dangerouslySetInnerHTML={{
							__html: article.content,
						}}
					/>
				</article>

				{recentArticles && (
					<div className="flex flex-col gap-4">
						<h6 className="flex items-center gap-1 font-semibold text-xl">
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
									d="M14.0246 10.8449C13.7546 11.1149 13.6046 11.6324 13.6946 11.9999L14.2121 14.2574C14.4296 15.1949 14.2946 15.8999 13.8296 16.2374C13.6421 16.3724 13.4171 16.4399 13.1546 16.4399C12.7721 16.4399 12.3221 16.2974 11.8271 16.0049L9.62961 14.6999C9.28461 14.4974 8.71461 14.4974 8.36961 14.6999L6.17211 16.0049C5.33961 16.4924 4.62711 16.5749 4.16961 16.2374C3.99711 16.1099 3.86961 15.9374 3.78711 15.7124L12.9071 6.59242C13.2521 6.24742 13.7396 6.08992 14.2121 6.17242L14.9696 6.29992C15.7646 6.43492 16.2971 6.79492 16.4696 7.31992C16.6346 7.84492 16.4096 8.45242 15.8396 9.02242L14.0246 10.8449Z"
									fill="#3A35FB"
								/>
							</svg>

							<span>Recent blogs</span>
						</h6>

						<div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 w-full max-xs:!grid-cols-1">
							{recentArticles.map((recentArticle) => (
								<Link
									className="bg-[#16161D] rounded-2xl overflow-hidden group hover:brightness-110"
									href={`/blog/${recentArticle.id}`}
									key={recentArticle.id}
								>
									<img
										className="object-cover w-full h-[166px] block"
										src={recentArticle.preview_url.toString()}
										alt=""
									/>

									<div className="p-6">
										<h6 className="text-lg font-semibold mb-2 leading-[120%]">
											{truncateString(
												recentArticle.title
											)}
										</h6>

										<p
											className="break-all text-[#787E87]"
											dangerouslySetInnerHTML={{
												__html: truncateString(
													recentArticle.content,
													128
												),
											}}
										/>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
}
