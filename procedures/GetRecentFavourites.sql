DELIMITER //

CREATE OR REPLACE PROCEDURE GetRecentFavorites(
  IN userId INT
)
BEGIN
  SELECT m.id
  FROM favourite f
  JOIN movie m ON f.movie_id = m.id
  WHERE f.user_id = userId
  ORDER BY f.created_at DESC
  LIMIT 5;
END //

DELIMITER ;