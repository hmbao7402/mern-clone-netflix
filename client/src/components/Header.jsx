import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = (props) => {
	const navigate = useNavigate();

	return (
		<Container className='flex a-center j-between'>
			<div className='logo'>
				<Link to='/'>
					<img src={logo} alt='logo' />
				</Link>
			</div>
			<button onClick={() => navigate(props.login ? '/login' : '/signup')}>
				{props.login ? 'Log In' : 'Sign Up'}
			</button>
		</Container>
	);
};

export default Header;

const Container = styled.header`
	padding: 0 4rem;

	.logo {
		img {
			height: 5rem;
		}
	}

	button {
		padding: 0.5rem 1rem;
		background-color: var(--red-netflix);
		border: none;
		cursor: pointer;
		color: var(--white-netflix);
		border-radius: 0.2rem;
		font-weight: bolder;
		font-size: 1.05rem;
	}
`;
