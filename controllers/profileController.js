// Get profile function
const getProfile = async (req, res) => {
    try {
      const username = req.user.username;
  
      const [rows] = await req.db.query('SELECT * FROM user WHERE username = ?', [username]);
  
      if (rows.length === 0) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      // Return the raw data from the database without formatting
      const user = rows[0];
      res.status(200).send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: error.message });
    }
  };
  
  // Update profile function
  const updateProfile = async (req, res) => {
    try {
      const username = req.user.username;
      const { name, dob, gender } = req.body;
  
      if (!name || !dob || !gender) {
        return res.status(400).send({ error: 'Name, DOB, and Gender are required' });
      }
  
      // Update the user's profile
      await req.db.query(
        'UPDATE user SET name = ?, dob = ?, gender = ? WHERE username = ?',
        [name, dob, gender, username]
      );
  
      res.status(200).send({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: error.message });
    }
  };
  
  module.exports = { getProfile, updateProfile };