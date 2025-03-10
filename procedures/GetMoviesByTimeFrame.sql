DELIMITER //

CREATE OR REPLACE PROCEDURE GetMoviesByTimeFrame(
  IN userId INT,
  IN timeFrame VARCHAR(50)
)
BEGIN
  IF timeFrame = 'this_week' THEN
    SELECT m.id
    FROM movie m
    JOIN review r ON m.id = r.movie_id
    WHERE r.created_at >= CURDATE() - INTERVAL 7 DAY
    AND r.user_id = userId;
  ELSEIF timeFrame = 'this_month' THEN
    SELECT m.id
    FROM movie m
    JOIN review r ON m.id = r.movie_id
    WHERE r.created_at >= CURDATE() - INTERVAL 1 MONTH
    AND r.user_id = userId;
  ELSE
    SELECT m.id
    FROM movie m
    JOIN review r ON m.id = r.movie_id
    WHERE r.user_id = userId; 
  END IF;
END //

DELIMITER ;