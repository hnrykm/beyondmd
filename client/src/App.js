import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Nav from './components/ButtonAppBar';
import { CssBaseline } from '@mui/material';

const App = () => {
	const [submission, setSubmission] = useState({});
	const [symptoms, setSymptoms] = useState([]);

	return (
		<div>
			<CssBaseline>
				<Nav
					setSubmission={setSubmission}
					symptoms={symptoms}
					setSymptoms={setSymptoms}
				/>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<MainPage
								submission={submission}
								symptoms={symptoms}
								setSymptoms={setSymptoms}
							/>
						}
					/>
				</Routes>
			</CssBaseline>
		</div>
	);
};

export default App;
