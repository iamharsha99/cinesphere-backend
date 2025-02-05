
// Controller to get trending movies based on reviews
const       getTrendingMovies = async (req, res) => {
  const period = req.query.period || 't';

  try {
    const [movies] = await req.db.query('CALL GetTrendingMovies(?)', [period]);
    res.status(200).json({ movies });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTrendingMovies,
};