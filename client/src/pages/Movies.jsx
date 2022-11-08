import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getGenres,
	fetchMovies,
	selectGenres,
	selectMovies,
	selectGenresLoaded,
} from '../features/movieSlice';
import { Navbar, NotAvailable, Slider } from '../components';
import { auth } from '../utils/firebase';

const Movies = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const genresLoaded = useSelector(selectGenresLoaded);
	const genres = useSelector(selectGenres);
	const movies = useSelector(selectMovies);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getGenres());
	}, []);

	useEffect(() => {
		if (genresLoaded) {
			dispatch(fetchMovies({ genres, type: 'movie' }));
		}
	}, [genresLoaded]);

	onAuthStateChanged(auth, (currentUser) => {
		if (!currentUser) navigate('/login');
	});

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};

	return (
		<Container>
			<div className='navbar'>
				<Navbar isScrolled={isScrolled} />
			</div>
			<div className='data'>
				{movies.length ? <Slider movies={movies} /> : <NotAvailable />}
			</div>
		</Container>
	);
};

export default Movies;

const Container = styled.div`
	.data {
		margin-top: 8rem;
		.not-available {
			text-align: center;
			color: var(--white-netflix);
			margin-top: 4rem;
		}
	}
`;
