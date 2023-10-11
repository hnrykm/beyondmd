import React, { useState, useEffect, CSSProperties } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';

// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// import MenuItem from '@mui/material/MenuItem';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import AddSingleModal from './AddSingleModal';
import { Document, Page, pdfjs } from 'react-pdf';
import CloseIcon from '@mui/icons-material/Close';

// PapaParse
import {
	useCSVReader,
	lightenDarkenColor,
	formatFileSize,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
	DEFAULT_REMOVE_HOVER_COLOR,
	40
);
const GREY_DIM = '#686868';

const styles = {
	zone: {
		alignItems: 'center',
		border: `2px dashed ${GREY}`,
		borderRadius: 20,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'center',
		padding: 20,
	},
	file: {
		background: `linear-gradient(to bottom, ${GREY_LIGHT}, #DDD)`,
		borderRadius: 20,
		display: 'flex',
		height: 120,
		width: 120,
		position: 'relative',
		zIndex: 10,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	info: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: 10,
		paddingRight: 10,
	},
	size: {
		backgroundColor: GREY_LIGHT,
		borderRadius: 3,
		marginBottom: '0.5em',
		justifyContent: 'center',
		display: 'flex',
	},
	name: {
		backgroundColor: GREY_LIGHT,
		borderRadius: 3,
		fontSize: 12,
		marginBottom: '0.5em',
	},
	progressBar: {
		bottom: 14,
		position: 'absolute',
		width: '100%',
		paddingLeft: 10,
		paddingRight: 10,
	},
	zoneHover: {
		borderColor: GREY_DIM,
	},
	default: {
		borderColor: GREY,
	},
	remove: {
		height: 23,
		position: 'absolute',
		right: 6,
		top: 6,
		width: 23,
	},
};

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

