'use client';

import { useState } from "react";

import styles from "./studentTeacherPanel.module.css";

export default function StudentTeacherPanel() {

	const [category, setCategory] = useState("students");

	const handleClickCategory = (cat) => {

		console.log(cat)
		setCategory(cat.toLowerCase());
	};

	return (
		<main className={`${styles.main}`}>
			<header className={`flex w-full`}>
				<button className={`flex-1 p-4 bg-white ${category === "students" ? styles.selected : ""}`}
					onClick={() => handleClickCategory("students")}>
					Students
				</button>
				<button className={`flex-1 p-4 bg-white ${category === "teachers" ? styles.selected : ""}`}
					onClick={() => handleClickCategory("teachers")}>
					Teachers
				</button>
			</header>

		</main>
	);
}