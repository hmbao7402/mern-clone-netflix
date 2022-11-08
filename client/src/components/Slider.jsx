import React from 'react';
import SliderCard from './SliderCard';

const Slider = ({ movies }) => {
	const getMoviesFromRange = (from, to) => {
		return movies.slice(from, to);
	};

	return (
		<div>
			<SliderCard title='Trending Now' data={getMoviesFromRange(0, 10)} />
			<SliderCard title='New Releases' data={getMoviesFromRange(10, 20)} />
			<SliderCard
				title='Blockbuster Movies'
				data={getMoviesFromRange(20, 30)}
			/>
			<SliderCard
				title='Popular On Netflix'
				data={getMoviesFromRange(30, 40)}
			/>
			<SliderCard title='Action Movies' data={getMoviesFromRange(40, 50)} />
			<SliderCard title='Epics' data={getMoviesFromRange(50, 60)} />
		</div>
	);
};

export default React.memo(Slider);
// export default Slider;
