import styles from "./navBar.module.css";

import UserBarServer from "./userBarServer";
import NavBarItem from "./navBarItem";

const navBarItems = [
	{
		text: "Home",
		url: "/"
	},
	{
		text: "Compare",
		url: "/compare"
	},
	{
		text: "Upload",
		url: "/upload"
	}
];

export default function NavBar() {

	return (
		<nav className={"flex " + styles.navBar}>
			<li className={"font-bold text-l text-white px-6 py-4 " + styles.navBarTitle}>
				<span>SMSS</span>
			</li>

			{
				navBarItems.map((el) => (
					<NavBarItem key={el.url} url={el.url} text={el.text} />
				))
			}

			<UserBarServer />

		</nav>
	);
}