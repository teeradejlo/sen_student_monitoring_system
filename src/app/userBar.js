'use client';

import { usePathname, useRouter } from 'next/navigation';

import stylesNavBar from "./navBar.module.css";

import Link from 'next/link';

export default function UserBar(props) {
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		await fetch('api/logout');

		router.refresh();
	}

	return (
		<>
			{
				!props.user ?
					< Link
						className={`font-bold text-l text-white px-6 py-4 ml-auto ${stylesNavBar.navBarItem} ${pathname === "/login" ? stylesNavBar.navBarSelectedItem : ""}`
						}
						href={{ pathname: '/login', query: { redirect: pathname } }} >
						Login
					</Link >
					:
					<li className={`font-bold text-l text-white px-6 py-4 ml-auto ${stylesNavBar.navBarItem}`} onClick={handleLogout}>
						Logout
					</li>
			}
		</>
	);

}