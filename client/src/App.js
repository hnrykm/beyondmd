import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Nav from './components/ButtonAppBar';
import { CssBaseline } from '@mui/material';

const App = () => {
	return (
		<div>
			<CssBaseline>
				<Nav />
				<Routes>
					<Route exact path="/" element={<MainPage />} />
				</Routes>
			</CssBaseline>
		</div>
	);
};

export default App;
