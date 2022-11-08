import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import { TMDB_BASE_URL, API_KEY } from '../utils/constants';

const Player = () => {
	const navigate = useNavigate();
	const [linkVideo, setLinkVideo] = useState('');
	const { id, type } = useParams();

	useEffect(() => {
		const getVideoFromYoutube = async (type, id) => {
			if (type === 'main' && id === 'main') {
				setLinkVideo('https://www.youtube.com/embed/b9EkMc79ZSU');
			} else if (type === 'undefined') {
				setLinkVideo('https://www.youtube.com/embed/TcMBFSGVi1c');
			} else {
				const videosSource = await axios.get(
					`${TMDB_BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`,
					{
						timeout: 1000,
					}
				);
				const keyVideo = videosSource.data.results[0].key;
				setLinkVideo(`https://www.youtube.com/embed/${keyVideo}`);
			}
		};
		getVideoFromYoutube(type, id);
	}, [id, type]);

	return (
		<Container>
			<div className='player'>
				<div className='back'>
					<BsArrowLeft onClick={() => navigate(-1)} />
				</div>
				<iframe
					width='100%'
					height='100%'
					src={linkVideo}
					title='video'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media'
					allowFullScreen
				></iframe>
			</div>
		</Container>
	);
};

export default Player;

const Container = styled.div`
	.player {
		width: 100vw;
		height: 100vh;
		.back {
			position: absolute;
			padding: 2rem;
			z-index: 1;
			svg {
				font-size: 3rem;
				cursor: pointer;
			}
		}
		video {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
`;
