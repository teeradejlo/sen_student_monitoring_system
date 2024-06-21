import styles from "./page.module.css";

import InformationPanel from "./informationPanel";
import StudentTeacherPanel from "./studentTeacherPanel";

export default function Home() {
	return (
		<main className={`flex flex-1 ${styles.main}`}>
			<div className={`p-9 ${styles.homeLeftPanel}`}>
				<StudentTeacherPanel />
			</div>

			<div className={`p-9 ${styles.homeRightPanel}`}>
				<InformationPanel />
			</div>
		</main>
	);
}
