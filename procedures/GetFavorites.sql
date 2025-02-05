DELIMITER //

CREATE OR REPLACE PROCEDURE GetFavorites(IN userId INT, IN in_limit INT, IN in_offset INT, IN in_sort VARCHAR(20), IN in_filter VARCHAR(20))
BEGIN
  SET @sortColumn = CASE in_sort
    WHEN 'title' THEN 'm.title'
    WHEN 'rating' THEN 'r.average_rating desc'
    WHEN 'release_date' THEN 'm.release_date desc'
    ELSE 'm.title'
  END;

  SET @filterCondition = CASE in_filter
    WHEN 'high_rating' THEN 'r.average_rating >= 2.5'
    WHEN 'recent' THEN 'f.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)'
    ELSE '1=1'
  END;

  SET @query = CONCAT('
    SELECT m.*, r.average_rating
    FROM favourite f
    JOIN movie m ON f.movie_id = m.id
    LEFT JOIN (SELECT movie_id, AVG(rating) AS average_rating FROM review GROUP BY movie_id) r ON m.id = r.movie_id
    WHERE f.user_id = ? AND ', @filterCondition, '
    ORDER BY ', @sortColumn, '
    LIMIT ? OFFSET ?');

  PREPARE stmt FROM @query;
  EXECUTE stmt USING userId, in_limit, in_offset;
  DEALLOCATE PREPARE stmt;
END //

DELIMITER ;