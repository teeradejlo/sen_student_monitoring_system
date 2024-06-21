'use client';

import { useState } from "react";

import { styled } from '@mui/material/styles';
import { FormControl, TextField, Button } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	width: '100%',
	whiteSpace: 'nowrap',
});

export default function FileBox(props) {

	const formatLabel = (val) => {
		return val
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const [file, setFile] = useState(null);
	const [invalid, setInvalid] = useState(false);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		setInvalid(false);
	};

	const handleInvalid = () => {
		setInvalid(true);
	};

	return (
		<FormControl fullWidth sx={{ mb: 3, display: 'flex', flexDirection: "row" }}>
			<TextField
				error={invalid}
				fullWidth
				label={formatLabel(props.title)}
				size='small'
				InputProps={{
					readOnly: true,
				}}
				InputLabelProps={{
					shrink: true,
				}}
				value={file === null ? "No file selected." : file.name}
			/>
			<Button
				disableRipple
				component="label"
				role={undefined}
				variant="contained"
				tabIndex={-1}
				size="small"
				sx={{
					px: 2
				}}
			>
				browse
				<VisuallyHiddenInput required type="file" accept=".csv" onChange={handleFileChange} onInvalid={handleInvalid} />
			</Button>
		</FormControl>
	);
}