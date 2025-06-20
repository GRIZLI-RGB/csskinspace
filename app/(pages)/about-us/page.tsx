import BuildBlock from "@/app/components/build-block";
import Link from "@/app/components/link";
import Text from "@/app/components/text";
import Title from "@/app/components/title";

export default function AboutUsPage() {
	return (
		<>
			<Title center tag="h1">
				About Us
			</Title>
			<Text className="mt-2">
				<b>
					Welcome to CsSkinSpace — Your Trusted Destination for
					Instant CS2 Skins.
				</b>
			</Text>
			<br />
			<Text>
				At <b>CsSkinSpace</b>, we believe that buying your favorite CS2
				skins should be fast, fair, and effortless. That’s why we’ve
				built a modern, secure platform where verified users can
				instantly purchase top-tier skins using real money — no waiting,
				no trades, no complications.
			</Text>
			<br />
			<Text>
				Our mission is simple:
				<br />
				To offer players around the world a{" "}
				<b>safe, transparent, and hassle-free marketplace</b> for
				cosmetic in-game items. We combine intuitive design, automated
				delivery systems, and robust compliance protocols to give you
				the smoothest skin-shopping experience possible.
			</Text>
			<div className="flex flex-col gap-6 mt-16">
				<BuildBlock
					title="What We Offer"
					text={[
						<>
							- Instant Delivery: As soon as your payment is
							processed, your skins are yours — instantly.
							<br />
							<br />- Security First: We use encrypted connections
							and official Steam APIs to keep your account and
							purchases safe.
							<br />
							<br />- Real Payments Only: No tokens or internal
							credits. We work with real currencies — EUR and GBP.
							<br />
							<br />- Market-Driven Prices: Our pricing reflects
							current skin values and community trends.
							<br />
							<br />- Exclusively CS2: We{"'"}re laser-focused on
							Counter-Strike 2 to deliver the best possible
							experience in one of the world{"'"}s most iconic
							games.
						</>,
					]}
				/>

				<BuildBlock
					title="Who We Are"
					text={[
						<>
							<b>[PROJECT NAME]</b> is operated by{" "}
							<b>CsSkinSpace</b>, a registered private limited
							company based in <b>[COMPANY ADDRESS]</b>, governed
							by the laws of England and Wales. We serve users
							across the UK and EU, maintaining full compliance
							with relevant regulations including KYC/AML
							requirements and consumer protection laws.
							<br />
							<br />
							We{"'"}re gamers. We{"'"}re technologists. And we
							{"'"}re committed to fairness, transparency, and
							performance.
						</>,
					]}
				/>

				<BuildBlock
					title="Want to Get in Touch?"
					text={[
						<>
							We don{"'"}t offer live chat yet, but we{"'"}d love
							to hear from you.
							<br />
							Contact us anytime at{" "}
							<Link href="#" target="_blank">
								SUPPORT EMAIL
							</Link>
						</>,
					]}
				/>
			</div>
		</>
	);
}
