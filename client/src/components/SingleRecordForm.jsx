// import Button from '@mui/material/Button';

// import { Box } from '@mui/material';
// import TextField from '@mui/material/TextField';

// import Backdrop from '@mui/material/Backdrop';
// import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';

// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// export default function SingleRecordForm() {
// 	return (
// 		<Modal
// 			disableEnforceFocus
// 			aria-labelledby="spring-modal-title"
// 			aria-describedby="spring-modal-description"
// 			open={open}
// 			onClose={handleClose}
// 			closeAfterTransition
// 			slots={{ backdrop: Backdrop }}
// 			slotProps={{
// 				backdrop: {
// 					TransitionComponent: Fade,
// 				},
// 			}}
// 			sx={{ m: 6 }}
// 		>
// 			<Fade in={open}>
// 				<Box sx={style}>
// 					<Typography
// 						id="spring-modal-title"
// 						variant="h4"
// 						component="h4"
// 						sx={{ mb: 2 }}
// 					>
// 						Add a Single Record
// 					</Typography>
// 					<Box
// 						component="form"
// 						sx={{
// 							'& > :not(style)': { m: 1, width: '35ch' },
// 						}}
// 						noValidate
// 						autoComplete="off"
// 					>
// 						<TextField
// 							id="outlined-basic"
// 							label="First Name"
// 							variant="outlined"
// 							size="small"
// 						/>
// 						<TextField
// 							id="outlined-basic"
// 							label="Last Name"
// 							variant="outlined"
// 							size="small"
// 						/>
// 						<TextField
// 							id="outlined-basic"
// 							label="Birth Year"
// 							variant="outlined"
// 							size="small"
// 						/>
// 						<FormControl sx={{ pl: 1.5 }}>
// 							<FormLabel id="demo-row-radio-buttons-group-label">
// 								Gender
// 							</FormLabel>
// 							<RadioGroup
// 								row
// 								aria-labelledby="demo-row-radio-buttons-group-label"
// 								name="row-radio-buttons-group"
// 							>
// 								<FormControlLabel
// 									value="Male"
// 									control={<Radio />}
// 									label="Male"
// 								/>
// 								<FormControlLabel
// 									value="Female"
// 									control={<Radio />}
// 									label="Female"
// 								/>
// 							</RadioGroup>
// 						</FormControl>
// 						<TextField
// 							id="outlined-basic"
// 							label="Select Primary Symptom"
// 							variant="outlined"
// 							size="small"
// 						/>
// 						<TextField
// 							id="outlined-basic"
// 							label="Select Symptom (Optional)"
// 							variant="outlined"
// 							size="small"
// 						/>
// 						<TextField
// 							id="outlined-basic"
// 							label="Examination Date"
// 							variant="outlined"
// 							size="small"
// 						/>
// 						<Box sx={{ pt: 1, justifyContent: 'flex-end' }}>
// 							<Button variant="outlined" sx={{ mr: 2 }}>
// 								Reset
// 							</Button>
// 							<Button variant="contained">Diagnose</Button>
// 						</Box>
// 					</Box>
// 				</Box>
// 			</Fade>
// 		</Modal>
// 	);
// }
