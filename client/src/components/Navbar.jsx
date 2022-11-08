import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaPowerOff } from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import logo from '../assets/logo.png';

const Navbar = ({ isScrolled }) => {
	const navigate = useNavigate();
	const [showSearch, setShowSearch] = useState(false);
	const [inputHover, setInputHover] = useState(false);

	const links = [
		{ name: 'Home', link: '/' },
		{
			name: 'TV Shows',
			link: '/tv',
		},
		{
			name: 'Movies',
			link: '/movies',
		},
		{
			name: 'My List',
			link: '/favorite',
		},
	];

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				navigate('/signup');
			}
		});
	}, []);

	return (
		<Container>
			<nav
				className={`flex j-between a-center ${isScrolled ? 'scrolled' : ''}`}
			>
				{/* Left nav */}
				<div className='left flex a-center'>
					<div className='brand flex a-center j-center'>
						<img src={logo} alt='' />
					</div>
					<ul className='links flex'>
						{links.map(({ name, link }) => {
							return (
								<li key={name}>
									<Link to={link}>{name}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{/* right nav */}
				<div className='right flex a-center'>
					<div
						className={`search flex a-center j-center ${
							showSearch ? 'show-search' : ''
						}`}
					>
						<button
							onFocus={() => setShowSearch(true)}
							onBlur={() => {
								if (!inputHover) {
									setShowSearch(false);
								}
							}}
						>
							<FaSearch />
						</button>
						<input
							type='text'
							placeholder='Search'
							onMouseEnter={() => setInputHover(true)}
							onMouseLeave={() => setInputHover(false)}
							onBlur={() => {
								setShowSearch(false);
								setInputHover(false);
							}}
						/>
					</div>
					<button onClick={() => signOut(auth)}>
						<FaPowerOff />
					</button>
				</div>
			</nav>
		</Container>
	);
};

export default Navbar;

const Container = styled.div`
	.scrolled {
		background-color: var(--black-netflix);
	}
	nav {
		position: fixed;
		top: 0;
		height: 6.5rem;
		width: 100%;
		z-index: 2;
		padding: 0 4rem;
		transition: 0.3s ease-in-out;
		/* left styled */
		.left {
			gap: 2rem;
			.brand {
				img {
					height: 4rem;
				}
			}

			.links {
				list-style-type: none;
				gap: 2rem;
				li {
					a {
						color: var(--white-netflix);
						text-decoration: none;
						&:hover {
							color: lightgrey;
						}
					}
				}
				@media screen and (max-width: 768px) {
					gap: 0.6rem;
					li {
						font-size: 13px;
					}
				}
			}
			@media screen and (max-width: 768px) {
				.brand {
					display: none;
				}
			}
		}
		/* right styled */
		.right {
			gap: 1rem;
			button {
				background-color: transparent;
				border: none;
				cursor: pointer;
				&:focus {
					outline: none;
				}
				svg {
					color: #f34242;
					font-size: 1.2rem;
				}
			}
			.search {
				gap: 0.4rem;
				padding: 0.2rem;
				padding-left: 0.5rem;
				button {
					background-color: transparent;
					svg {
						color: var(--white-netflix);
					}
				}
				input {
					width: 0;
					opacity: 0;
					visibility: hidden;
					transition: 0.3s ease-in-out;
					background-color: transparent;
					color: var(--white-netflix);
					border: none;
					&:focus {
						outline: none;
					}
				}
			}
			/* show search */
			.show-search {
				border: 1px solid var(--white-netflix);
				background-color: rgba(0, 0, 0, 0.6);
				border-radius: 2rem;
				input {
					width: 100%;
					opacity: 1;
					visibility: visible;
					padding: 0.3rem;
				}
			}
		}
		@media screen and (max-width: 768px) {
			justify-content: space-between;
			padding: 0 2rem;
		}
	}
`;
