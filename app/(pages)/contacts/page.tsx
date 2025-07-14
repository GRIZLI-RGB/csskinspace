import Text from "@/app/components/text";
import Title from "@/app/components/title";
import Link from "@/app/components/link";

export default function ContactsPage() {
	return (
		<>
			<Title center tag="h1">
				Contacts
			</Title>
			<Text center className="mt-6 mb-6">
				If you have any questions, concerns, or inquiries regarding our
				services, policies, or your account, please feel free to contact
				us using the information below:
			</Text>

			<div className="flex flex-col items-center gap-6 mb-16">
				<Text center>
					<span role="img" aria-label="email">
						📧
					</span>{" "}
					Email:{" "}
					<Link href="mailto:support@csskinspace.com" target="_blank">
						support@csskinspace.com
					</Link>
					<br />
					Our support team is available Monday through Friday and
					typically responds within 24 hours.
				</Text>

				<Text center className="whitespace-pre-line">
					<span role="img" aria-label="office">
						🏢
					</span>{" "}
					Registered Office Address:{"\n"}
					PLAY SPACE TECH LTD{"\n"}
					28 City Road{"\n"}
					London, United Kingdom{"\n"}
					EC1V 2NX
				</Text>
			</div>
		</>
	);
}
