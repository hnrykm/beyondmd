import { Backdrop, Box, Button, Link, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useCSVReader } from 'react-papaparse'; // For parsing the CSV file

export function AddMultipleModal({
	openMultiple,
	handleCloseMultiple,
	Fade,
	style,
	handleMultipleRecords,
	setMultipleRecords,
}) {
	// PapaParse CSV Reader
	const { CSVReader } = useCSVReader();

	return (
		<Modal
			open={openMultiple}
			onClose={handleCloseMultiple}
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
			<Fade in={openMultiple}>
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
								onClick={handleCloseMultiple}
							/>
						</Link>
					</Box>
					<Typography
						variant="h4"
						component="h4"
						sx={{
							mb: 2,
						}}
					>
						Add Multiple Records
					</Typography>
					<Typography
						sx={{
							backgroundColor: 'rgb(255,243,205)',
							p: 2,
							mb: 2,
						}}
					>
						{/* Yellow box to offer sample.csv file for download */}
						<a href="assets/sample.csv" className="no-underline">
							Download sample.csv to test functionality
						</a>
					</Typography>
					<CSVReader
						// Copies CSV "results" to "multipleRecords"
						onUploadAccepted={(results) => {
							setMultipleRecords(results.data);
						}}
					>
						{({ getRootProps, acceptedFile, getRemoveFileProps }) => (
							<>
								<div
									style={{
										alignItems: 'center',
									}}
								>
									{/* "Upload CSV File" button to upload from computer */}
									<Button
										variant="contained"
										startIcon={<CloudUploadIcon />}
										{...getRootProps()}
										sx={{
											width: '334px',
										}}
									>
										Upload CSV File
									</Button>
									{/* If there is a CSV file selected, remove button is visible */}
									{acceptedFile ? (
										<div>
											<Button
												variant="outlined"
												{...getRemoveFileProps()}
												sx={{
													mt: 1,
													width: '334px',
												}}
												size="small"
											>
												Remove {acceptedFile.name}
											</Button>{' '}
										</div>
									) : (
										''
									)}
								</div>
							</>
						)}
					</CSVReader>
					{/* "Add Multiple Records" button to process the CSV data */}
					<Button
						variant="contained"
						color="teal"
						onClick={handleMultipleRecords}
						sx={{
							mt: 3,
						}}
					>
						Add Multiple Records
					</Button>
				</Box>
			</Fade>
		</Modal>
	);
}
