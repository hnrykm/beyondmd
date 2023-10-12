import { AppBar, Box } from '@mui/material';

const Footer = () => {
	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', minHeight: '50vh' }}
		>
			<Box sx={{ display: 'flex', flexGrow: 1, mt: 20 }}>
				<AppBar
					position="static"
					sx={{
						display: 'flex',
						alignItems: 'center',
						alignSelf: 'flex-end',
						p: 3,
					}}
					style={{ background: '#00254B' }}
				>
					<a href="http://localhost:8080">
						<img
							src="assets/logo.png"
							alt="beyond md logo"
							height="30px"
							className="logo"
						/>
					</a>
				</AppBar>
			</Box>
		</div>
	);
};

export default Footer;
