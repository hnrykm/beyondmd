import { AppBar, Box } from '@mui/material';

const Footer = () => {
	return (
		<Box sx={{ flexGrow: 1, mt: 20 }}>
			<AppBar
				position="static"
				sx={{ display: 'flex', alignItems: 'center', p: 3 }}
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
	);
};

export default Footer;
