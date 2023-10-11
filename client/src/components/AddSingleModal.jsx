import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
export default function AddSingleModal({
	open,
	handleClose,
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
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							mb: 1,
						}}
					>
						<CloseIcon
							sx={{ fontSize: '2em', color: 'gray' }}
							onClick={handleClose}
						/>
					</Box>
					<Typography
						id="spring-modal-title"
						variant="h4"
						component="h4"
						sx={{ mb: 2 }}
					>
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
							<Button
								variant="outlined"
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
							<Button variant="contained" type="submit">
								Diagnose
							</Button>
						</Box>
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
}
