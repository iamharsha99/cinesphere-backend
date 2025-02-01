CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMovieRatings`(IN movieId varchar(20))
BEGIN
  SELECT 'rating',avg(rating) AS count FROM review r WHERE r.movie_id = movieId 
  UNION
  SELECT 'totalCount',count(*) AS count FROM review r WHERE r.movie_id = movieId 
  UNION
  SELECT r.rating,count(*)  FROM review r
  WHERE r.movie_id=movieId
  GROUP BY r.rating;
END