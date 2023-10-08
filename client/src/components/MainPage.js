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
			<Box sx={{ justifyContent: 'center' }}>
				<Box item sx={3}>
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
												<SvgIcon>
													<EditOutlinedIcon color="primary" />
												</SvgIcon>
												<Typography color="primary" sx={{ display: 'inline' }}>
													Edit
												</Typography>
												<SvgIcon>
													<DeleteOutlineOutlinedIcon sx={{ color: red[500] }} />
												</SvgIcon>
												<Typography
													sx={{
														color: red[500],
														display: 'inline',
														alignItems: 'center',
													}}
												>
													Delete
												</Typography>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</div>
	);
};

export default MainPage;
