import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Nav from './components/Nav';

const App = () => {
	return (
		<div>
			<Nav />
			<Routes>
				<Route exact path="/" element={<MainPage />} />
			</Routes>
		</div>
	);
};

export default App;
