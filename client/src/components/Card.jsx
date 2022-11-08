import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { BiChevronDown } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { BACKEND_API } from '../utils/constants';
import { removeFromFavoriteMovies } from '../features/movieSlice';

const Card = ({ movie, index, isLiked = false }) => {
	const [isHovered, setIsHovered] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState(undefined);

	onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			setEmail(currentUser.email);
		} else {
			navigate('/login');
		}
	});

	const addMovieToFavoriteList = async () => {
		try {
			await axios.post(`${BACKEND_API}/api/user/add`, { email, data: movie });
		} catch (error) {
			console.log(error.message);
		}
	};

	// console.log('card', index)

	return (
		<Container
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.image}`}
				alt={movie.name}
				onClick={() => navigate(`/player/${movie.type}/${movie.id}`)}
			/>
			{isHovered ? (
				<div className='hover'>
					<div className='image-video-container'>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.image}`}
							alt={movie.name}
							onClick={() => navigate(`/player/${movie.type}/${movie.id}`)}
						/>
					</div>
					<div className='info-container flex column'>
						<h3
							className='name'
							onClick={() => navigate(`/player/${movie.type}/${movie.id}`)}
						>
							{movie.name}
						</h3>
						<div className='icons flex j-between'>
							<div className='controls flex'>
								<IoPlayCircleSharp
									title='Play'
									onClick={() => navigate(`/player/${movie.type}/${movie.id}`)}
								/>
								<RiThumbUpFill title='Like' />
								<RiThumbDownFill title='Dislike' />
								{isLiked ? (
									<BsCheck
										title='Remove from list'
										onClick={() =>
											dispatch(
												removeFromFavoriteMovies({ movieId: movie.id, email })
											)
										}
									/>
								) : (
									<AiOutlinePlus
										title='Add to my list'
										onClick={addMovieToFavoriteList}
									/>
								)}
							</div>
							<div className='info'>
								<BiChevronDown title='More Info' />
							</div>
						</div>
						<div className='genres flex'>
							<ul className='flex'>
								{movie.genres.map((genre) => {
									return <li key={genre}>{genre}</li>;
								})}
							</ul>
						</div>
					</div>
				</div>
			) : null}
		</Container>
	);
};

export default React.memo(Card);
// export default Card;

const Container = styled.div`
	max-width: 230px;
	width: 230px;
	@media screen and (max-width: 768px) {
		width: 150px;
		.hover {
			width: 10rem;
		}
	}
	height: 100%;
	cursor: pointer;
	position: relative;
	img {
		border-radius: 0.2rem;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	.hover {
		z-index: 90;
		height: max-content;
		width: 20rem;
		position: absolute;
		top: -18vh;
		left: 0;
		border-radius: 0.3rem;
		box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
		background-color: #181818;
		transition: 0.3s ease-in-out;
		.image-video-container {
			position: relative;
			height: 140px;
			img {
				width: 100%;
				height: 140px;
				object-fit: cover;
				border-radius: 0.3rem;
				top: 0;
				z-index: 4;
				position: absolute;
			}
		}
		.info-container {
			padding: 1rem;
			gap: 0.5rem;
		}
		.icons {
			.controls {
				display: flex;
				gap: 1rem;
			}
			svg {
				font-size: 2rem;
				cursor: pointer;
				transition: 0.3s ease-in-out;
				&:hover {
					color: #b8b8b8;
				}
			}
		}
		.genres {
			ul {
				gap: 1rem;
				li {
					padding-right: 0.7rem;
					&:first-of-type {
						list-style-type: none;
					}
				}
			}
		}
	}
`;
