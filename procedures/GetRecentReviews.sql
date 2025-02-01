CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRecentReviews`(IN movieId varchar(20))
BEGIN
  SELECT u.username,u.profile_picture,r.rating,r.review_text,r.created_at FROM review r
  INNER JOIN user u ON r.user_id = u.id 
  WHERE movie_id = movieId ORDER BY r.created_at DESC LIMIT 3;
END