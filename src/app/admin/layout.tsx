"use client";
import Header from "@/components/Header";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<main>
			<Header>{children}</Header>
		</main>
	);
}
