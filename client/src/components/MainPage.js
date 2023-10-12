import React, { useState, useEffect } from 'react';
import {
	Box,
	SvgIcon,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import { red } from '@mui/material/colors';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import dayjs from 'dayjs';
import { Fade, style } from './Fade'; // Fading animation for modal/dialog boxes

import { RecordDetails } from './RecordDetails';
import { EditModal } from './EditModal';

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
		// Use the symptoms list to find the ID of the diagnosis using the Name.
		const symptom1 = symptoms.find(
			(symptom) => symptom.Name === record.symptom_1
		);
		const symptom2 = symptoms.find(
			(symptom) => symptom.Name === record.symptom_2
		);
		// Prefills the form fields with the data for the record.
		setFormData({
			id: record.id,
			exam_date: dayjs(record.exam_date),
			first_name: record.first_name,
			last_name: record.last_name,
			birth_year: record.birth_year,
			is_male: record.is_male === true ? 'true' : 'false',
			symptom_1: symptom1 ? symptom1.ID : '',
			symptom_2: symptom2 ? symptom2.ID : '',
		});
	};

	// Controls "View Details" modal open/close status and actions.
	const [openDetails, setOpenDetails] = useState(false);
	const handleCloseDetails = () => setOpenDetails(false);
	const handleOpenDetails = (record) => {
		setOpenDetails(true);
		// Uses Symptom1, Symptom2 to display the symptom names.
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

	// Fetches up-to-date list of all records in the database.
	const fetchRecords = async () => {
		const url = 'http://localhost:8000/api/records/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setRecords(data.records);
		}
	};

	// Multi-step process to use the symptoms to fetch a diagnosis and update a single record.
	// Step 1: Using the selected symptom(s), gender, and age, get a diagnosis from API Medic.
	const handleUpdateRecord = async (e) => {
		e.preventDefault();
		const symptoms = formData.symptom_2
			? `[${formData.symptom_1},${formData.symptom_2}]`
			: `[${formData.symptom_1}]`;
		const gender = JSON.parse(formData.is_male) ? 'male' : 'female';
		const birth_year = formData.birth_year;
		const url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms}&gender=${gender}&year_of_birth=${birth_year}&token=${APIMEDIC_API_KEY}&format=json&language=en-gb`;
		const response = await fetch(url);

		// Step 2: Extract the diagnosis name from the response and prepare a POST request.
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

			// Step 3: Make a POST request, clear the form data, re-render with fetchRecords(), and close the modal.
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

	// Handles deleting a record and requires confirmation via a window.
	const handleDeleteRecord = async (id) => {
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
							{/* Maps over all the records and displays data on each row. */}
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
											{/* Actions include View Details, Edit, and Delete icons */}
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
														handleDeleteRecord(record.id);
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
			{/* Record Details Component */}
			<RecordDetails
				openDetails={openDetails}
				handleCloseDetails={handleCloseDetails}
				Fade={Fade}
				style={style}
				symptom2={symptom2}
				symptom1={symptom1}
				formData={formData}
			/>
			{/* Edit Modal Component */}
			<EditModal
				openEdit={openEdit}
				handleCloseEdit={handleCloseEdit}
				Fade={Fade}
				style={style}
				handleUpdateRecord={handleUpdateRecord}
				formData={formData}
				setFormData={setFormData}
				handleFormChange={handleFormChange}
				symptoms={symptoms}
				setSymptom1={setSymptom1}
				setSymptom2={setSymptom2}
			/>
		</div>
	);
};

export default MainPage;
