'use client';

import { useState } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox(props) {

	const formatLabel = (val) => {
		return val
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const handleInvalid = () => {
		setInvalid(true);
	};

	const handleChange = (e) => {
		setInvalid(false);
	};

	const [invalid, setInvalid] = useState(false);

	return (
		<FormControl error={invalid} fullWidth sx={{ mb: 3 }}>
			<InputLabel shrink id={`select-${props.title}-label`}>{formatLabel(props.title)}</InputLabel>
			<Select
				required
				notched
				labelId={`select-${props.title}-label`}
				label={formatLabel(props.title)}
				id={`select-${props.title}`}
				name={`select-${props.title}`}
				onInvalid={handleInvalid}
				onChange={handleChange}
				defaultValue={""}
				size="small"
			>
				{
					props.options.length === 0 ?
						(
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
						)
						: props.options.map((el) => (
							<MenuItem key={el} value={el}>{el}</MenuItem>
						))
				}
			</Select>
		</FormControl>
	);
}