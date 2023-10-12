import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import Footer from './components/Footer';
import { CssBaseline } from '@mui/material';

// Submissions to re-render the MainPage after a record is added.
// Symptoms fetched from APIMedic are available in the NavBar and MainPage.
const App = () => {
	const [submission, setSubmission] = useState({});
	const [symptoms, setSymptoms] = useState([]);

	// This should be in a .env file, however, for easier setup and access, I've posted it here.
	const APIMEDIC_API_KEY =
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEyOTI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIzLTA5LTIxIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2OTcwODQyMDMsIm5iZiI6MTY5NzA3NzAwM30.30-Or_JZPArxAQSrS12aux2jjY7osg9g0AKrIarN5hA';

	return (
		<div>
			<CssBaseline>
				<NavBar
					APIMEDIC_API_KEY={APIMEDIC_API_KEY}
					setSubmission={setSubmission} // Sets new submission
					symptoms={symptoms}
					setSymptoms={setSymptoms}
				/>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<MainPage
								APIMEDIC_API_KEY={APIMEDIC_API_KEY}
								submission={submission} // Re-renders record table
								symptoms={symptoms}
								setSymptoms={setSymptoms}
							/>
						}
					/>
				</Routes>
				<Footer />
			</CssBaseline>
		</div>
	);
};

export default App;
