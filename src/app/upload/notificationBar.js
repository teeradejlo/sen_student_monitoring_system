'use client';

import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';

export default function NotificationBar(props) {
	return (
		<Stack sx={{ mt: 3, width: '30%', minWidth: '300px' }} spacing={2}>
			{
				props.notifications.map((el) => (
					<Grow key={el.id} in={true} easing="cubic-bezier(0.4, 0, 0.2, 1)">
						<Alert variant="filled" severity={el.severity}>{el.text}</Alert>
					</Grow>
				))
			}
		</Stack>
	);
}