import BuildBlock from "@/app/components/build-block";
import Link from "@/app/components/link";
import Text from "@/app/components/text";
import Title from "@/app/components/title";

export default function Guarantees() {
	return (
		<>
			<Title center tag="h1">
				Guarantees
			</Title>
			<Text center className="mt-2 mb-16">
				At CsSkinSpace, we are committed to providing a reliable,
				secure, and transparent service. The following guarantees apply
				to all verified Users of the Website and are intended to clarify
				the scope of our obligations and your rights as a Customer.
			</Text>
			<div className="flex flex-col gap-6">
				<BuildBlock
					title="1. Instant Delivery Guarantee"
					text={[
						"Once payment is successfully processed and the User’s Steam account satisfies all technical and eligibility criteria (including, but not limited to, the absence of trade restrictions, a public inventory, and Steam Guard activation), purchased items will be delivered instantly via automated systems.",
						"Delivery may be delayed in cases of technical issues related to the Steam platform or if account-specific restrictions prevent successful transfer. In such cases, the Company will provide reasonable assistance but shall not be held liable for delays beyond its control.",
					]}
				/>
				<BuildBlock
					title="2. Secure Transactions and Data Protection"
					text={[
						<>
							All payments are processed through secure
							third-party payment providers that are fully
							compliant with applicable international standards
							(e.g., PCI DSS).
							<br />
							The Company does not collect or store Users’ payment
							credentials or Steam login details.
							<br />
							User data is encrypted in transit and handled in
							accordance with the UK Data Protection Act and the
							EU General Data Protection Regulation (GDPR).
						</>,
					]}
				/>
				<BuildBlock
					title="3. Transparent Pricing"
					text={[
						<>
							All item prices are displayed in euros (EUR) or
							pounds sterling (GBP), inclusive of any applicable
							service fees. The final payable amount will be
							clearly shown at checkout prior to payment
							confirmation.
							<br />
							No hidden charges, recurring fees, or unauthorized
							deductions are applied.
						</>,
					]}
				/>
				<BuildBlock
					title="4. Market-Based Valuation"
					text={[
						<>
							Item prices reflect current market conditions,
							including demand, rarity, and general supply trends.
							Prices may change at any time without prior notice.
							<br />
							The Company does not guarantee price stability or
							future resale value.
						</>,
					]}
				/>
				<BuildBlock
					title="5. Automated and Impartial Transactions"
					text={[
						<>
							All trades are processed via automated systems
							directly connected to the official Steam API.
							<br />
							The Company does not manually modify trades, prices,
							or delivery terms for individual Users, ensuring
							equal treatment and procedural fairness across the
							platform.
						</>,
					]}
				/>
				<BuildBlock
					title="6. Anti-Fraud and Verified User System"
					text={[
						<>
							Only verified Users may access the purchasing
							functionality of the Website.
							<br />
							The Company employs automated anti-fraud systems
							designed to detect and block activities such as:
							<ul className="list-disc pl-8">
								<li>Multi-accounting</li>
								<li>Use of VPNs or proxies</li>
								<li>Unauthorized or suspicious payments</li>
							</ul>
							Accounts flagged for suspicious activity may be
							suspended or permanently restricted, in accordance
							with our [Terms of Use].
						</>,
					]}
				/>
				<BuildBlock
					title="7. Refunds and Transaction Finality"
					text={[
						<>
							All purchases are{" "}
							<strong>final and non-refundable</strong> once
							confirmed.
							<br />
							Refunds may only be granted if a technical error
							occurs that prevents item delivery and such error is
							directly attributable to the Company.
							<br />
							Users must submit refund requests promptly via{" "}
							<Link href="#" target="_blank">
								SUPPORT EMAIL
							</Link>
							. All requests will be reviewed pursuant to{" "}
							<strong>
								Sections 4.9 and 5.4 of the Terms of Use
							</strong>
							.
						</>,
					]}
				/>
				<BuildBlock
					title="8. Platform Availability and Uptime"
					text={[
						<>
							The Company will make commercially reasonable
							efforts to ensure consistent uptime and performance
							of the Website.
							<br />
							Temporary interruptions may occur due to system
							maintenance, third-party failures (e.g., Steam
							platform outages), force majeure, or infrastructure
							limitations.
							<br />
							The Company does not guarantee uninterrupted access
							and shall not be held liable for service disruptions
							beyond its control.
						</>,
					]}
				/>
				<BuildBlock
					title="9. Independence and Neutrality"
					text={[
						<>
							CsSkinSpace is a fully independent platform and is
							not affiliated with, endorsed by, or connected to
							Valve Corporation, Steam, or any other proprietary
							entity.
							<br />
							All intellectual property rights belong to their
							respective owners.
						</>,
					]}
				/>
				<BuildBlock
					title="10. Support Commitment"
					text={[
						<>
							The Company provides support to Users via{" "}
							<Link href="#" target="_blank">
								SUPPORT EMAIL
							</Link>
							.<br />
							Response times may vary depending on inquiry volume,
							but all reasonable efforts will be made to respond
							within standard business hours.
						</>,
					]}
				/>
				<Text>
					This Guarantees section is provided for informational
					purposes and does not create any rights or obligations
					beyond those expressly set forth in the [Terms of Use].
				</Text>
			</div>
		</>
	);
}
