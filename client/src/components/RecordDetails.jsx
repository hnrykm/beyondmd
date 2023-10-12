import React from 'react';
import { Modal, Backdrop, Box, Link, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import dayjs from 'dayjs';

// Displays additional details for the record
export function RecordDetails({
	openDetails,
	handleCloseDetails,
	Fade,
	style,
	symptom2,
	symptom1,
	formData,
}) {
	return (
		<Modal
			open={openDetails}
			onClose={handleCloseDetails}
			closeAfterTransition
			slots={{
				backdrop: Backdrop,
			}}
			slotProps={{
				backdrop: {
					TransitionComponent: Fade,
				},
			}}
			sx={{
				m: 6,
			}}
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
								sx={{
									fontSize: '2em',
									color: 'gray',
								}}
								onClick={handleCloseDetails}
							/>
						</Link>
					</Box>
					<Typography
						id="spring-modal-title"
						variant="h4"
						component="h4"
						sx={{
							mb: 2,
						}}
					>
						{formData.first_name} {formData.last_name}
					</Typography>
					<Box>
						{formData.is_male === true ? 'Male' : 'Female'}, Born{' '}
						{formData.birth_year} (Age {dayjs().year() - formData.birth_year})
						<br />
						<Typography
							sx={{
								fontStyle: 'italic',
								mb: 2,
							}}
						>
							Examined on {dayjs(formData.exam_date).format('MM/DD/YYYY')}
						</Typography>
					</Box>
					{/* Symptoms and Diagnoses are in an unordered list */}
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
	);
}
