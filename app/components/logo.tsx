import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<Link href="/">
			<Image
				className="min-w-[106px]"
				quality={100}
				src="/logo.svg"
				alt="Logo"
				width={106}
				height={26}
			/>
		</Link>
	);
}
