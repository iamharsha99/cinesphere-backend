DELIMITER //

CREATE OR REPLACE PROCEDURE GetMovieReviews(
  IN movieId VARCHAR(512),
  IN in_limit INT,
  IN in_offset INT,
  IN sortOption VARCHAR(50)
)
BEGIN
  DECLARE sortCondition VARCHAR(255);

  SET sortCondition = CASE
    WHEN sortOption = 'date_asc' THEN 'r.created_at ASC'
    WHEN sortOption = 'date_desc' THEN 'r.created_at DESC'
    WHEN sortOption = 'rating_asc' THEN 'r.rating ASC'
    WHEN sortOption = 'rating_desc' THEN 'r.rating DESC'
    ELSE 'r.created_at DESC'
  END;

  SET @query = CONCAT('
    SELECT SQL_CALC_FOUND_ROWS * 
    FROM review r
    INNER JOIN user u ON r.user_id = u.id 
    WHERE movie_id = ? 
    ORDER BY ', sortCondition, '
    LIMIT ? OFFSET ?
  ');

  PREPARE stmt FROM @query;
  EXECUTE stmt USING movieId, in_limit, in_offset;
  DEALLOCATE PREPARE stmt;
END //

DELIMITER ;