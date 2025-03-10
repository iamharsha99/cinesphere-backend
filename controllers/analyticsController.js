
// Controller to get analytics data
const getAnalytics = async (req, res) => {
  const userId = req.user.id;

  try {
    const [totalMoviesWatched] = await req.db.query('CALL GetTotalMoviesWatched(?)', [userId]);
    const [totalWatchTime] = await req.db.query('CALL GetTotalWatchTime(?)', [userId]);
    const [avgMovieLength] = await req.db.query('CALL GetAvgMovieLengthWatched(?)', [userId]);
    const [oldestMovieWatched] = await req.db.query('CALL GetOldestMovieWatched(?)', [userId]);
    const [newestMovieWatched] = await req.db.query('CALL GetNewestMovieWatched(?)', [userId]);
    const [longestMovieWatched] = await req.db.query('CALL GetLongestMovieWatched(?)', [userId]);
    const [shortestMovieWatched] = await req.db.query('CALL GetShortestMovieWatched(?)', [userId]);
    const [mostWatchedGenres] = await req.db.query('CALL GetMostWatchedGenre(?)', [userId]);
    const [leastWatchedGenres] = await req.db.query('CALL GetLeastWatchedGenre(?)', [userId]);
    const [mostWatchedProductionCompanies] = await req.db.query('CALL GetMostWatchedProductionCompany(?)', [userId]);
    const [mostWatchedCountries] = await req.db.query('CALL GetMostWatchedCountryOfProduction(?)', [userId]);
    const [favoriteLanguages] = await req.db.query('CALL GetFavoriteLanguage(?)', [userId]);
    const [moviesWatchedByMonth] = await req.db.query('CALL GetMoviesWatchedByMonth(?)', [userId]);
    console.log('Analytics data:', moviesWatchedByMonth[0]);
      

    res.status(200).json({
      totalMoviesWatched: totalMoviesWatched[0][0].total_movies_watched,
      totalWatchTime: totalWatchTime[0][0].total_watch_time,
      avgMovieLength: avgMovieLength[0][0].avg_movie_length,
      oldestMovieWatched: oldestMovieWatched[0],
      newestMovieWatched: newestMovieWatched[0],
      longestMovieWatched: longestMovieWatched[0],
      shortestMovieWatched: shortestMovieWatched[0],
      mostWatchedGenres,
      leastWatchedGenres,
      mostWatchedProductionCompanies,
      mostWatchedCountries,
      favoriteLanguages,
      moviesWatchedByMonth: moviesWatchedByMonth[0],
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAnalytics,
};