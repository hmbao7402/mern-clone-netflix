import React, { useState, useRef } from 'react';
import Card from './Card';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const SliderCard = ({ title, data }) => {
	const [showControls, setShowControls] = useState(false);
	const [sliderPosition, setSliderPosition] = useState(0);
	const listRef = useRef();

	// this function will create a infinite loop in Card components
	const handleDirection = (direction) => {
		let distance = listRef.current.getBoundingClientRect().x - 70;

		if (direction === 'left' && sliderPosition > 0) {
			listRef.current.style.transform = `translateX(${230 + distance}px)`;
			setSliderPosition(sliderPosition - 1);
		}
		if (direction === 'right' && sliderPosition < 4) {
			listRef.current.style.transform = `translateX(${-230 + distance}px)`;
			setSliderPosition(sliderPosition + 1);
		}
	};

	return (
		<Container
			className='flex column'
			onMouseEnter={() => setShowControls(true)}
			onMouseLeave={() => setShowControls(false)}
		>
			<h1>{title}</h1>
			<div className='wrapper'>
				<div
					className={`slider-action left ${
						!showControls ? 'none' : ''
					} flex j-center a-center`}
				>
					<AiOutlineLeft onClick={() => handleDirection('left')} />
				</div>
				<div className='slider flex' ref={listRef}>
					{data.map((movie, index) => {
						return <Card key={movie.id} movie={movie} index={index} />;
					})}
				</div>
				<div
					className={`slider-action right ${
						!showControls ? 'none' : ''
					} flex j-center a-center`}
				>
					<AiOutlineRight onClick={() => handleDirection('right')} />
				</div>
			</div>
		</Container>
	);
};

export default SliderCard;

const Container = styled.div`
	gap: 1rem;
	position: relative;
	padding: 2rem 0;

	h1 {
		margin-left: 50px;
		/* position: fixed; */
	}
	.wrapper {
		.slider {
			width: max-content;
			gap: 1rem;
			transform: translateX(0px);
			transition: ease-in-out 0.3s;
			margin-left: 50px;
		}
		.slider-action {
			position: absolute;
			z-index: 99;
			height: 100%;
			top: 0;
			bottom: 0;
			width: 50px;
			transition: ease-in-out 0.3s;
			svg {
				font-size: 2rem;
				cursor: pointer;
			}
		}
		.none {
			display: none;
		}
		.left {
			left: 0;
		}
		.right {
			right: 0;
		}
	}
	@media screen and (max-width: 768px) {
		h1 {
			margin-left: 15px;
		}
		.wrapper {
			.slider {
				margin-left: 15px;
			}
		}
	}
`;
