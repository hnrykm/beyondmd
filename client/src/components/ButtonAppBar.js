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

export default function ButtonAppBar({ setSubmission }) {
	const [symptoms, setSymptoms] = useState([]);
	const [symptom1, setSymptom1] = useState('');
	const [symptom2, setSymptom2] = useState('');

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [openSingle, setOpenSingle] = useState(false);
	// const handleOpenSingle = () => setOpenSingle(true);
	const handleCloseSingle = () => setOpenSingle(false);

	const [formData, setFormData] = useState({
		exam_date: dayjs(),
		first_name: '',
		last_name: '',
		birth_year: '',
		is_male: true,
		symptom_1: '',
		symptom_2: '',
		diagnosis: '',
	});

	const fetchSymptoms = async () => {
		const api_medic_token =
			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEyOTI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIzLTA5LTIxIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2OTY3NjYwNTUsIm5iZiI6MTY5Njc1ODg1NX0.PI1euQZd_UOgQc-qCny_zM5_YKNhHKXiUEFu9MM9RRA';
		const url = `https://sandbox-healthservice.priaid.ch/symptoms?token=${api_medic_token}&format=json&language=en-gb`;
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setSymptoms(data);
		}
	};

	const handleFormChange = async (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const submitHandlerDiagnosis = async (e) => {
		e.preventDefault();
		console.log(formData);
		const symptoms = formData.symptom_2
			? `[${formData.symptom_1},${formData.symptom_2}]`
			: `[${formData.symptom_1}]`;
		const gender = JSON.parse(formData.is_male) ? 'male' : 'female';
		const birth_year = formData.birth_year;
		const api_medic_token =
			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEyOTI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIzLTA5LTIxIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2OTY3NjYwMzEsIm5iZiI6MTY5Njc1ODgzMX0.jC9yCAV5l60Vi5Ortshk_H8bazZwKapa661U-MxVmyw';
		const url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms}&gender=${gender}&year_of_birth=${birth_year}&token=${api_medic_token}&format=json&language=en-gb`;
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			console.log('returned data', data);
			console.log('Here are the two symptom names:', symptom1, symptom2);
			const diagnoses = data.map((diagnosis) => diagnosis.Issue.ProfName);

			const postData = {};
			postData.exam_date = dayjs(formData.exam_date)
				.format('YYYY-MM-DD')
				.toString();
			postData.first_name = formData.first_name;
			postData.last_name = formData.last_name;
			postData.birth_year = Number(formData.birth_year);
			postData.is_male = formData.is_male === 'true' ? true : false;
			postData.symptom_1 = symptom1;
			postData.symptom_2 = symptom2;
			postData.diagnosis = diagnoses.join(', ');
			console.log(JSON.stringify(postData));

			const recordUrl = 'http://localhost:8000/api/records/';
			const fetchConfig = {
				method: 'post',
				body: JSON.stringify(postData),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const postResponse = await fetch(recordUrl, fetchConfig);
			if (postResponse.ok) {
				setFormData({
					exam_date: dayjs(),
					first_name: '',
					last_name: '',
					birth_year: '',
					is_male: '',
					symptom_1: '',
					symptom_2: '',
					diagnosis: '',
				});
			}
			setSubmission(postData);
			handleClose();
		}
	};

	useEffect(() => {
		fetchSymptoms();
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

					{/* Add Single Record Modal */}
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
									autoComplete="off"
									onSubmit={submitHandlerDiagnosis}
								>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DateField']}>
											<DateField
												required
												fullWidth
												label="Examination Date"
												name="exam_date"
												size="small"
												value={formData.exam_date}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<TextField
										required
										id="outlined-basic"
										label="First Name"
										variant="outlined"
										size="small"
										name="first_name"
										value={formData.first_name}
										onChange={handleFormChange}
									/>
									<TextField
										required
										id="outlined-basic"
										label="Last Name"
										variant="outlined"
										size="small"
										name="last_name"
										value={formData.last_name}
										onChange={handleFormChange}
									/>
									<TextField
										required
										id="outlined-basic"
										type="number"
										max="2500"
										label="Birth Year"
										variant="outlined"
										size="small"
										name="birth_year"
										value={formData.birth_year}
										onChange={handleFormChange}
									/>
									<FormControl sx={{ pl: 1.5 }}>
										<FormLabel id="demo-row-radio-buttons-group-label">
											Gender *
										</FormLabel>
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="is_male"
										>
											<FormControlLabel
												value={true}
												control={<Radio />}
												label="Male"
												onChange={handleFormChange}
											/>
											<FormControlLabel
												value={false}
												control={<Radio />}
												label="Female"
												onChange={handleFormChange}
											/>
										</RadioGroup>
									</FormControl>
									<FormControl fullWidth>
										<TextField
											required={true}
											select
											id="demo-simple-select"
											label="Primary Symptom"
											name="symptom_1"
											value={formData.symptom_1}
											onChange={handleFormChange}
										>
											{symptoms &&
												symptoms.map((symptom) => (
													<MenuItem
														value={symptom.ID}
														key={symptom.ID}
														onClick={() => setSymptom1(symptom.Name)}
													>
														{symptom.Name}
													</MenuItem>
												))}
										</TextField>
									</FormControl>
									<FormControl fullWidth>
										<TextField
											select
											label="Secondary Symptom (Optional)"
											id="demo-simple-select"
											name="symptom_2"
											value={formData.symptom_2}
											onChange={handleFormChange}
										>
											{symptoms &&
												symptoms.map((symptom) => (
													<MenuItem
														value={symptom.ID}
														key={symptom.ID}
														onClick={() => setSymptom2(symptom.Name)}
													>
														{symptom.Name}
													</MenuItem>
												))}
										</TextField>
									</FormControl>
									<Box sx={{ pt: 1, justifyContent: 'flex-end' }}>
										<Button
											variant="outlined"
											sx={{ mr: 2 }}
											onClick={(e) => {
												setFormData({
													exam_date: dayjs(),
													first_name: '',
													last_name: '',
													birth_year: '',
													is_male: '',
													symptom_1: '',
													symptom_2: '',
													diagnosis: '',
												});
											}}
										>
											Reset
										</Button>
										<Button variant="contained" type="submit">
											Diagnose
										</Button>
									</Box>
								</Box>
							</Box>
						</Fade>
					</Modal>

					{/* Diagnosis Loaded Modal
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						open={openDiagnosis}
						onClose={handleCloseDiagnosis}
						closeAfterTransition
						slots={{ backdrop: Backdrop }}
						slotProps={{
							backdrop: {
								TransitionComponent: Fade,
							},
						}}
						sx={{ m: 6 }}
					>
						<Fade in={openDiagnosis}>
							<Box sx={style}>
								<Typography
									id="spring-modal-title"
									variant="h6"
									component="h6"
									sx={{ mb: 2 }}
									justifyContent="center"
								>
									Returned Diagnosis
								</Typography>
								<Typography variant="h2">
									{results.first_name} {results.last_name}
								</Typography>
								{results.is_male ? 'Male' : 'Female'}, Born{' '}
								{dayjs(results.birth_year).format('DD/MM/YYY')} (Age{' '}
								{dayjs().year() - results.birth_year}) Examined on{' '}
								{dayjs(results.exam_date)}
								<p>Symptoms include:</p>
								{{ symptom2 } ? `${symptom1}, ${symptom2}` : `${symptom1}`}
								<p>Possible Diagnoses:</p>
								{results.diagnoses}
							</Box>
						</Fade>
					</Modal>

					<Button color="inherit" onClick={handleOpenSingle}>
						Add Multiple Records
					</Button> */}

					{/* Add Multiple Records Modal */}
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						open={openSingle}
						onClose={handleCloseSingle}
						closeAfterTransition
						slots={{ backdrop: Backdrop }}
						slotProps={{
							backdrop: {
								TransitionComponent: Fade,
							},
						}}
						sx={{ m: 6 }}
					>
						<Fade in={openSingle}>
							<Box sx={style}>
								<Typography
									id="spring-modal-title"
									variant="h4"
									component="h4"
									sx={{ mb: 2 }}
								>
									Add Multiple Records
								</Typography>
								<Box>Upload a CSV file to add multiple records</Box>
								<Box
									component="form"
									sx={{
										'& > :not(style)': { m: 1, width: '35ch' },
									}}
									autoComplete="off"
									onSubmit={submitHandlerDiagnosis}
								>
									<Button>
										<input type="file" size="large" />
									</Button>
									<Box sx={{ pt: 1, justifyContent: 'flex-end' }}>
										<Button variant="outlined" sx={{ mr: 2 }}>
											Reset
										</Button>
										<Button variant="contained" type="submit">
											Upload
										</Button>
									</Box>
								</Box>
							</Box>
						</Fade>
					</Modal>
					<Button color="inherit">View Resume</Button>
					<Button color="inherit">Logout</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
