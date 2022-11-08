import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackgroundImage, Header } from '../components';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleAuth = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// alert('OK')
		} catch (error) {
			alert('Cannot sign in. Please try again');
			console.log(error);
		}
	};

	onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			navigate('/');
		}
	});

	return (
		<Container>
			<BackgroundImage />
			<div className='content'>
				<Header className='header' />
				<div className='form-container flex column a-center j-center'>
					<div className='form flex column a-center j-center'>
						<div className='title'>
							<h3>Login</h3>
						</div>
						<div className='container flex column'>
							<input
								type='email'
								placeholder='Email'
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
							<input
								type='password'
								placeholder='Password'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<button onClick={handleAuth} type='submit'>Login to your account</button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	position: relative;
	.content {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.5);
		.header {
			flex: 1;
		}
		.form-container {
			flex: 3;
			gap: 2rem;
			height: 85vh;
			.form {
				padding: 2rem;
				background-color: rgba(0, 0, 0, 0.7);
				width: 25vw;
				@media screen and (max-width: 768px) {
					width: 70%;
				}
				@media screen and (min-width: 769px) and (max-width: 900px) {
					width: 50%;
				}
				gap: 2rem;
				color: var(--white-netflix);
				.container {
					gap: 2rem;
					input {
						padding: 0.5rem 1rem;
						width: 15rem;
					}
					button {
						padding: 0.5rem 1rem;
						background-color: var(--red-netflix);
						border: none;
						cursor: pointer;
						color: var(--white-netflix);
						border-radius: 0.2rem;
						font-weight: bolder;
						font-size: 1rem;
					}
				}
			}
		}
	}
`;
