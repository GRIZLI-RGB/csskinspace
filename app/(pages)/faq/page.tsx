"use client";

import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
	AccordionItemState,
} from "react-accessible-accordion";

import Title from "@/app/components/title";

import "react-accessible-accordion/dist/fancy-example.css";
import data from "@/app/utils/data";
import Image from "next/image";
import clsx from "clsx";

export default function FaqPage() {
	return (
		<div className="container">
			<Title className="mb-8" center tag="h1">
				Frequently Asked Questions
			</Title>
			<Accordion allowZeroExpanded allowMultipleExpanded>
				{data.faq.map(({ question, answer }) => (
					<AccordionItem className="not-last:mb-2" key={question}>
						<AccordionItemHeading>
							<AccordionItemState>
								{({ expanded }) => (
									<AccordionItemButton
										className={clsx(
											"cursor-pointer font-semibold text-lg pr-6 pl-12 h-[82px] flex items-center justify-between",
											expanded
												? "rounded-t-2xl bg-[#191922]"
												: "rounded-2xl bg-[#16161D] hover:bg-[#191922]"
										)}
									>
										{question}
										<button className="w-[34px] h-[34px] flex-middle bg-[#363745] rounded">
											<Image
												width={18}
												height={18}
												alt=""
												src={`/icons/faq-${
													expanded ? "minus" : "plus"
												}.svg`}
											/>
										</button>
									</AccordionItemButton>
								)}
							</AccordionItemState>
						</AccordionItemHeading>
						<AccordionItemPanel className="p-6 pt-0 bg-[#191922] rounded-b-2xl">
							<p className="text-secondaryText">{answer}</p>
						</AccordionItemPanel>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