export default function ButtonAppBar({ setSubmission, symptoms, setSymptoms }) {
	const APIMEDIC_API_KEY =
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEyOTI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIzLTA5LTIxIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2OTY5MzgwNjUsIm5iZiI6MTY5NjkzMDg2NX0.ckXKtX1zI8HFoyEXf3dwGd1lyxU8iotwjkW9G1icync';
	const API_MEDIC_API_KEY_DIAGNOSIS =
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEyOTI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIzLTA5LTIxIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2OTY5MzgwNjUsIm5iZiI6MTY5NjkzMDg2NX0.ckXKtX1zI8HFoyEXf3dwGd1lyxU8iotwjkW9G1icync';

	// const [symptoms, setSymptoms] = useState([]);
	const [symptom1, setSymptom1] = useState('');
	const [symptom2, setSymptom2] = useState('');

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [openSingle, setOpenSingle] = useState(false);
	// const handleOpenSingle = () => setOpenSingle(true);
	const handleCloseSingle = () => setOpenSingle(false);

	const [openMultiple, setOpenMultiple] = useState(false);
	const handleOpenMultiple = () => setOpenMultiple(true);
	const handleCloseMultiple = () => setOpenMultiple(false);

	const [openResume, setOpenResume] = useState(true);
	const handleOpenResume = () => setOpenResume(true);
	const handleCloseResume = () => setOpenResume(false);

	// PapaParse
	const { CSVReader } = useCSVReader();
	const [zoneHover, setZoneHover] = useState(false);
	const [removeHoverColor, setRemoveHoverColor] = useState(
		DEFAULT_REMOVE_HOVER_COLOR
	);

	const [multipleRecords, setMultipleRecords] = useState([]);

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

	const fetchSymptoms = async () => {
		const url = `https://sandbox-healthservice.priaid.ch/symptoms?token=${APIMEDIC_API_KEY}&format=json&language=en-gb`;
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setSymptoms(data);
		}
	};

	const handleFormChange = async (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const submitHandlerDiagnosis = async (e) => {
		e.preventDefault();
		const symptoms = formData.symptom_2
			? `[${formData.symptom_1},${formData.symptom_2}]`
			: `[${formData.symptom_1}]`;
		const gender = JSON.parse(formData.is_male) ? 'male' : 'female';
		const birth_year = formData.birth_year;
		const url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms}&gender=${gender}&year_of_birth=${birth_year}&token=${API_MEDIC_API_KEY_DIAGNOSIS}&format=json&language=en-gb`;
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
			handleClose();
		}
	};

	const handleMultipleRecords = async (e) => {
		e.preventDefault();
		for (const record of multipleRecords) {
			const birth_year = record[3];
			const is_male = record[4];
			const symptom_1 = record[5];
			const symptom_2 = record[6];
			const theSymptoms = symptom_2
				? `[${symptom_1},${symptom_2}]`
				: `[${symptom_1}]`;
			const gender = is_male === 'TRUE' ? 'male' : 'female';
			const url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${theSymptoms}&gender=${gender}&year_of_birth=${birth_year}&token=${API_MEDIC_API_KEY_DIAGNOSIS}&format=json&language=en-gb`;
			const response = await fetch(url);
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
		setSubmission(multipleRecords);
		handleCloseMultiple();
	};

	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

	useEffect(() => {
		fetchSymptoms();
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<img
						src="assets/beyondmdlogo.png"
						alt="beyond md logo"
						height="30px"
					/>
					<Button color="inherit" onClick={handleOpen}>
						Add Single Record
					</Button>

					<AddSingleModal
						open={open}
						handleClose={handleClose}
						Fade={Fade}
						style={style}
						submitHandlerDiagnosis={submitHandlerDiagnosis}
						formData={formData}
						handleFormChange={handleFormChange}
						symptoms={symptoms}
						setSymptom1={setSymptom1}
						setSymptom2={setSymptom2}
						setFormData={setFormData}
					/>

					<Button color="inherit" onClick={handleOpenMultiple}>
						Add Multiple Records
					</Button>

					{/* Add Multiple Records Modal */}
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						open={openMultiple}
						onClose={handleCloseMultiple}
						closeAfterTransition
						slots={{ backdrop: Backdrop }}
						slotProps={{
							backdrop: {
								TransitionComponent: Fade,
							},
						}}
						sx={{ m: 6 }}
					>
						<Fade in={openMultiple}>
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
										onClick={handleCloseMultiple}
									/>
								</Box>
								<Typography
									id="spring-modal-title"
									variant="h4"
									component="h4"
									sx={{ mb: 2 }}
								>
									Add Multiple Records
								</Typography>
								<a href="assets/sample.csv">
									Download sample.csv to test functionality.
								</a>
								<CSVReader
									onUploadAccepted={(results: any) => {
										setZoneHover(false);
										setMultipleRecords(results.data);
									}}
									onDragOver={(event: DragEvent) => {
										event.preventDefault();
										setZoneHover(true);
									}}
									onDragLeave={(event: DragEvent) => {
										event.preventDefault();
										setZoneHover(false);
									}}
								>
									{({
										getRootProps,
										acceptedFile,
										ProgressBar,
										getRemoveFileProps,
										Remove,
									}: any) => (
										<>
											<div
												{...getRootProps()}
												style={Object.assign(
													{},
													styles.zone,
													zoneHover && styles.zoneHover
												)}
											>
												{acceptedFile ? (
													<>
														<div style={styles.file}>
															<div style={styles.info}>
																<span style={styles.size}>
																	{formatFileSize(acceptedFile.size)}
																</span>
																<span style={styles.name}>
																	{acceptedFile.name}
																</span>
															</div>
															<div style={styles.progressBar}>
																<ProgressBar />
															</div>
															<div
																{...getRemoveFileProps()}
																style={styles.remove}
																onMouseOver={(event: Event) => {
																	event.preventDefault();
																	setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
																}}
																onMouseOut={(event: Event) => {
																	event.preventDefault();
																	setRemoveHoverColor(
																		DEFAULT_REMOVE_HOVER_COLOR
																	);
																}}
															>
																<Remove color={removeHoverColor} />
															</div>
														</div>
													</>
												) : (
													'Drop CSV file here or click to upload'
												)}
											</div>
										</>
									)}
								</CSVReader>
								<Button variant="contained" onClick={handleMultipleRecords}>
									Add Multiple Records
								</Button>
							</Box>
						</Fade>
					</Modal>

					{/* Resume Modal */}
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						open={openResume}
						onClose={handleCloseResume}
						closeAfterTransition
						slots={{ backdrop: Backdrop }}
						slotProps={{
							backdrop: {
								TransitionComponent: Fade,
							},
						}}
						sx={{ m: 6 }}
					>
						<Fade in={openResume}>
							<Box sx={style}>
								<a href="assets/henry-kim-resume.pdf">
									<Document file="assets/henry-kim-resume.pdf">
										<Page
											className="pdf-page"
											pageNumber={1}
											renderTextLayer={false}
											renderAnnotationLayer={false}
										/>
									</Document>
								</a>
								<Button variant="contained" onClick={handleCloseResume}>
									View Health Records
								</Button>
							</Box>
						</Fade>
					</Modal>
					<Button color="inherit" onClick={handleOpenResume}>
						View Resume
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
