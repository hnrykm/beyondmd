import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import SingleRecordForm from './SingleRecordForm';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

const Fade = React.forwardRef(function Fade(props, ref) {
	const {
		children,
		in: open,
		onClick,
		onEnter,
		onExited,
		ownerState,
		...other
	} = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter(null, true);
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited(null, true);
			}
		},
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{React.cloneElement(children, { onClick })}
		</animated.div>
	);
});

Fade.propTypes = {
	children: PropTypes.element.isRequired,
	in: PropTypes.bool,
	onClick: PropTypes.any,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
	ownerState: PropTypes.any,
};

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function ButtonAppBar() {
	const [symptoms, setSymptoms] = useState([]);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const fetchRecords = async () => {
		const url =
			'https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEyOTI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIzLTA5LTIxIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2OTY2ODU0MjYsIm5iZiI6MTY5NjY3ODIyNn0.vLqMZEJaDceGJkb3AW7_JtzHg3Vi1ANgmucEBBLE_2I&format=json&language=en-gb';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setSymptoms(data);
		}
	};
	useEffect(() => {
		fetchRecords();
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<img
						src="assets/beyondmdlogo.png"
						alt="beyond md logo"
						height="30px"
					/>
					<Button color="inherit" onClick={handleOpen}>
						Add Single Record
					</Button>
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						open={open}
						onClose={handleClose}
						closeAfterTransition
						slots={{ backdrop: Backdrop }}
						slotProps={{
							backdrop: {
								TransitionComponent: Fade,
							},
						}}
						sx={{ m: 6 }}
					>
						<Fade in={open}>
							<Box sx={style}>
								<Typography
									id="spring-modal-title"
									variant="h4"
									component="h4"
									sx={{ mb: 2 }}
								>
									Add a Single Record
								</Typography>
								<Box
									component="form"
									sx={{
										'& > :not(style)': { m: 1, width: '35ch' },
									}}
									noValidate
									autoComplete="off"
								>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DateField']}>
											<DateField
												fullWidth
												label="Examination Date"
												size="small"
											/>
										</DemoContainer>
									</LocalizationProvider>
									<TextField
										id="outlined-basic"
										label="First Name"
										variant="outlined"
										size="small"
									/>
									<TextField
										id="outlined-basic"
										label="Last Name"
										variant="outlined"
										size="small"
									/>
									<TextField
										id="outlined-basic"
										label="Birth Year"
										variant="outlined"
										size="small"
									/>
									<FormControl sx={{ pl: 1.5 }}>
										<FormLabel id="demo-row-radio-buttons-group-label">
											Gender
										</FormLabel>
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
										>
											<FormControlLabel
												value="Male"
												control={<Radio />}
												label="Male"
											/>
											<FormControlLabel
												value="Female"
												control={<Radio />}
												label="Female"
											/>
										</RadioGroup>
									</FormControl>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											Select Primary Symptom
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											// value={age}
											label="Age"
											// onChange={handleChange}
											// size="small"
										>
											{symptoms &&
												symptoms.map((symptom) => (
													<MenuItem value={10}>{symptom.Name}</MenuItem>
												))}
										</Select>
									</FormControl>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											Select Symptom (Optional)
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											// value={age}
											label="Age"
											// onChange={handleChange}
											// size="small"
										>
											{symptoms &&
												symptoms.map((symptom) => (
													<MenuItem value={10}>{symptom.Name}</MenuItem>
												))}
										</Select>
									</FormControl>
									{/* <TextField
										id="outlined-basic"
										label="Examination Date"
										variant="outlined"
										size="small"
									/> */}

									<Box sx={{ pt: 1, justifyContent: 'flex-end' }}>
										<Button variant="outlined" sx={{ mr: 2 }}>
											Reset
										</Button>
										<Button variant="contained">Diagnose</Button>
									</Box>
								</Box>
							</Box>
						</Fade>
					</Modal>
					<Button color="inherit">Add Multiple Records</Button>
					<Button color="inherit">View Resume</Button>
					<Button color="inherit">Logout</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
