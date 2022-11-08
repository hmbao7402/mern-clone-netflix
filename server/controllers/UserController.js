const User = require('../models/User');

/** add movie API */
module.exports.addToFavoriteMovies = async (req, res) => {
	try {
		const { email, data } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			/* if user already exists in database -> add movie to favorite list */
			const { favoriteMovies } = user;
			const movieAlreadyLiked = favoriteMovies.find(({ id }) => id === data.id);
			// check if movie already exists in favorite list or not
			if (!movieAlreadyLiked) {
				// if not exists -> add movie to favorite list
				await User.findByIdAndUpdate(
					user._id,
					{
						favoriteMovies: [...user.favoriteMovies, data],
					},
					{ new: true }
				);
			} else {
				// else -> return a message that movie already exists
				return res.json({ msg: 'Movie already exists in your favorite list' });
			}
		} else {
			/** if user not exists in database -> create user email + favorite list & add movie to favorite list */
			await User.create({ email, favoriteMovies: [data] });
			return res.json({ msg: 'Movie successfully added to liked list.' });
		}
	} catch (error) {
		console.log(error.message);
		return res.json({ msg: 'Error adding movie' });
	}
};

/** get favorite movies API */
module.exports.getFavoriteMovies = async (req, res) => {
	try {
		const { email } = req.params; // params !== body
		const user = await User.findOne({ email });
		/** check if user existing in database */
		if (user) {
			// is user -> return favorite list
			return res.json({
				msg: 'get favorite movies successfully',
				movies: user.favoriteMovies,
			});
		} else {
			return res.json({ msg: 'User email not found' });
		}
	} catch (error) {
		return res.json({ msg: 'Cannot get favorite movies' });
	}
};

/** remove movie API */
module.exports.removeFromFavoriteMovies = async (req, res) => {
	 try {
			const { email, movieId } = req.body;
			const user = await User.findOne({ email });
			if (user) {
				const movies = user.favoriteMovies;
				const movieIndex = movies.findIndex(({ id }) => id === movieId);
				if (!movieIndex) {
					res.status(400).send({ msg: 'Movie not found.' });
				}
				movies.splice(movieIndex, 1);
				await User.findByIdAndUpdate(
					user._id,
					{
						favoriteMovies: movies,
					},
					{ new: true }
				);
				return res.json({ msg: 'Movie successfully removed.', movies });
			} else return res.json({ msg: 'User with given email not found.' });
		} catch (error) {
			return res.json({ msg: 'Error removing movie to the liked list' });
		}
};
