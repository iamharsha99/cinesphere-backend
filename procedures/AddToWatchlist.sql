DELIMITER //

CREATE PROCEDURE AddToWatchlist(IN userId INT, IN movieId VARCHAR(255))
BEGIN
  INSERT INTO watchlist (user_id, movie_id) VALUES (userId, movieId);
END //

DELIMITER ;