// import BuildBlock from "@/app/components/build-block";
// import Link from "@/app/components/link";
// import Text from "@/app/components/text";
// import Title from "@/app/components/title";

// export default function PrivacyPolicyPage() {
// 	return (
// 		<>
// 			<Title center tag="h1">
// 				Privacy Policy
// 			</Title>
// 			<Text className="mt-2 mb-16">
// 				Effective Date: <b>[INSERT DATE]</b>
// 				<br />
// 				Last Updated: <b>[INSERT DATE]</b>
// 				<br />
// 				This Privacy Policy explains how CsSkinSpace (
// 				<b>&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;</b>)
// 				collects, uses, stores, and protects your personal data when you
// 				access and use <b>[PROJECT NAME]</b> available at{" "}
// 				<b>[WEBSITE URL]</b> (the “Website”). By using the Website, you
// 				consent to the practices described in this <b>Privacy Policy</b>
// 				.
// 			</Text>
// 			<div className="flex flex-col gap-6">
// 				<BuildBlock
// 					title="1. Legal Basis for Processing"
// 					text={[
// 						<>
// 							We process your personal data in accordance with:
// 							<ul className="list-disc pl-8">
// 								<li>The UK Data Protection Act 2018</li>
// 								<li>
// 									The EU General Data Protection Regulation
// 									(GDPR)
// 								</li>
// 								<li>
// 									Other applicable laws in jurisdictions where
// 									we operate
// 								</li>
// 							</ul>
// 							Our legal bases for processing include contractual
// 							necessity, legitimate interests, legal obligation,
// 							and consent, where applicable.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="2. Information We Collect"
// 					text={[
// 						<>
// 							We may collect the following categories of data:
// 							<ul className="list-disc pl-8">
// 								<li>
// 									<b>Identification Data:</b> Email, username,
// 									country of residence
// 								</li>
// 								<li>
// 									<b>Steam Account Data:</b> SteamID, avatar,
// 									profile name (via official Steam API)
// 								</li>
// 								<li>
// 									<b>Payment Data:</b> Transaction ID, payment
// 									method (processed via third-party providers)
// 								</li>
// 								<li>
// 									<b>Technical Data:</b> IP address, browser
// 									type, device information
// 								</li>
// 								<li>
// 									<b>Usage Data:</b> Session activity, page
// 									interactions, timestamps
// 								</li>
// 							</ul>
// 							We do not collect your Steam password, authenticator
// 							codes, or full payment card numbers.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="3. How We Use Your Data"
// 					text={[
// 						<>
// 							We use your data to:
// 							<ul className="list-disc pl-8">
// 								<li>Register and manage your Account</li>
// 								<li>
// 									Process payments and deliver purchased items
// 								</li>
// 								<li>Detect and prevent fraud or abuse</li>
// 								<li>Comply with KYC/AML obligations</li>
// 								<li>Provide customer support</li>
// 								<li>
// 									Improve Website functionality and security
// 								</li>
// 								<li>
// 									Comply with legal and regulatory obligations
// 								</li>
// 							</ul>
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="4. Data Retention"
// 					text={[
// 						<>
// 							We retain your personal data only as long as
// 							necessary for the purposes stated above, and as
// 							required by law. After that, your data will be
// 							securely deleted or anonymized.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="5. Your Data Protection Rights"
// 					text={[
// 						<>
// 							You have the following rights under GDPR and UK law:
// 							<ul className="list-disc pl-8">
// 								<li>
// 									<b>Right to Access</b> – Receive a copy of
// 									your personal data
// 								</li>
// 								<li>
// 									<b>Right to Rectification</b> – Correct
// 									inaccurate or incomplete data
// 								</li>
// 								<li>
// 									<b>Right to Erasure</b> – Request deletion
// 									of your data
// 								</li>
// 								<li>
// 									<b>Right to Restrict Processing</b> – Limit
// 									how your data is used
// 								</li>
// 								<li>
// 									<b>Right to Data Portability</b> – Transfer
// 									your data to another provider
// 								</li>
// 								<li>
// 									<b>Right to Object</b> – Object to certain
// 									uses of your data
// 								</li>
// 								<li>
// 									<b>Right to Withdraw Consent</b> – Where
// 									applicable
// 								</li>
// 							</ul>
// 							To exercise these rights, contact us at{" "}
// 							<Link href="#" target="_blank">
// 								SUPPORT EMAIL
// 							</Link>
// 							.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="6. Data Sharing"
// 					text={[
// 						<>
// 							We do not sell or trade your personal data. We may
// 							share data with:
// 							<ul className="list-disc pl-8">
// 								<li>Payment processors</li>
// 								<li>KYC/AML service providers</li>
// 								<li>Hosting and IT providers</li>
// 								<li>
// 									Government authorities or law enforcement,
// 									if legally required
// 								</li>
// 								<li>
// 									Affiliates or successors, in case of a
// 									merger or acquisition
// 								</li>
// 							</ul>
// 							All third-party processors are subject to strict
// 							confidentiality and data protection obligations.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="7. Cookies and Tracking"
// 					text={[
// 						<>
// 							We use cookies and similar technologies to:
// 							<ul className="list-disc pl-8">
// 								<li>Authenticate your session</li>
// 								<li>Improve website performance</li>
// 								<li>Analyze usage data</li>
// 								<li>Secure your activity</li>
// 							</ul>
// 							You may control cookies through your browser
// 							settings. For details, see our <b>Cookies Policy</b>
// 							.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="8. Data Security"
// 					text={[
// 						<>
// 							We apply robust technical and organizational
// 							safeguards to protect your data, including:
// 							<ul className="list-disc pl-8">
// 								<li>SSL encryption</li>
// 								<li>Firewall and intrusion detection</li>
// 								<li>Secure data centers</li>
// 								<li>Regular vulnerability assessments</li>
// 							</ul>
// 							Despite these measures, no online platform is
// 							completely secure. You are responsible for
// 							protecting your account credentials.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="9. International Transfers"
// 					text={[
// 						<>
// 							Your data may be transferred to countries outside
// 							the UK or EEA. When we do so, we ensure appropriate
// 							safeguards such as Standard Contractual Clauses
// 							(SCCs) or adequacy decisions are in place.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="10. Children's Privacy"
// 					text={[
// 						<>
// 							Our Website is not intended for individuals under
// 							18. We do not knowingly collect data from minors. If
// 							we become aware of such data, we will delete it and
// 							terminate any associated account.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="11. Policy Updates"
// 					text={[
// 						<>
// 							We may update this Privacy Policy from time to time.
// 							The current version is always available on the
// 							Website. Material changes will be communicated via
// 							email or platform notice.
// 							<br />
// 							<br />
// 							Your continued use of the Website after any update
// 							constitutes your acceptance of the revised Policy.
// 						</>,
// 					]}
// 				/>

