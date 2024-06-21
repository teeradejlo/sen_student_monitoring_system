'use client';

import { usePathname } from 'next/navigation';

import styles from "./navBar.module.css";

import Link from 'next/link';

export default function NavBarItem(props) {
	const pathname = usePathname();

	return (
		<Link key={props.url}
			className={`font-bold text-l text-white px-6 py-4 ${styles.navBarItem} ${pathname === props.url ? styles.navBarSelectedItem : ""}`}
			href={props.url}>
			{props.text}
		</Link>
	);
}