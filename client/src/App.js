import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Nav from './components/ButtonAppBar';
import { CssBaseline } from '@mui/material';

const App = () => {
	const [submission, setSubmission] = useState({});

	return (
		<div>
			<CssBaseline>
				<Nav setSubmission={setSubmission} />
				<Routes>
					<Route
						exact
						path="/"
						element={<MainPage submission={submission} />}
					/>
				</Routes>
			</CssBaseline>
		</div>
	);
};

export default App;
