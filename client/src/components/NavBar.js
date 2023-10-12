import { ViewResumeModal } from './ViewResumeModal';
import { AddMultipleModal } from './AddMultipleModal';
import React, { useState, useEffect } from 'react';

// Material UI
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { alpha, createTheme, getContrastRatio } from '@mui/material/styles';

import { ThemeProvider } from '@emotion/react';

import dayjs from 'dayjs'; // For datetime formatting
import AddSingleModal from './AddSingleModal'; // Add single record modal component
import { Fade, style } from './Fade'; // Fading animation for modal/dialog boxes

// Custom MUI theme for the teal buttons
const tealBase = '#00B295';
const tealMain = alpha(tealBase, 0.7);
const theme = createTheme({
	palette: {
		teal: {
			main: '#00B295',
			light: alpha(tealBase, 0.5),
			dark: alpha(tealBase, 0.9),
			contrastText: getContrastRatio(tealMain, '#fff') > 2.5 ? '#fff' : '#111',
		},
	},
});

const NavBar = ({ setSubmission, symptoms, setSymptoms, APIMEDIC_API_KEY }) => {
	// Holds the name/names of the symptoms correlating with an ID.
	const [symptom1, setSymptom1] = useState('');
	const [symptom2, setSymptom2] = useState('');

	// Controls "Add Single Record" modal open/close status and actions.
	const [openSingle, setOpenSingle] = useState(false);
	const handleOpenSingle = () => setOpenSingle(true);
	const handleCloseSingle = () => setOpenSingle(false);

	// Controls "Add Multiple Records" modal open/close status and actions.
	const [openMultiple, setOpenMultiple] = useState(false);
	const handleOpenMultiple = () => setOpenMultiple(true);
	const handleCloseMultiple = () => setOpenMultiple(false);

	// Controls "View Resume" modal open/close status and actions.
	const [openResume, setOpenResume] = useState(false);
	const handleOpenResume = () => setOpenResume(true);
	const handleCloseResume = () => setOpenResume(false);

	// Holds all parsed data from the uploaded CSV file
	const [multipleRecords, setMultipleRecords] = useState([]);

	// Holds and handles data from changes made in the add/edit forms.
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
	const handleFormChange = async (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	// Fetches a list of symptoms from API Medic to populate the form dropdown fields.
	useEffect(() => {
		const fetchSymptoms = async () => {
			const url = `https://sandbox-healthservice.priaid.ch/symptoms?token=${APIMEDIC_API_KEY}&format=json&language=en-gb`;
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				setSymptoms(data);
			}
		};
		fetchSymptoms();
	});

	// Multi-step process to use the symptoms to fetch a diagnosis and create a single record.
	// Step 1: Using the selected symptom(s), gender, and age, get a diagnosis from API Medic.
	const handleSingleRecord = async (e) => {
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

			// Step 3: Make a POST request, clear the form data, re-render with setSubmission, and close the modal.
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
			handleCloseSingle();
		}
	};

	// Multi-step process to use the symptoms to fetch a diagnosis and create multiple records.
	// Step 1: Using the data from the CSV file, get a diagnosis from API Medic.
	const handleMultipleRecords = async (e) => {
		e.preventDefault();

		// Loop over each record to fetch a diagnosis and create a record for each row.
		// For loop is used because async doesn't work with a map function.
		for (const record of multipleRecords) {
			const birth_year = record[3];
			const is_male = record[4];
			const symptom_1 = record[5];
			const symptom_2 = record[6];
			const theSymptoms = symptom_2
				? `[${symptom_1},${symptom_2}]`
				: `[${symptom_1}]`;
			const gender = is_male === 'TRUE' ? 'male' : 'female';
			const url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${theSymptoms}&gender=${gender}&year_of_birth=${birth_year}&token=${APIMEDIC_API_KEY}&format=json&language=en-gb`;
			const response = await fetch(url);

			// Step 2: Extract the diagnosis name from the response and prepare a POST request.
			// Use the symptoms list to find the Name of the diagnosis using the ID.
			if (response.ok) {
				const data = await response.json();
				const diagnoses = data.map((diagnosis) => diagnosis.Issue.ProfName);
				const symptomName1 = symptoms.find(
					(symptom) => symptom.ID === Number(symptom_1)
				);
				const symptomName2 = symptoms.find(
					(symptom) => symptom.ID === Number(symptom_2)
				);
				let postData = {};
				postData.exam_date = dayjs(record[0]).format('YYYY-MM-DD').toString();
				postData.first_name = record[1];
				postData.last_name = record[2];
				postData.birth_year = Number(birth_year);
				postData.is_male = is_male === 'TRUE' ? true : false;
				postData.symptom_1 = symptomName1 ? symptomName1.Name : '';
				postData.symptom_2 = symptomName2 ? symptomName2.Name : '';
				postData.diagnosis = diagnoses.join(', ');

				// Step 3: Make a POST request and clear the data cache to process the next row.
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
					postData = {};
				}
			}
		}
		// When all the records have been processed, re-render with setSubmission, and closet the modal.
		setSubmission(multipleRecords);
		handleCloseMultiple();
	};

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" sx={{ p: 2 }} style={{ background: '#fff' }}>
					<Toolbar>
						<a href="http://localhost:8080">
							<img
								src="assets/logo.png"
								alt="beyond md logo"
								height="30px"
								className="logo"
							/>
						</a>
						<h1 className="blue" margin-right="5rem">
							Hello <span className="navy">Beyond</span>MD
							<span className="navy">!</span>
						</h1>
						<Box sx={{ ml: 10 }}>
							{/* "Add Single Record" button and modal component */}
							<Button
								variant="contained"
								color="teal"
								onClick={handleOpenSingle}
								sx={{ mr: 4 }}
							>
								Add Single Record
							</Button>
							<AddSingleModal
								openSingle={openSingle}
								handleCloseSingle={handleCloseSingle}
								Fade={Fade}
								style={style}
								handleSingleRecord={handleSingleRecord}
								formData={formData}
								handleFormChange={handleFormChange}
								symptoms={symptoms}
								setSymptom1={setSymptom1}
								setSymptom2={setSymptom2}
								setFormData={setFormData}
							/>
							{/* "Add Multiple Records" button and modal component */}
							<Button
								variant="contained"
								color="teal"
								onClick={handleOpenMultiple}
								sx={{ mr: 3 }}
							>
								Add Multiple Records
							</Button>
							<AddMultipleModal
								openMultiple={openMultiple}
								handleCloseMultiple={handleCloseMultiple}
								Fade={Fade}
								style={style}
								handleMultipleRecords={handleMultipleRecords}
								setMultipleRecords={setMultipleRecords}
							/>
							{/* "View Resume" button and modal component */}
							<Button
								variant="contained"
								color="teal"
								onClick={handleOpenResume}
							>
								View Resume
							</Button>
							<ViewResumeModal
								openResume={openResume}
								handleCloseResume={handleCloseResume}
								Fade={Fade}
							/>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
		</ThemeProvider>
	);
};

export default NavBar;