// 				<BuildBlock
// 					title="12. Contact Us"
// 					text={[
// 						<>
// 							For questions or to exercise your data rights,
// 							contact:
// 							<br />
// 							<br />
// 							<Link href="#" target="_blank">
// 								SUPPORT EMAIL
// 							</Link>
// 							<br />
// 							<b>CsSkinSpace, [COMPANY REGISTERED ADDRESS]</b>
// 						</>,
// 					]}
// 				/>
// 			</div>
// 		</>
// 	);
// }

import BuildBlock from "@/app/components/build-block";
import Link from "@/app/components/link";
import Text from "@/app/components/text";
import Title from "@/app/components/title";

export default function PrivacyPolicyPage() {
	return (
		<>
			<Title center tag="h1">
				Privacy Policy
			</Title>
			<Text className="mt-2 mb-16" center>
				Effective Date: <b>2 July 2025</b>
				<br />
				Last Updated: <b>2 July 2025</b>
				<br />
				This Privacy Policy explains how <b>PLAY SPACE TECH LTD</b> (
				<b>"we", "our", or "us"</b>) collects, uses, stores, and
				protects your personal data when you access and use{" "}
				<b>CSSKINSPACE</b>, available at{" "}
				<Link href="https://csskinspace.com" target="_blank">
					https://csskinspace.com
				</Link>{" "}
				(the “Website”).
				<br />
				By using the Website, you consent to the practices described in
				this <b>Privacy Policy</b>.
				<br />
				This Policy is issued in compliance with the UK Data Protection
				Act 2018 and the General Data Protection Regulation (EU)
				2016/679 (GDPR).
			</Text>

			<div className="flex flex-col gap-6">
				<BuildBlock
					title="1. Legal Basis for Processing"
					text={[
						<>
							We process your personal data in accordance with:
							<ul className="list-disc pl-8">
								<li>The UK Data Protection Act 2018</li>
								<li>
									The EU General Data Protection Regulation
									(GDPR)
								</li>
								<li>
									Other applicable laws in jurisdictions where
									we operate
								</li>
							</ul>
							Our legal bases for processing include contractual
							necessity, legitimate interests, legal obligation,
							and consent, where applicable.
						</>,
					]}
				/>

				<BuildBlock
					title="2. Information We Collect"
					text={[
						<>
							We may collect the following categories of data:
							<ul className="list-disc pl-8">
								<li>
									<b>Identification Data:</b> Email, username,
									country of residence
								</li>
								<li>
									<b>Steam Account Data:</b> SteamID, avatar,
									profile name (via official Steam API)
								</li>
								<li>
									<b>Payment Data:</b> Transaction ID, payment
									method (processed via third-party providers)
								</li>
								<li>
									<b>Technical Data:</b> IP address, browser
									type, device information
								</li>
								<li>
									<b>Usage Data:</b> Session activity, page
									interactions, timestamps
								</li>
							</ul>
							<p className="mt-2 font-semibold text-red-600">
								❗️ We do not collect your Steam password,
								authenticator codes, or full payment card
								numbers.
							</p>
						</>,
					]}
				/>

				<BuildBlock
					title="3. How We Use Your Data"
					text={[
						<>
							We use your data to:
							<ul className="list-disc pl-8">
								<li>Register and manage your Account</li>
								<li>
									Process payments and deliver purchased items
								</li>
								<li>Detect and prevent fraud or abuse</li>
								<li>Comply with KYC/AML obligations</li>
								<li>Provide customer support</li>
								<li>
									Improve Website functionality and security
								</li>
								<li>
									Comply with legal and regulatory obligations
								</li>
							</ul>
						</>,
					]}
				/>

				<BuildBlock
					title="4. Data Retention"
					text={[
						<>
							We retain your personal data only as long as
							necessary for the purposes stated above, and as
							required by law. After that, your data will be
							securely deleted or anonymized.
						</>,
					]}
				/>

				<BuildBlock
					title="5. Your Data Protection Rights"
					text={[
						<>
							You have the following rights under GDPR and UK law:
							<ul className="list-disc pl-8">
								<li>
									<b>Right to Access</b> – Receive a copy of
									your personal data
								</li>
								<li>
									<b>Right to Rectification</b> – Correct
									inaccurate or incomplete data
								</li>
								<li>
									<b>Right to Erasure</b> – Request deletion
									of your data
								</li>
								<li>
									<b>Right to Restrict Processing</b> – Limit
									how your data is used
								</li>
								<li>
									<b>Right to Data Portability</b> – Transfer
									your data to another provider
								</li>
								<li>
									<b>Right to Object</b> – Object to certain
									uses of your data
								</li>
								<li>
									<b>Right to Withdraw Consent</b> – Where
									applicable
								</li>
							</ul>
							To exercise these rights, contact us at{" "}
							<Link
								href="mailto:support@csskinspace.com"
								target="_blank"
							>
								support@csskinspace.com
							</Link>
							.
						</>,
					]}
				/>

				<BuildBlock
					title="6. Data Sharing"
					text={[
						<>
							We do not sell or trade your personal data. We may
							share data with:
							<ul className="list-disc pl-8">
								<li>Payment processors</li>
								<li>KYC/AML service providers</li>
								<li>Hosting and IT providers</li>
								<li>
									Government authorities or law enforcement,
									if legally required
								</li>
								<li>
									Affiliates or successors, in case of a
									merger or acquisition
								</li>
							</ul>
							All third-party processors are subject to strict
							confidentiality and data protection obligations.
						</>,
					]}
				/>

				<BuildBlock
					title="7. Cookies and Tracking"
					text={[
						<>
							We use cookies and similar technologies to:
							<ul className="list-disc pl-8">
								<li>Authenticate your session</li>
								<li>Improve website performance</li>
								<li>Analyze usage data</li>
								<li>Secure your activity</li>
							</ul>
							You may control cookies through your browser
							settings. For more information, please see our{" "}
							<Link href="/cookie-policy" target="_blank">
								Cookies Policy
							</Link>
							.
						</>,
					]}
				/>

				<BuildBlock
					title="8. Data Security"
					text={[
						<>
							We apply robust technical and organizational
							safeguards to protect your data, including:
							<ul className="list-disc pl-8">
								<li>SSL encryption</li>
								<li>Firewall and intrusion detection</li>
								<li>Secure data centers</li>
								<li>Regular vulnerability assessments</li>
							</ul>
							Despite these measures, no online platform is
							completely secure. You are responsible for
							protecting your account credentials.
						</>,
					]}
				/>

				<BuildBlock
					title="9. International Transfers"
					text={[
						<>
							Your data may be transferred to countries outside
							the UK or EEA. When we do so, we ensure appropriate
							safeguards such as Standard Contractual Clauses
							(SCCs) or adequacy decisions are in place.
						</>,
					]}
				/>

				<BuildBlock
					title="10. Children's Privacy"
					text={[
						<>
							Our Website is not intended for individuals under
							18. We do not knowingly collect data from minors. If
							we become aware of such data, we will delete it and
							terminate any associated account.
						</>,
					]}
				/>

				<BuildBlock
					title="11. Policy Updates"
					text={[
						<>
							We may update this Privacy Policy from time to time.
							The current version is always available on the
							Website.
							<br />
							Material changes will be communicated via email or
							platform notice.
							<br />
							<br />
							Your continued use of the Website after any update
							constitutes your acceptance of the revised Policy.
						</>,
					]}
				/>

				<BuildBlock
					title="12. Contact Us"
					text={[
						<>
							For questions or to exercise your data rights,
							contact:
							<br />
							<br />
							<Link
								href="mailto:support@csskinspace.com"
								target="_blank"
							>
								support@csskinspace.com
							</Link>
							<br />
							<b>
								PLAY SPACE TECH LTD, 28 City Road, London,
								United Kingdom, EC1V 2NX
							</b>
						</>,
					]}
				/>
			</div>
		</>
	);
}
