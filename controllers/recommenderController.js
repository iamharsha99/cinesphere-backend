
// Controller to get movies based on time frame
const getMovies = async (req, res) => {
   const userId = req.user.id; // Assuming user ID is available in req.user
  const timeFrame = req.query.timeFrame || 'this_week';
  console.log(req.user);
  try {
    const [movies] = await req.db.query('CALL GetMoviesByTimeFrame(?, ?)', [userId, timeFrame]);
    console.log(movies);
    res.status(200).json({ movies: movies[0] });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const searchMovies = async (req, res) => {
  const query = req.query.query;

  try {
    const [movies] = await req.db.query('CALL RecommendSearchMovies(?)', [query]);
    res.status(200).json({ movies });
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Controller to get recent favorites
const getRecentFavorites = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    const [movies] = await req.db.query('CALL GetRecentFavorites(?)', [userId]);
    res.status(200).json({ movies: movies[0] });
  } catch (error) {
    console.error('Error fetching recent favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMovies,
  getRecentFavorites,
  searchMovies
};