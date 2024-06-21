'use client';

import { useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

import styles from "./page.module.css";

import NotificationBar from "./notificationBar";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

export default function Upload() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [submitting, setSubmitting] = useState(false);

	const [notificationCount, setNotificationCount] = useState(0);
	const [notificationList, setNotificationList] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		setSubmitting(true);
		fetch('api/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				username: e.target[0].value,
				password: e.target[2].value
			})
		}).then((res) => {
			if (res.status === 200) {
				return res.json();
			}
			return Promise.reject(res);
		}).then((res) => {
			router.refresh();
		}).catch((e) => {
			if (e.status === 401) {
				setNotificationList(prev => [{ id: notificationCount, severity: "error", text: "Invalid username or password." }, ...prev]);
				setNotificationCount(prev => prev + 1);
				setTimeout(() => {
					setNotificationList(prev => prev.slice(0, -1));
				}, 4000);
			}
		}).finally(() => {
			setSubmitting(false);
		});
	};

	return (
		<main className={`relative flex flex-1 justify-center items-center ${styles.main}`}>
			<div className={`px-6 py-4 text-xl font-bold ${styles.panel}`}>
				<h1>Login</h1>

				{
					!submitting ?
						<Box
							sx={{
								mt: 3
							}}
							component="form"
							autoComplete="off"
							onSubmit={handleSubmit}>
							<TextField
								required
								fullWidth
								label="Username"
								size='small'
								sx={{ mb: 3 }}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								required
								fullWidth
								label="Password"
								type="password"
								size='small'
								sx={{ mb: 3 }}
								InputLabelProps={{
									shrink: true,
								}}
							/>
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
