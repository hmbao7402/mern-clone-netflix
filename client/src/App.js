import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
	Login,
	SignUp,
	Netflix,
	Player,
	Movies,
	FavoriteList,
	TVShows,
} from './pages';

const App = () => {
	return (
		<Routes>
			<Route path='/login' exact element={<Login />} />
			<Route path='/signup' exact element={<SignUp />} />
			<Route path='/player/:type/:id' exact element={<Player />} />
			<Route path='/movies' exact element={<Movies />} />
			<Route path='/tv' exact element={<TVShows />} />
			<Route path='/favorite' exact element={<FavoriteList />} />
			<Route path='/' exact element={<Netflix />} />
		</Routes>
	);
};

export default App;
