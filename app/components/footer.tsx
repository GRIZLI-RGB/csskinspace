import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

import data from "../utils/data";
import Logo from "./logo";

const NavigationList = ({
	title,
	links,
	className,
}: {
	title?: string;
	links: { text: string; link: string }[];
	className?: string;
}) => {
	return (
		<nav
			className={clsx(
				"flex flex-col gap-3 items-start max-sm:text-center max-sm:items-center",
				className
			)}
		>
			{title && (
				<h6 className="mb-1.5 font-bold uppercase text-base">
					{title}
				</h6>
			)}

			{links.map(({ text, link }) => (
				<Link
					className="font-medium text-secondaryText hover:text-primaryText"
					href={link}
					key={text}
				>
					{text}
				</Link>
			))}
		</nav>
	);
};

export default function Footer() {
	return (
		<footer className="border-t border-primaryBorder">
			<div className="px-8 py-11 flex items-start gap-6 max-sm:py-8 max-sm:flex-col max-sm:text-center max-sm:items-center max-sm:gap-8">
				<div className="flex flex-col gap-4 items-start max-sm:items-center">
					<Logo />
					<nav className="grid grid-cols-5 gap-2">
						{data.footer.socialNetworks.map((socialNetwork) => (
							<a
								target="_blank"
								key={socialNetwork.iconShortUrl}
								className="w-[46px] h-[46px] rounded-md flex-middle bg-secondaryBackground group hover:bg-fourthBackground"
							>
								<Image
									className="group-hover:brightness-[190%]"
									src={socialNetwork.iconShortUrl}
									width={18}
									height={18}
									alt={""}
								/>
							</a>
						))}
					</nav>
				</div>
				<NavigationList
					className="ml-auto mr-[128px] max-sm:mr-0 max-sm:ml-0"
					title="Support"
					links={data.footer.navigation.support}
				/>
				<NavigationList
					title="Useful"
					links={data.footer.navigation.useful}
				/>
			</div>

			<div className="gap-5 px-8 py-6 flex flex-col border-t border-primaryBorder text-secondaryText">
				<div className="max-sm:self-center self-end flex items-center gap-4 max-sm:justify-center max-sm:flex-wrap">
					<img
						src="/images/visa.png"
						alt="Visa"
						className="h-5 object-cover"
					/>
					<img
						src="/images/mastercard.png"
						alt="Mastercard"
						className="h-5 object-cover"
					/>
				</div>
				<div className="max-sm:text-center max-sm:gap-6 max-sm:flex-col  flex items-center justify-between text-xs gap-12">
					<p>
						YOURGAMES LTD Company number 16382696 Registered office
						address: 86-90 Paul Street London, Greater London,
						England, EC2A 4NE
					</p>

					<p className="text-right max-sm:text-center">
						CsSkinSpace website is operated by In-Game Solutions
						PTE. LTD © 2020-2025 CsSkinSpace, All Rights Reserved
					</p>
				</div>
			</div>
		</footer>
	);
}
