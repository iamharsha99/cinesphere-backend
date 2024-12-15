const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    profilePicture: { type: String, default: '' }, // URL for the profile picture
});

// Pre-save middleware to generate a random avatar if none is provided
userSchema.pre('save', function (next) {
    if (!this.profilePicture) {
        // Assign a random avatar using RoboHash based on the email
        this.profilePicture = `https://robohash.org/${encodeURIComponent(this.email)}.png`;
    }
    next();
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
