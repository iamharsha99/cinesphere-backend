const getMovieByIds = async (req, res) => {
  const ids = req.body.ids;

  try {
    const [movies] = await req.db.query('CALL GetMovieDetailsByIds(?)', [ids.join(',')]);
    if (movies.length === 0) {
      return res.status(404).json({ message: 'Movies not found' });
    }
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Controller to get movie details by ID
const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    // Call stored procedure to fetch movie details
    const [movieRows] = await req.db.query('CALL GetMovieDetails(?)', [id]);

    if (movieRows[0].length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movie = movieRows[0][0];

    // Call stored procedure to fetch recent reviews
    const [reviewRows] = await req.db.query('CALL GetRecentReviews(?)', [id]);

    // Call stored procedure to fetch rating data
    const [ratingRows] = await req.db.query('CALL GetMovieRatings(?)', [id]);

    movie.reviews = reviewRows[0];
    movie.ratings = ratingRows[0];

    const [movieProviders] = await req.db.query('CALL GetMovieProviders(?)', [id]);
    res.status(200).json({movie,providers:movieProviders[0]});
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to add a movie to the watchlist
const addToWatchlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    await req.db.query('CALL AddToWatchlist(?, ?)', [userId, movieId]);
    res.status(200).json({ message: 'Movie added to watchlist' });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to remove a movie from the watchlist
const removeFromWatchlist = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    await req.db.query('CALL RemoveFromWatchlist(?, ?)', [userId, movieId]);
    res.status(200).json({ message: 'Movie removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to check if a movie is in the watchlist
const isInWatchlist = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    const [rows] = await req.db.query('SELECT * FROM watchlist WHERE user_id = ? AND movie_id = ?', [userId, movieId]);
    res.status(200).json({ isInWatchlist: rows.length > 0 });
  } catch (error) {
    console.error('Error fetching watchlist status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to add a movie to favorites
const addToFavorites = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    await req.db.query('CALL AddToFavorites(?, ?)', [userId, movieId]);
    res.status(200).json({ message: 'Movie added to favorites' });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to remove a movie from favorites
const removeFromFavorites = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    await req.db.query('CALL RemoveFromFavorites(?, ?)', [userId, movieId]);
    res.status(200).json({ message: 'Movie removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to check if a movie is in favorites
const isFavorite = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    const [rows] = await req.db.query('SELECT * FROM favourite WHERE user_id = ? AND movie_id = ?', [userId, movieId]);
    res.status(200).json({ isFavorite: rows.length > 0 });
  } catch (error) {
    console.error('Error fetching favorite status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to add a review
const addReview = async (req, res) => {
  const { movieId, text, rating } = req.body;
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    await req.db.query('CALL AddReview(?, ?, ?, ?)', [userId, movieId, text, rating]);
    res.status(200).json({ message: 'Review added' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getMovieReviews = async (req, res) => {
  const { id } = req.params;
  const { page = 1, sort = 'date_desc' } = req.query;
  const limit = 3;
  const offset = (page - 1) * limit;

  try {
    const [reviews] = await req.db.query('CALL GetMovieReviews(?, ?, ?, ?)', [id, limit, offset, sort]);
    const [countResult] = await req.db.query('SELECT FOUND_ROWS() AS total');
    const totalPages = Math.ceil(countResult[0].total / limit);
    res.status(200).json({ reviews, totalPages });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMovieById,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  addReview,
  getMovieReviews,
  getMovieByIds,
};