import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MainPage = () => {
	const [records, setRecords] = useState([]);

	const fetchRecords = async () => {
		const url = 'http://localhost:8000/api/records/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setRecords(data.records);
		}
	};
	useEffect(() => {
		fetchRecords();
	}, []);

	return (
		<div>
			<Button variant="contained">Create New Record</Button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Examination Date</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Birth Year</TableCell>
							<TableCell>Gender</TableCell>
							<TableCell>Symptom</TableCell>
							<TableCell>Symptom</TableCell>
							<TableCell>Symptom</TableCell>
							<TableCell>Diagnosis</TableCell>
							<TableCell>Diagnosis</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{records &&
							records.map((record) => (
								<TableRow key={record.id}>
									<TableCell>{record.exam_date}</TableCell>
									<TableCell>{record.last_name}</TableCell>
									<TableCell>{record.first_name}</TableCell>
									<TableCell>{record.birth_year}</TableCell>
									<TableCell>{record.gender}</TableCell>
									<TableCell>{record.symptom_1}</TableCell>
									<TableCell>{record.symptom_2}</TableCell>
									<TableCell>{record.symptom_3}</TableCell>
									<TableCell>{record.diagnosis_1}</TableCell>
									<TableCell>{record.diagnosis_2}</TableCell>
									<TableCell>{record.status}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default MainPage;
