DELIMITER //

CREATE OR REPLACE PROCEDURE GetTrendingMovies(IN period VARCHAR(20))
BEGIN
  DECLARE dateCondition VARCHAR(255);

  IF period = 'today' THEN
    SET dateCondition = 'DATE(r.created_at) = CURDATE()';
  ELSEIF period = 'week' THEN
    SET dateCondition = 'r.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
  ELSEIF period = 'month' THEN
    SET dateCondition = 'r.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
  ELSE
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid period';
  END IF;

  SET @query = CONCAT('
    SELECT m.*, COUNT(r.id) AS review_count, AVG(r.rating) AS rating
    FROM movie m
    JOIN review r ON m.id = r.movie_id
    WHERE ', dateCondition, '
    GROUP BY m.id
    ORDER BY review_count DESC
    LIMIT 5
  ');

  PREPARE stmt FROM @query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END //

DELIMITER ;