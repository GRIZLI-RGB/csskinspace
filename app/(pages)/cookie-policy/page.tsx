import BuildBlock from "@/app/components/build-block";
import Link from "@/app/components/link";
import Text from "@/app/components/text";
import Title from "@/app/components/title";

export default function CookiePolicyPage() {
	return (
		<>
			<Title center tag="h1">
				Cookie Policy
			</Title>
			<Text center className="mt-2 mb-16">
				Effective Date: <b>[INSERT DATE]</b>
				<br />
				This Cookies Policy explains how
				<b>[PROJECT NAME]</b> (operated by{" "}
				<b>CsSkinSpace, “we”, “our”, or “us”</b>) uses cookies and
				similar technologies on our website <b>[WEBSITE URL]</b>.<br />
				By continuing to use our website, you consent to the use of
				cookies as outlined below.
			</Text>
			<div className="flex flex-col gap-6">
				<BuildBlock
					title="1. What are cookies?"
					text={[
						<>
							Cookies are small text files that websites store on
							your device (computer, phone, tablet) when you
							visit. They help us remember you, improve
							functionality, measure performance, and personalize
							content.
							<br />
							<br />
							Cookies can be:
							<br />- Session cookies: temporary, deleted when you
							close your browser
							<br />- Persistent cookies: remain on your device
							for a set time
							<br />- First-party cookies: placed by{" "}
							<b>[PROJECT NAME]</b>
							<br />- Third-party cookies: placed by external
							services (e.g., analytics)
						</>,
					]}
				/>

				<BuildBlock
					title="2. Why do we use cookies?"
					text={[
						<>
							We use cookies to:
							<br />- Ensure the website functions properly (e.g.,
							login, navigation)
							<br />- Maintain your session across pages
							<br />- Prevent fraudulent behavior or abuse
							<br />- Understand how users interact with the site
							(e.g., page visits, bounce rate)
							<br />- Store preferences (language, currency, etc.)
							<br />
							<br />
							We do not use cookies to collect sensitive personal
							information without your consent.
						</>,
					]}
				/>

				<BuildBlock
					title="3. Types of cookies we use"
					text={[
						<>
							<table className="w-full border-collapse border-[#1E1E28]">
								<thead>
									<tr className="border border-[#1E1E28]">
										<th className="text-center font-normal text-[#43454D] p-3 border-r border-[#1E1E28]">
											Type
										</th>
										<th className="text-center font-normal text-[#43454D] p-3">
											Description
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border border-[#1E1E28]">
										<td className="p-3 border-r border-[#1E1E28]">
											Strictly Necessary
										</td>
										<td className="p-3">
											Required for essential functions
											(login, checkout, security). Cannot
											be disabled.
										</td>
									</tr>
									<tr className="border border-[#1E1E28]">
										<td className="p-3 border-r border-[#1E1E28]">
											Functional
										</td>
										<td className="p-3">
											Help remember user choices and
											improve user experience.
										</td>
									</tr>
									<tr className="border border-[#1E1E28]">
										<td className="p-3 border-r border-[#1E1E28]">
											Analytics
										</td>
										<td className="p-3">
											Track site usage to improve design
											and performance (e.g., Google
											Analytics).
										</td>
									</tr>
									<tr className="border border-[#1E1E28]">
										<td className="p-3 border-r border-[#1E1E28]">
											Security
										</td>
										<td className="p-3">
											Help prevent fraud, abuse, and
											unauthorized access.
										</td>
									</tr>
								</tbody>
							</table>
						</>,
					]}
				/>

				<BuildBlock
					title="4. Third-party cookies"
					text={[
						<>
							We may use services from third parties, such as:
							<br />- <b>Google Analytics</b> – to understand user
							behavior and improve our platform
							<br />- <b>Payment providers</b> – to handle secure
							transactions and fraud prevention
							<br />- <b>Marketing platforms</b> (if activated) –
							to analyze promotions or campaigns
							<br />
							<br />
							These services may set their own cookies under their
							respective privacy policies.
						</>,
					]}
				/>

				<BuildBlock
					title="5. Cookie consent and control"
					text={[
						<>
							When you visit our site for the first time, you will
							see a cookie banner asking for your consent to use
							optional cookies (analytics, marketing). You can:
							<br />- Accept all cookies
							<br />- Reject all non-essential cookies
							<br />- Customize your preferences
							<br />
							<br />
							You can also manage cookies later via your browser
							settings.
							<br />
							<br />
							<b>
								Disabling essential cookies may affect the
								functionality of some site features.
							</b>
						</>,
					]}
				/>

				<BuildBlock
					title="6. How to manage cookies in your browser"
					text={[
						<>
							You can manually delete or block cookies through
							your browser settings. Here{"'"}s how:
							<br />- <b>Chrome:</b> Settings &gt; Privacy and
							security &gt; Cookies and other site data
							<br />- <b>Firefox:</b> Preferences &gt; Privacy &
							Security &gt; Cookies and Site Data
							<br />- <b>Edge:</b> Settings &gt; Cookies and site
							permissions
							<br />- <b>Safari:</b> Preferences &gt; Privacy &gt;
							Manage Website Data
						</>,
					]}
				/>

				<BuildBlock
					title="7. Updates to this Cookies Policy"
					text={[
						<>
							We may update this Cookies Policy from time to time.
							All changes will be posted on this page, and the
							&quot;Effective Date&quot; will be updated.
							Continued use of the website implies acceptance of
							the revised policy.
						</>,
					]}
				/>

				<BuildBlock
					title="8. Contact"
					text={[
						<>
							If you have any questions about our use of cookies,
							please contact us at:
							<br />
							<br />
							<Link href="#" target="_blank">
								SUPPORT EMAIL
							</Link>
							<br />
							<b>[COMPANY ADDRESS]</b>
						</>,
					]}
				/>
			</div>
		</>
	);
}
