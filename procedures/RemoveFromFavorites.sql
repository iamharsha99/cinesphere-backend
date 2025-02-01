DELIMITER //

CREATE PROCEDURE RemoveFromFavorites(IN userId INT, IN movieId VARCHAR(255))
BEGIN
  DELETE FROM favourite WHERE user_id = userId AND movie_id = movieId;
END //

DELIMITER ;