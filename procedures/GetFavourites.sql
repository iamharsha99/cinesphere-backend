DELIMITER //

CREATE PROCEDURE GetFavorites(IN userId INT, IN in_limit INT, IN in_offset INT)
BEGIN
  SELECT m.* FROM favourite f
  JOIN movie m ON f.movie_id = m.id
  WHERE f.user_id = userId
  LIMIT in_limit OFFSET in_offset;
END //

DELIMITER ;