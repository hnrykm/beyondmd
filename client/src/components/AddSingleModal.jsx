import {
	Backdrop,
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Link,
	MenuItem,
	Modal,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Handles the examination date field
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';

import dayjs from 'dayjs'; // For datetime formatting

export default function AddSingleModal({
	openSingle,
	handleCloseSingle,
	Fade,
	style,
	submitHandlerDiagnosis,
	formData,
	handleFormChange,
	symptoms,
	setSymptom1,
	setSymptom2,
	setFormData,
}) {
	return (
		<Modal
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
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Link component="button">
							<CloseIcon
								sx={{ fontSize: '2em', color: 'gray' }}
								onClick={handleCloseSingle}
							/>
						</Link>
					</Box>
					<Typography variant="h4" component="h4" sx={{ mb: 2 }}>
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
						{/* Examination Date Field */}
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
						{/* First Name Field */}
						<TextField
							required
							label="First Name"
							variant="outlined"
							size="small"
							name="first_name"
							value={formData.first_name}
							onChange={handleFormChange}
						/>
						{/* LastName Field */}
						<TextField
							required
							label="Last Name"
							variant="outlined"
							size="small"
							name="last_name"
							value={formData.last_name}
							onChange={handleFormChange}
						/>
						{/* Birth Year Field */}
						<TextField
							required
							type="number"
							max="2500"
							label="Birth Year"
							variant="outlined"
							size="small"
							name="birth_year"
							value={formData.birth_year}
							onChange={handleFormChange}
						/>
						{/* Gender Radio Buttons */}
						<FormControl sx={{ pl: 1.5 }}>
							<FormLabel>Gender *</FormLabel>
							<RadioGroup row name="is_male">
								<FormControlLabel
									value={true}
									control={
										<Radio
											onClick={handleFormChange}
											checked={formData.is_male === 'true'}
										/>
									}
									label="Male"
								/>
								<FormControlLabel
									value={false}
									control={
										<Radio
											onClick={handleFormChange}
											checked={formData.is_male === 'false'}
										/>
									}
									label="Female"
								/>
							</RadioGroup>
						</FormControl>
						{/* Primary Symptom Dropdown */}
						<FormControl fullWidth>
							<TextField
								required={true}
								select
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
						{/* Secondary Symptom Dropdown */}
						<FormControl fullWidth>
							<TextField
								select
								label="Secondary Symptom (Optional)"
								name="symptom_2"
								value={formData.symptom_2}
								onChange={handleFormChange}
							>
								<MenuItem value="">Secondary Symptom (Optional)</MenuItem>
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
							{/* Reset and Submit buttons */}
							<Button
								variant="outlined"
								color="teal"
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
							<Button variant="contained" color="teal" type="submit">
								Diagnose
							</Button>
						</Box>
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
}
