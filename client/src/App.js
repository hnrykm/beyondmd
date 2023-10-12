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
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEwMzAwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMy0wOS0yMSIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY5NzEyNjQ3OCwibmJmIjoxNjk3MTE5Mjc4fQ.F_rzNwe2tjGhq90PDeOFFEc4cVNpF2o7DpXpe0GeFyk';

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
