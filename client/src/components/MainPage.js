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

	const [formData, setFormData] = useState({
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
		const symptom1 = symptoms.find(
			(symptom) => symptom.Name === record.symptom_1
		);
		const symptom2 = symptoms.find(
			(symptom) => symptom.Name === record.symptom_2
		);
		setFormData({
			exam_date: dayjs(record.exam_date),
			first_name: record.first_name,
			last_name: record.last_name,
			birth_year: record.birth_year,
			is_male: record.is_male === true ? true : false,
			symptom_1: symptom1.ID,
			symptom_2: symptom2 ? symptom2.ID : '',
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
				console.log('Delete successful');
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
												<Button variant="outlined" size="small">
													View Details
												</Button>
											</TableCell>
											<TableCell>
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
							// onSubmit={submitHandlerDiagnosis}
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
											<MenuItem value={symptom.ID} key={symptom.ID}>
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
											<MenuItem value={symptom.ID} key={symptom.ID}>
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
		</div>
	);
};

export default MainPage;
