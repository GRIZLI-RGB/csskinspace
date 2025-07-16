const data = {
	header: {
		navigation: [
			{
				text: "Guarantees",
				link: "/guarantees",
			},
			{
				text: "Blog",
				link: "/blog",
			},
			{
				text: "FAQ",
				link: "/faq",
			},
		],
	},
	footer: {
		navigation: {
			support: [
				{
					text: "FAQ",
					link: "/faq",
				},
				{
					text: "Guarantees",
					link: "/guarantees",
				},
				{
					text: "Contacts",
					link: "/contacts",
				},
			],
			useful: [
				{
					text: "Blog",
					link: "/blog",
				},
				{
					text: "Terms of Use",
					link: "/terms-of-use",
				},
				{
					text: "Privacy policy",
					link: "/privacy-policy",
				},
				{
					text: "Cookie policy",
					link: "/cookie-policy",
				},
			],
		},
		socialNetworks: [
			{
				link: "https://discord.com/invite/HS9EwHhhHr",
				iconShortUrl: "/icons/socialNetworks/discord.svg",
			},
			{
				link: "https://www.instagram.com/csskinspace/",
				iconShortUrl: "/icons/socialNetworks/instagram.svg",
			},
			{
				link: "https://www.threads.com/@csskinspace",
				iconShortUrl: "/icons/socialNetworks/threads.svg",
			},
			{
				link: "https://x.com/CSskinSpace",
				iconShortUrl: "/icons/socialNetworks/x.svg",
			},
			{
				link: "https://www.tiktok.com/@csskinspace",
				iconShortUrl: "/icons/socialNetworks/tik-tok.svg",
			},
		],
	},
	faq: [
		{
			question: "💡 How does CSSKINSPACE work?",
			answer: (
				<>
					CSSKINSPACE allows users to sell skins quickly.
					<ul className="list-disc list-inside mt-2">
						<li>No registration needed</li>
						<li>Instant payments</li>
					</ul>
				</>
			),
		},
		{
			question: "🛡️ Is it safe to use CSSKINSPACE?",
			answer: (
				<>
					Yes. We prioritize your safety and compliance at every step.
					Our platform uses:
					<ul className="list-disc list-inside my-2">
						<li>
							The official Steam API for verified and secure item
							delivery
						</li>
						<li>
							SSL encryption and PCI-DSS-compliant payment
							providers
						</li>
						<li>
							Automated systems to reduce human error and prevent
							fraud
						</li>
						<li>
							Strict adherence to UK GDPR and EU GDPR standards
						</li>
					</ul>
					We do not store your Steam credentials. All sessions and
					transactions are securely logged and monitored.
				</>
			),
		},
		{
			question: "👤 Do I need an account to use the site?",
			answer: (
				<>
					You can browse the marketplace without registering.
					<br />
					However, to make a purchase, you must log in with Steam or
					register via email and verify your account.
				</>
			),
		},
		{
			question: "🎮 What types of skins are available?",
			answer: (
				<>
					We offer a wide selection of CS2 skins, including:
					<ul className="list-disc list-inside my-2">
						<li>Knives</li>
						<li>Gloves</li>
						<li>Pistols</li>
						<li>Assault rifles</li>
						<li>SMGs</li>
						<li>Covert, rare, and trending items</li>
					</ul>
					Our inventory is regularly updated to reflect real-time
					market trends.
				</>
			),
		},
		{
			question: "🌍 Which countries can access the service?",
			answer: (
				<>
					We currently operate within the United Kingdom and the
					European Union. Access from certain jurisdictions may be
					restricted due to legal or regulatory limitations. See our{" "}
					<a href="/terms-of-use" className="text-accent underline">
						Terms of Use
					</a>{" "}
					for the full list of restricted regions.
				</>
			),
		},
		{
			question: "💶 Which currencies are supported?",
			answer: "All purchases are processed in Euros (EUR) or Pounds Sterling (GBP), depending on your location and selected payment method.",
		},
		{
			question: "📈 How are prices determined?",
			answer: (
				<>
					Prices reflect:
					<ul className="list-disc list-inside my-2">
						<li>Real-time marketplace data</li>
						<li>Item rarity and condition</li>
						<li>Popularity and demand</li>
						<li>Processing and service costs</li>
					</ul>
					We do not apply artificial inflation or hidden markups.
				</>
			),
		},
		{
			question: "💸 Are there any hidden fees or charges?",
			answer: "No. All service fees (if any) are disclosed prior to checkout. The total amount you see before confirming the payment is final.",
		},
		{
			question:
				"⛔ I completed payment but didn’t receive my skin — what should I do?",
			answer: (
				<>
					Please verify the following:
					<ul className="list-disc list-inside my-2">
						<li>
							Steam Guard has been enabled on your account for at
							least 15 days
						</li>
						<li>Your Steam inventory is set to public</li>
						<li>
							Your account is not subject to a trade ban or
							limitation
						</li>
						<li>You are logged into the correct Steam account</li>
					</ul>
					If everything appears correct, try logging out and back in,
					or refreshing the page. If the issue persists, contact us at{" "}
					<a
						href="mailto:support@csskinspace.com"
						className="text-accent underline"
					>
						support@csskinspace.com
					</a>
					.
				</>
			),
		},
		{
			question: "🔁 Can I cancel my order or get a refund?",
			answer: (
				<>
					No. All purchases are final once confirmed and processed.
					Refunds are not available, except in the rare case of a
					technical error caused solely by our system.
				</>
			),
		},
		{
			question: "💼 Can I sell or withdraw skins on CSSKINSPACE?",
			answer: "No. This is a buy-only platform. Skins cannot be sold, traded, or withdrawn to other platforms or users. All items are delivered directly to your Steam inventory.",
		},
		{
			question: "🎯 Are the skins tradeable?",
			answer: "Yes, all skins purchased follow standard CS2 item rules and are delivered to your Steam inventory. Some items may be temporarily restricted from trading by Steam itself.",
		},
		{
			question: "🔒 Is my personal data safe?",
			answer: (
				<>
					Yes. We fully comply with the UK Data Protection Act 2018,
					UK GDPR, and EU GDPR. Your personal data is:
					<ul className="list-disc list-inside my-2">
						<li>Encrypted and securely stored</li>
						<li>
							Never shared with third parties without your consent
						</li>
						<li>Used only to deliver services and support</li>
					</ul>
					For more, see our{" "}
					<a href="/privacy-policy" className="text-accent underline">
						Privacy Policy
					</a>
					.
				</>
			),
		},
		{
			question: "🕹️ Can I use VPN or proxy services?",
			answer: "No. Using VPNs or proxies to access the site may violate our Terms of Use. If detected, access may be suspended or permanently restricted, and purchases may not be refunded.",
		},
		{
			question: "📬 How can I contact support?",
			answer: "You can reach us at support@csskinspace.com. We aim to respond within 24 hours.",
		},
		{
			question:
				"🎁 Do you offer bonuses, discounts, or loyalty programs?",
			answer: "Not currently. However, stay tuned via our official blog and social media — we may introduce limited-time promotions in the future.",
		},
	],
	TEST_ARTICLES: [
		{
			id: 1,
			title: "Top 5 CS2 Skins That Are Worth Investing In",
			content:
				"Looking to upgrade your loadout and make smart investments? We've gathered the top 5 CS2 skins that are not only stylish but also hold long-term value. From rare knives to iconic AK-47 finishes, discover what items dominate the 2025 market.",
			photo: "cs2-top5.jpg",
			preview: "Check out the 5 best CS2 skins to invest in this year.",
			views: 1356,
			is_banner: 1,
			photo_url: new URL(
				"https://wallpaper.forfun.com/fetch/cf/cf598e55080ee67a58a738137c823b56.jpeg"
			),
			preview_url: new URL(
				"https://wallpaper.forfun.com/fetch/cf/cf598e55080ee67a58a738137c823b56.jpeg"
			),
			created_at: new Date("2025-07-01T12:00:00Z"),
			updated_at: new Date("2025-07-01T12:00:00Z"),
		},
		{
			id: 2,
			title: "How Skin Marketplaces Changed the CS Economy",
			content:
				"From shady trades to billion-dollar ecosystems — skin marketplaces have come a long way. In this article, we explore how platforms like CSSKINSPACE revolutionized the way players buy and sell digital items safely.",
			photo: "marketplaces-evolution.jpg",
			preview:
				"Explore how the CS economy evolved through skin marketplaces.",
			views: 842,
			is_banner: 0,
			photo_url: new URL(
				"https://wallpaper.forfun.com/fetch/cf/cf598e55080ee67a58a738137c823b56.jpeg"
			),
			preview_url: new URL(
				"https://wallpaper.forfun.com/fetch/cf/cf598e55080ee67a58a738137c823b56.jpeg"
			),
			created_at: new Date("2025-06-24T08:30:00Z"),
			updated_at: new Date("2025-06-25T09:15:00Z"),
		},
		{
			id: 3,
			title: "Understanding Float Value and Wear in CS2",
			content:
				"What is float? Why does it matter? Whether you're new to trading or a veteran collector, understanding how skin wear affects appearance and pricing is essential. We break it down for you in simple terms.",
			photo: "float-guide.jpg",
			preview: "A beginner-friendly guide to float values and skin wear.",
			views: 1943,
			is_banner: 0,
			photo_url: new URL(
				"https://wallpaper.forfun.com/fetch/cf/cf598e55080ee67a58a738137c823b56.jpeg"
			),
			preview_url: new URL(
				"https://wallpaper.forfun.com/fetch/cf/cf598e55080ee67a58a738137c823b56.jpeg"
			),
			created_at: new Date("2025-07-10T15:45:00Z"),
			updated_at: new Date("2025-07-10T15:45:00Z"),
		},
	],
};

export default data;
