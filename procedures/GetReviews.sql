DELIMITER //

CREATE OR REPLACE PROCEDURE GetReviews(
  IN userId INT,
  IN in_sort VARCHAR(20),
  IN in_filter VARCHAR(20),
  IN in_limit INT,
  IN in_offset INT
)
BEGIN
  DECLARE sortColumn VARCHAR(255);
  DECLARE filterCondition VARCHAR(255);

  SET sortColumn = CASE in_sort
    WHEN 'movieTitle' THEN 'm.title'
    WHEN 'rating' THEN 'r.rating DESC'
    WHEN 'created_at' THEN 'r.created_at DESC'
    ELSE 'm.title'
  END;

  SET filterCondition = CASE in_filter
    WHEN 'high_rating' THEN 'r.rating >= 2.5'
    WHEN 'recent' THEN 'r.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)'
    ELSE '1=1'
  END;

  SET @query = CONCAT('
    SELECT r.id, r.review_text, r.rating, r.created_at, m.title AS movieTitle, m.poster_path AS moviePoster , m.id as movieId
    FROM review r
    JOIN movie m ON r.movie_id = m.id
    WHERE r.user_id = ? AND ', filterCondition, '
    ORDER BY ', sortColumn, '
    LIMIT ? OFFSET ?');

  PREPARE stmt FROM @query;
  EXECUTE stmt USING userId, in_limit, in_offset;
  DEALLOCATE PREPARE stmt;
END //

DELIMITER ;