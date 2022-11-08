const {
	addToFavoriteMovies,
	getFavoriteMovies,
	removeFromFavoriteMovies,
} = require('../controllers/UserController');

const router = require('express').Router();

router.post('/add', addToFavoriteMovies);
router.get('/favorite/:email', getFavoriteMovies);
router.put('/remove', removeFromFavoriteMovies);

module.exports = router;
