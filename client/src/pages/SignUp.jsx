import React, { useState } from 'react';
import styled from 'styled-components';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { BackgroundImage, Header } from '../components';

const SignUp = () => {
	const navigate = useNavigate();
	const [showLogInForm, setShowLogInForm] = useState(false);
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});

	const handleAuth = async () => {
		try {
			const { email, password } = formValues;
			await createUserWithEmailAndPassword(auth, email, password);
			alert('Create new account successfully');
			setFormValues({
				email: '',
				password: '',
			});
		} catch (error) {
			alert('Create new account failed! Please try again!');
			setFormValues({
				email: '',
				password: '',
			});
			console.log(error);
		}
	};

	onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			navigate('/');
		}
	});

	return (
		<Container showPassword={showLogInForm}>
			<BackgroundImage />
			<div className='content'>
				<Header login className='header' />
				<div className='body flex column a-center j-center'>
					{/* TEXT CONTAINER */}
					<div className='text flex column'>
						<h1>Unlimited movies, TV shows and more</h1>
						<h4>Watch anywhere. Cancel anytime.</h4>
						<h6>
							Ready to watch? Enter your email to create or restart membership
						</h6>
					</div>
					{/* FORM CONTAINER */}
					<div className='form'>
						{showLogInForm && (
							<>
								<input
									type='email'
									placeholder='Email Address'
									name='email'
									value={formValues.email}
									onChange={(e) =>
										setFormValues({
											...formValues,
											[e.target.name]: e.target.value,
										})
									}
								/>
								<input
									type='password'
									placeholder='Password'
									name='password'
									value={formValues.password}
									onChange={(e) =>
										setFormValues({
											...formValues,
											[e.target.name]: e.target.value,
										})
									}
								/>
								<button onClick={handleAuth}>Sign Up</button>
							</>
						)}
						{!showLogInForm && (
							<button onClick={() => setShowLogInForm(true)}>
								Get Started
							</button>
						)}
					</div>
				</div>
			</div>
		</Container>
	);
};

export default SignUp;

const Container = styled.div`
	position: relative;
	.content {
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		.header {
			flex: 1;
		}
		.body {
			flex: 3;
			gap: 1rem;
			.text {
				gap: 1rem;
				text-align: center;
				font-size: 2rem;
				@media screen and (max-width: 768px) {
					font-size: 1rem;
				}
				h1 {
					padding: 0 25rem;
				}
			}
			.form {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 60%;
				input {
					width: 50vw;
					@media screen and (max-width: 768px) {
						width: 65vw;
					}
					color: var(--black-netflix);
					padding: 1rem;
					font-size: 1.2rem;
					border: 1px solid var(--black-netflix);
					&:focus {
						outline: none;
					}
				}
				button {
					width: 50vw;
					@media screen and (max-width: 768px) {
						width: 65vw;
					}
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
			button {
				padding: 0.5rem 1rem;
				background-color: #e50914;
				border: none;
				cursor: pointer;
				color: white;
				border-radius: 0.2rem;
				font-weight: bolder;
				font-size: 1rem;
			}
		}
	}
`;
