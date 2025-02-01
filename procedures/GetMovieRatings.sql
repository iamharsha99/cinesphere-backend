DELIMITER //

CREATE PROCEDURE GetMovieRatings(IN movieId VARCHAR(20))
BEGIN
  SELECT r.rating, COUNT(*) AS count 
  FROM review r
  WHERE r.movie_id = movieId
  GROUP BY r.rating;
END //

DELIMITER ;