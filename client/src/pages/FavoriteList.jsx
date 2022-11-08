import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMovies, getUserFavoriteMovies } from '../features/movieSlice';
import { Navbar, Card } from '../components';
import { auth } from '../utils/firebase';

const FavoriteList = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [email, setEmail] = useState(undefined);
	const movies = useSelector(selectMovies);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			setEmail(currentUser.email);
		} else {
			navigate('/login');
		}
	});

	useEffect(() => {
		if (email) {
			dispatch(getUserFavoriteMovies(email));
		}
	}, [email]);

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};

	return (
		<Container>
			<Navbar isScrolled={isScrolled} />
			<div className='content flex column'>
				<h1>My List</h1>
				<div className='grid flex'>
					{movies.map((movie, index) => {
						return (
							<Card movie={movie} index={index} key={movie.id} isLiked={true} />
						);
					})}
				</div>
			</div>
		</Container>
	);
};

export default FavoriteList;

const Container = styled.div`
	.content {
		margin: 2rem;
		margin-top: 8rem;
		gap: 3rem;
		h1 {
			margin-left: 3rem;
		}
		.grid {
			flex-wrap: wrap;
			gap: 1rem;
		}
		@media screen and (max-width: 768px) {
			margin-left: 5px;
			h1 {
				margin-left: 25px;
			}
			.grid {
				gap: 0.5rem;
				align-items: center;
				justify-content: center;
			}
		}
		@media screen and (max-width: 450px) {
			.grid {
				margin-left: 2.25rem;
				margin-right: 2.25rem;
				justify-content: space-between;
			}
		}
	}
`;
