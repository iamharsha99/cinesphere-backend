
// Controller to get reviews for the logged-in user with sorting, filtering, and pagination
const getReviews = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user
  const sort = req.query.sort || 'movieTitle';
  const filter = req.query.filter || 'all';
  const page = parseInt(req.query.page) || 1;
  const limit = 4;
  const offset = (page - 1) * limit;

  try {
    const [reviews] = await req.db.query('CALL GetReviews(?, ?, ?, ?, ?)', [userId, sort, filter, limit, offset]);

    const [countResult] = await req.db.query(`
      SELECT COUNT(*) AS count
      FROM review r
      WHERE r.user_id = ? AND (
        CASE ?
          WHEN 'high_rating' THEN r.rating >= 2.5
          WHEN 'recent' THEN r.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
          ELSE 1=1
        END
      )
    `, [userId, filter]);

    const totalPages = Math.ceil(countResult[0].count / limit);

    res.status(200).json({ reviews, totalPages });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a review
const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const { review_text, rating } = req.body;

  try {
    await req.db.query('UPDATE review SET review_text = ?, rating = ? WHERE id = ?', [review_text, rating, reviewId]);
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getReviews,
  updateReview,
};