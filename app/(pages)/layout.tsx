import Header from "../components/header";
import Footer from "../components/footer";

export default function PagesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 pt-[50px] pb-[100px]">
				{children}
			</main>
			<Footer />
		</div>
	);
}
