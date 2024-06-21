import "./globals.css";

import NavBar from "./navBar";

export const metadata = {
	title: "SEN Student Monitoring System",
	description: "Monitor data collected from SEN students' study sessions.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="flex flex-col h-screen">
				<NavBar />
				{children}
			</body>
		</html>
	);
}
