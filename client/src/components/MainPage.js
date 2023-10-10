import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, SvgIcon, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { red } from '@mui/material/colors';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';

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
import TextField from '@mui/material/TextField';

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

const MainPage = ({ submission, symptoms }) => {
	const [records, setRecords] = useState([]);
	const [symptom1, setSymptom1] = useState('');
	const [symptom2, setSymptom2] = useState('');

	const [formData, setFormData] = useState({
		id: 0,
		exam_date: dayjs(),
		first_name: '',
		last_name: '',
		birth_year: '',
		is_male: '',
		symptom_1: '',
		symptom_2: '',
		diagnosis: '',
	});

	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = (record) => {
		setOpen(true);
		setSymptom1(record.symptom_1);
		setSymptom2(record.symptom_2);
		const symptom1 = symptoms.find(
			(symptom) => symptom.Name === record.symptom_1
		);
		const symptom2 = symptoms.find(
			(symptom) => symptom.Name === record.symptom_2
		);
		setFormData({
			id: record.id,
			exam_date: dayjs(record.exam_date),
			first_name: record.first_name,
			last_name: record.last_name,
			birth_year: record.birth_year,
			is_male: record.is_male === true ? true : false,
			symptom_1: symptom1 ? symptom1.ID : '',
			symptom_2: symptom2 ? symptom2.ID : '',
		});
	};

	const [openDetails, setOpenDetails] = useState(false);
	const handleCloseDetails = () => setOpenDetails(false);
	const handleOpenDetails = (record) => {
		setOpenDetails(true);
		setSymptom1(record.symptom_1);
		setSymptom2(record.symptom_2);
		setFormData({
			id: record.id,
			exam_date: dayjs(record.exam_date),
			first_name: record.first_name,
			last_name: record.last_name,
			birth_year: record.birth_year,
			is_male: record.is_male === true ? true : false,
			symptom_1: symptom1 ? symptom1.ID : '',
			symptom_2: symptom2 ? symptom2.ID : '',
			diagnosis: record.diagnosis.split(','),
		});
	};

	const fetchRecords = async () => {
		const url = 'http://localhost:8000/api/records/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setRecords(data.records);
		}
	};

	const handleFormChange = async (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		const symptoms = formData.symptom_2
			? `[${formData.symptom_1},${formData.symptom_2}]`
			: `[${formData.symptom_1}]`;
		const gender = JSON.parse(formData.is_male) ? 'male' : 'female';
		const birth_year = formData.birth_year;
		const api_medic_token =
			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEyOTI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIzLTA5LTIxIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2OTY5MzgwNjUsIm5iZiI6MTY5NjkzMDg2NX0.ckXKtX1zI8HFoyEXf3dwGd1lyxU8iotwjkW9G1icync';
		const url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms}&gender=${gender}&year_of_birth=${birth_year}&token=${api_medic_token}&format=json&language=en-gb`;
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
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
			const recordUrl = `http://localhost:8000/api/records/${formData.id}`;
			const fetchConfig = {
				method: 'put',
				body: JSON.stringify(postData),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const postResponse = await fetch(recordUrl, fetchConfig);
			if (postResponse.ok) {
				setFormData({
					id: 0,
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
			fetchRecords();
			handleClose();
		}
	};
	const handleDelete = async (id) => {
		const userConfirmed = window.confirm(
			'Are you sure you want to delete this record?'
		);
		if (userConfirmed) {
			const url = `http://localhost:8000/api/records/${id}`;
			const fetchConfig = {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await fetch(url, fetchConfig);
			if (response.ok) {
				fetchRecords();
			}
		}
	};

	useEffect(() => {
		fetchRecords();
	}, [submission]);

	return (
		<div>
			<Box sx={{ justifyContent: 'center' }}>
				<Box>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Examination Date</TableCell>
									<TableCell>Last Name</TableCell>
									<TableCell>First Name</TableCell>
									<TableCell>Possible Diagnosis</TableCell>
									<TableCell>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{records &&
									records.map((record) => (
										<TableRow key={record.id}>
											<TableCell>{record.exam_date}</TableCell>
											<TableCell>{record.last_name}</TableCell>
											<TableCell>{record.first_name}</TableCell>
											<TableCell>{record.diagnosis}</TableCell>
											<TableCell>
												<Button
													variant="outlined"
													size="small"
													sx={{ mr: 3 }}
													onClick={() => handleOpenDetails(record)}
												>
													View Details
												</Button>
												<Button onClick={() => handleOpen(record)}>
													<SvgIcon>
														<EditOutlinedIcon color="primary" />
													</SvgIcon>
												</Button>
												<Button
													onClick={() => {
														handleDelete(record.id);
													}}
												>
													<SvgIcon>
														<DeleteOutlineOutlinedIcon
															sx={{ color: red[500] }}
														/>
													</SvgIcon>
												</Button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
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
							Edit Record
						</Typography>
						<Box
							component="form"
							sx={{
								'& > :not(style)': { m: 1, width: '35ch' },
							}}
							autoComplete="off"
							onSubmit={handleUpdate}
						>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={['DateField']}>
									<DateField
										required
										fullWidth
										label="Examination Date"
										name="exam_date"
										size="small"
										value={dayjs(formData.exam_date)}
										onChange={(value) =>
											setFormData({ ...formData, exam_date: value })
										}
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
										control={
											<Radio
												onClick={handleFormChange}
												checked={formData.is_male === true}
											/>
										}
										label="Male"
									/>
									<FormControlLabel
										value={false}
										control={
											<Radio
												onClick={handleFormChange}
												checked={formData.is_male === false}
											/>
										}
										label="Female"
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
									<MenuItem value="" onClick={() => setSymptom2('')}>
										Secondary Symptom (Optional)
									</MenuItem>
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
								<Button variant="contained" type="submit">
									Update
								</Button>
							</Box>
						</Box>
					</Box>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				open={openDetails}
				onClose={handleCloseDetails}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						TransitionComponent: Fade,
					},
				}}
				sx={{ m: 6 }}
			>
				<Fade in={openDetails}>
					<Box sx={style}>
						<Typography
							id="spring-modal-title"
							variant="h4"
							component="h4"
							sx={{ mb: 2 }}
						>
							Details
						</Typography>
						<p>
							{formData.first_name} {formData.last_name}
						</p>
						<p>
							{formData.is_male === true ? 'Male' : 'Female'}, Born{' '}
							{formData.birth_year} (Age {dayjs().year() - formData.birth_year})
						</p>
						<p>Examined on {dayjs(formData.exam_date).format('MM/DD/YYYY')}</p>
						Symptoms include:
						<ul>
							<li>{symptom1}</li>
							{symptom2 ? <li>{symptom2}</li> : ''}
						</ul>
						Possible Diagnoses:
						<br />
						<ul>
							{formData.diagnosis &&
								formData.diagnosis.map((d, id) => <li key="id">{d}</li>)}
						</ul>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default MainPage;
