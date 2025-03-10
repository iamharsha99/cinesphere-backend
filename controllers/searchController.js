
// Controller to search movies based on year range, genres, languages, title, and sort option
const searchMovies = async (req, res) => {
  const { searchQuery = '', yearRange = '1900,2029', genres = [], languages = [], page = 1, sort = 'title_asc' } = req.query;
  console.log('searchQuery:', req.query);
  const limit = 8;
  const offset = (page - 1) * limit;
  console.log(limit, offset);
  try {
    const [movies] = await req.db.query('CALL SearchMovies(?, ?, ?, ?, ?, ?, ?)', [searchQuery, yearRange.join(','), genres.join(','), languages.join(','), limit, offset, sort]);
    const [countResult] = await req.db.query('SELECT FOUND_ROWS() AS total');
    const totalPages = Math.ceil(countResult[0].total / limit);
    res.status(200).json({ movies, totalPages });
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  searchMovies,
};