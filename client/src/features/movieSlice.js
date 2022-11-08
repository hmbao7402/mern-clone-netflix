import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TMDB_BASE_URL, API_KEY, BACKEND_API } from '../utils/constants';

const initialState = {
	movies: [],
	genresLoaded: false,
	genres: [],
};

/*************** GET GENRES ***************/
export const getGenres = createAsyncThunk('movies/genres', async () => {
	const {
		data: { genres },
	} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
	return genres;
});

/*************** GET MOVIES ***************/
// Create movie array
const createMovies = (array, movies, genres) => {
	// console.log(array)
	array.forEach((movie) => {
		const movieGenres = [];
		movie.genre_ids.forEach((genre) => {
			const item = genres.find(({ id }) => id === genre);
			if (item) {
				movieGenres.push(item.name);
			}
		});
		if (movie.backdrop_path) {
			movies.push({
				id: movie.id,
				name: movie?.original_name ? movie.original_name : movie.original_title,
				image: movie.backdrop_path,
				genres: movieGenres.slice(0, 3),
				type: movie.media_type,
			});
		}
	});
};

// get raw data from api
const getRawData = async (api, genres, paging = false) => {
	const movies = [];
	for (let i = 1; movies.length < 60 && i < 10; i++) {
		const {
			data: { results },
		} = await axios.get(`${api}${paging ? `&page=${i}` : ''}`);
		createMovies(results, movies, genres);
	}
	return movies;
};

// fetch modified movies
export const fetchMovies = createAsyncThunk(
	'movies/trending',
	async ({ type }, thunkApi) => {
		const {
			movies: { genres },
		} = thunkApi.getState();
		return getRawData(
			`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
			genres,
			true
		);
	}
);

/*************** GET FAVORITE MOVIES ***************/
export const getUserFavoriteMovies = createAsyncThunk(
	'movies/getFavoriteMovies',
	async (email) => {
		// console.log(email);
		const {
			data: { movies },
		} = await axios.get(`${BACKEND_API}/api/user/favorite/${email}`);
		return movies;
	}
);

/*************** REMOVE MOVIE FROM FAVORITE LIST ***************/
export const removeFromFavoriteMovies = createAsyncThunk(
	'movies/removeFromFavoriteMovies',
	async ({ email, movieId }) => {
		const {
			data: { movies },
		} = await axios.put(`${BACKEND_API}/api/user/remove`, {
			email,
			movieId,
		});
		return movies;
	}
);

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getGenres.fulfilled, (state, action) => {
			state.genres = action.payload;
			state.genresLoaded = true;
		});
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
		});
		builder.addCase(getUserFavoriteMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
		});
		builder.addCase(removeFromFavoriteMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
		});
	},
});

export const selectGenresLoaded = (state) => state.movies.genresLoaded;
export const selectGenres = (state) => state.movies.genres;
export const selectMovies = (state) => state.movies.movies;

export default movieSlice.reducer;
