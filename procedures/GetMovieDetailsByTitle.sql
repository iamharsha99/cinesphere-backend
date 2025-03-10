DELIMITER //

CREATE OR REPLACE PROCEDURE GetMovieDetailsByIds(
  IN movieIds VARCHAR(1000)
)
BEGIN
  -- Format the movie IDs to ensure they are enclosed in single quotes and separated by commas
  SET @formattedIds = CONCAT("'", REPLACE(movieIds, ',', "','"), "'");

  -- Construct the query using the formatted movie IDs
  SET @query = CONCAT('SELECT * FROM movie WHERE id IN (', @formattedIds, ')');
  
  PREPARE stmt FROM @query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END //

DELIMITER ;
