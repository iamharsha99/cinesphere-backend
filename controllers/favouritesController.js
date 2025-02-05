
// Controller to get favorites with pagination, sorting, and filtering
const getFavorites = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const offset = (page - 1) * limit;
  const sort = req.query.sort || 'title';
  const filter = req.query.filter || 'all';

  try {
    const [movies] = await req.db.query('CALL GetFavorites(?, ?, ?, ?, ?)', [userId, limit, offset, sort, filter]);
    const [countResult] = await req.db.query('SELECT COUNT(*) AS count FROM favourite WHERE user_id = ?', [userId]);
    const totalPages = Math.ceil(countResult[0].count / limit);

    // Fetch ratings for each movie
    for (let movie of movies[0]) {
      const [ratingRows] = await req.db.query('CALL GetMovieRatings(?)', [movie.id]);
      movie.rating = parseFloat(ratingRows[0][0].count) || 0;
    }

    res.status(200).json({ movies: movies[0], totalPages });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFavorites,
};