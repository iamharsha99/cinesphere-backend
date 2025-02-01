DELIMITER //

CREATE PROCEDURE RemoveFromWatchlist(IN userId INT, IN movieId VARCHAR(255))
BEGIN
  DELETE FROM watchlist WHERE user_id = userId AND movie_id = movieId;
END //

DELIMITER ;