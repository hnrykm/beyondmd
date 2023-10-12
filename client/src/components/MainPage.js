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
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Link } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { red } from '@mui/material/colors';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

import dayjs from 'dayjs';
import { Fade, style } from './Fade'; // Fading animation for modal/dialog boxes

const MainPage = ({ submission, symptoms, APIMEDIC_API_KEY }) => {
	// Holds the data for all the records in the database.
	const [records, setRecords] = useState([]);

	// Holds the name/names of the symptoms correlating with an ID.
	const [symptom1, setSymptom1] = useState('');
	const [symptom2, setSymptom2] = useState('');

	// Holds and handles data from changes made in the add/edit forms.
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
	const handleFormChange = async (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	// Controls "Edit Record" modal open/close status and actions.
	const [openEdit, setOpenEdit] = useState(false);
	const handleCloseEdit = () => setOpenEdit(false);
	const handleOpenEdit = (record) => {
		setOpenEdit(true);
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

	const handleUpdate = async (e) => {
		e.preventDefault();
		const symptoms = formData.symptom_2
			? `[${formData.symptom_1},${formData.symptom_2}]`
			: `[${formData.symptom_1}]`;
		const gender = JSON.parse(formData.is_male) ? 'male' : 'female';
		const birth_year = formData.birth_year;

		const url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms}&gender=${gender}&year_of_birth=${birth_year}&token=${APIMEDIC_API_KEY}&format=json&language=en-gb`;
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
			handleCloseEdit();
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
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
				<Box>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontWeight: 'bold' }}>
										Examination Date
									</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }}>
										Possible Diagnosis
									</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{records &&
									records.map((record) => (
										<TableRow key={record.id}>
											<TableCell sx={{ width: 170 }}>
												{record.exam_date}
											</TableCell>
											<TableCell sx={{ width: 150 }}>
												{record.last_name}
											</TableCell>
											<TableCell sx={{ width: 150 }}>
												{record.first_name}
											</TableCell>
											<TableCell sx={{ width: 70 }}>
												{dayjs().year() - record.birth_year}
											</TableCell>
											<TableCell sx={{ width: 400 }}>
												{record.diagnosis}
											</TableCell>
											<TableCell>
												<Button
													variant="outlined"
													size="small"
													sx={{ mr: 3 }}
													onClick={() => handleOpenDetails(record)}
												>
													View Details
												</Button>
												<Button onClick={() => handleOpenEdit(record)}>
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
				open={openEdit}
				onClose={handleCloseEdit}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						TransitionComponent: Fade,
					},
				}}
				sx={{ m: 6 }}
			>
				<Fade in={openEdit}>
					<Box sx={style}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<Link component="button">
								<CloseIcon
									sx={{ fontSize: '2em', color: 'gray' }}
									onClick={handleCloseEdit}
								/>
							</Link>
						</Box>
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
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<Link component="button">
								<CloseIcon
									sx={{ fontSize: '2em', color: 'gray' }}
									onClick={handleCloseDetails}
								/>
							</Link>
						</Box>
						<Typography
							id="spring-modal-title"
							variant="h4"
							component="h4"
							sx={{ mb: 2 }}
						>
							{formData.first_name} {formData.last_name}
						</Typography>
						<p>
							{formData.is_male === true ? 'Male' : 'Female'}, Born{' '}
							{formData.birth_year} (Age {dayjs().year() - formData.birth_year})
							<br />
							<Typography sx={{ fontStyle: 'italic' }}>
								Examined on {dayjs(formData.exam_date).format('MM/DD/YYYY')}
							</Typography>
						</p>
						{symptom2 ? 'Symptoms include:' : 'Symptom:'}
						<ul>
							<li>{symptom1}</li>
							{symptom2 ? <li>{symptom2}</li> : ''}
						</ul>
						{formData.diagnosis && formData.diagnosis.length === 1
							? 'Possible Diagnosis:'
							: 'Possible Diagnoses:'}
						<br />
						<ul>
							{formData.diagnosis &&
								formData.diagnosis.map((d, id) => <li key={id}>{d}</li>)}
						</ul>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default MainPage;
