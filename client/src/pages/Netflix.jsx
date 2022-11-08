import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Slider } from '../components';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import background from '../assets/home.jpg';
import movieLogo from '../assets/homeTitle.webp';
import {
	fetchMovies,
	getGenres,
	selectGenres,
	selectMovies,
	selectGenresLoaded,
} from '../features/movieSlice';
import { auth } from '../utils/firebase';

const Netflix = () => {
	const navigate = useNavigate();
	const [isScrolled, setIsScrolled] = useState(false);
	const genresLoaded = useSelector(selectGenresLoaded);
	const genres = useSelector(selectGenres);
	const movies = useSelector(selectMovies);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGenres());
	}, []);

	useEffect(() => {
		if (genresLoaded) {
			dispatch(fetchMovies({ genres, type: 'all' }));
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
			<Navbar isScrolled={isScrolled} />
			<div className='hero'>
				<img src={background} alt='main bg' className='background-image' />
				<div className='info-container'>
					<div className='logo'>
						<img src={movieLogo} alt='' />
					</div>
					<div className='buttons flex'>
						<button
							className='flex j-center a-center'
							onClick={() => navigate('/player/main/main')}
						>
							<FaPlay /> Play
						</button>
						<button className='flex j-center a-center'>
							<AiOutlineInfoCircle /> More Info
						</button>
					</div>
				</div>
			</div>
			<Slider movies={movies} />
		</Container>
	);
};

export default Netflix;

const Container = styled.div`
	background-color: var(--black-netflix);
	.hero {
		position: relative;
		.background-image {
			height: 100%;
			filter: brightness(60%);
		}
		img {
			height: 100vh;
			width: 100vw;
		}
		.info-container {
			position: absolute;
			bottom: 5rem;
			.logo {
				img {
					width: 100%;
					height: 100%;
					margin-left: 5rem;
				}
			}
			.buttons {
				margin: 5rem;
				gap: 2rem;
				button {
					font-size: 1.4rem;
					gap: 1rem;
					border-radius: 0.2rem;
					padding: 0.5rem;
					padding-left: 2rem;
					padding-right: 2.4rem;
					border: none;
					cursor: pointer;
					transition: 0.3s ease-in-out;
					&:hover {
						opacity: 0.8;
					}
					&:nth-of-type(2) {
						background-color: rgba(109, 109, 110, 0.7);
						color: var(--white-netflix);
						svg {
							font-size: 1.8rem;
						}
					}
				}
			}
		}
		@media screen and (max-width: 768px) {
			height: 45vh;
			/* width: 100vw; */
			.info-container {
				bottom: 0.5rem;
				.logo {
					img {
						width: 50%;
						height: 50%;
						margin-left: 1rem;
					}
				}
				.buttons {
					margin: 1rem;
					gap: 1rem;
					button {
						font-size: 0.8rem;
						border-radius: 0.2rem;
						padding: 0.5rem;
						padding-left: 1.5rem;
						padding-right: 1.9rem;
					}
				}
			}
		}
	}
`;
