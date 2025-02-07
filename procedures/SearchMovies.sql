DELIMITER //

CREATE OR REPLACE PROCEDURE SearchMovies(
  IN searchQuery VARCHAR(255),
  IN yearRange VARCHAR(50),
  IN genres VARCHAR(255),
  IN languages VARCHAR(255),
  IN in_limit INT,
  IN in_offset INT,
  IN sortOption VARCHAR(50)
)
BEGIN
  DECLARE yearStart INT;
  DECLARE yearEnd INT;
  DECLARE genreCondition VARCHAR(255);
  DECLARE languageCondition VARCHAR(255);
  DECLARE titleCondition VARCHAR(255);
  DECLARE sortCondition VARCHAR(255);

  SET yearStart = SUBSTRING_INDEX(yearRange, ',', 1);
  SET yearEnd = SUBSTRING_INDEX(yearRange, ',', -1);

  SET genreCondition = IF(genres = '', '1=1', CONCAT('genres LIKE "%', REPLACE(genres, ',', '%" OR genres LIKE "%'), '%"'));
  SET languageCondition = IF(languages = '', '1=1', CONCAT('original_language IN ("', REPLACE(languages, ',', '","'), '")'));
  SET titleCondition = IF(searchQuery = '', '1=1', CONCAT('title LIKE "%', searchQuery, '%"'));
  SET sortCondition = CASE
    WHEN sortOption = 'title_asc' THEN 'title ASC'
    WHEN sortOption = 'title_desc' THEN 'title DESC'
    WHEN sortOption = 'release_date_asc' THEN 'release_date ASC'
    WHEN sortOption = 'release_date_desc' THEN 'release_date DESC'
    WHEN sortOption = 'rating_asc' THEN 'rating ASC'
    WHEN sortOption = 'rating_desc' THEN 'rating DESC'
    WHEN sortOption = 'runtime_asc' THEN 'runtime ASC'
    WHEN sortOption = 'runtime_desc' THEN 'runtime DESC'
    ELSE 'title ASC'
  END;

  SET @query = CONCAT('
    SELECT SQL_CALC_FOUND_ROWS m.*, AVG(r.rating) AS rating
    FROM movie m
    LEFT JOIN review r ON m.id = r.movie_id
    WHERE YEAR(m.release_date) BETWEEN ? AND ?
    AND (', genreCondition, ')
    AND (', languageCondition, ')
    AND (', titleCondition, ')
    GROUP BY m.id
    ORDER BY ', sortCondition, '
    LIMIT ? OFFSET ?
  ');

  PREPARE stmt FROM @query;
  INSERT INTO testing (x) VALUES (@query);
  EXECUTE stmt USING yearStart, yearEnd, in_limit, in_offset;
  DEALLOCATE PREPARE stmt;
END //

DELIMITER ;