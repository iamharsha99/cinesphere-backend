
// Controller to get reviews for the logged-in user with sorting and filtering
const getReviews = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user
  const sort = req.query.sort || 'movieTitle';
  const filter = req.query.filter || 'all';

  try {
    const [reviews] = await req.db.query('CALL GetReviews(?, ?, ?)', [userId, sort, filter]);
    res.status(200).json({ reviews });
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