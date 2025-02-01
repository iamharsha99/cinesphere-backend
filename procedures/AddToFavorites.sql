DELIMITER //

CREATE PROCEDURE AddToFavorites(IN userId INT, IN movieId VARCHAR(255))
BEGIN
  INSERT INTO favourite (user_id, movie_id) VALUES (userId, movieId);
END //

DELIMITER ;