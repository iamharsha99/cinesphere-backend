DELIMITER //

CREATE OR REPLACE PROCEDURE GetTrendingMovies(IN period VARCHAR(20))
BEGIN
  DECLARE dateCondition VARCHAR(255);

  IF period = 'T' THEN
    SET dateCondition = 'DATE(r.created_at) = CURDATE()';
  ELSEIF period = 'W' THEN
    SET dateCondition = 'YEARWEEK(r.created_at, 1) = YEARWEEK(CURDATE(), 1)';
  ELSEIF period = 'M' THEN
    SET dateCondition = 'YEAR(r.created_at) = YEAR(CURDATE()) AND MONTH(r.created_at) = MONTH(CURDATE())';
  ELSE
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid period';
  END IF;

  SET @query = CONCAT('
    SELECT m.*, COUNT(r.id) AS review_count
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