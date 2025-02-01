DELIMITER //

CREATE PROCEDURE AddReview(IN userId INT, IN movieId VARCHAR(255), IN reviewText TEXT, IN rating FLOAT)
BEGIN
  INSERT INTO review (user_id, movie_id, review_text, rating, created_at) VALUES (userId, movieId, reviewText, rating, NOW());
END //

DELIMITER ;