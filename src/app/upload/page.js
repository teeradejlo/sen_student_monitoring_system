'use client';

import { useState, useEffect } from "react";

import styles from "./page.module.css";

import SelectBox from "./selectBox";
import FileBox from "./fileBox";
import NotificationBar from "./notificationBar";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function Upload() {

	const [studentList, setStudentList] = useState([]);
	const [teacherList, setTeacherList] = useState([]);

	const [submitting, setSubmitting] = useState(false);
	const [notificationCount, setNotificationCount] = useState(0);
	const [notificationList, setNotificationList] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('student-name', e.target[0].value);
		formData.append('teacher-name', e.target[2].value);
		formData.append('ambient-signals-data', e.target[6].files[0]);
		formData.append('wristband-signals-data', e.target[9].files[0]);
		formData.append('emotion-labels', e.target[12].files[0]);

		setSubmitting(true);
		fetch('api/upload/session', {
			method: 'POST',
			headers: {
				'Accept': 'application/json'
			},
			body: formData
		}).then((res) => {
			if (res.status === 200) {
				return res.json();
			}
			return Promise.reject(res);
		}).then((res) => {
			setNotificationList(prev => [{ id: notificationCount, severity: "success", text: "Added Session #" + res.id }, ...prev]);
			setNotificationCount(prev => prev + 1);
			setTimeout(() => {
				setNotificationList(prev => prev.slice(0, -1));
			}, 4000);
		}).finally(() => {
			setSubmitting(false);
		});
	};

	useEffect(() => {
		fetch("/api/students").then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					setStudentList(data.map((el) => `${el.id} - ${el.name}`))
				});
			}
		});

		fetch("/api/teachers").then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					setTeacherList(data.map((el) => `${el.id} - ${el.name}`))
				});
			}
		});
	}, []);

	return (
		<main className={`relative flex flex-1 justify-center items-center ${styles.main}`}>
			<div className={`px-6 py-4 text-xl font-bold ${styles.uploadPanel}`}>
				<h1>Upload Data</h1>

				{
					!submitting ?
						<Box
							sx={{
								mt: 3
							}}
							component="form"
							autoComplete="off"
							onSubmit={handleSubmit}>
							<SelectBox title="student-name" options={studentList} />
							<SelectBox title="teacher-name" options={teacherList} />
							<FileBox title="ambient-signals-data" />
							<FileBox title="wristband-signals-data" />
							<FileBox title="emotion-labels" />

							<div className="flex justify-center">
								<Button disableRipple variant="contained" color='success' type="submit">
									Submit
								</Button>
							</div>
						</Box>
						:
						<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 6 }}>
							<CircularProgress />
						</Box>
				}
			</div>
			<div className="w-full absolute flex justify-center top-0 left-0" >
				<NotificationBar notifications={notificationList} />
			</div>
		</main>
	);
}
