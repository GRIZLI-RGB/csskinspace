import { Fragment } from "react";
import Title from "./title";
import Text from "./text";

export default function BuildBlock({
	title,
	text,
}: {
	title: string;
	text: React.ReactNode[];
}) {
	return (
		<div>
			<Title className="mb-2">{title}</Title>
			{text.map((item, index) => (
				<Fragment key={index}>
					<Text>{item}</Text>
					{index !== text.length - 1 && <br />}
				</Fragment>
			))}
		</div>
	);
}
