const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	age: {type: Number, min: 18, required: true},
	minAge: {type: Number},
	maxAge: {type: Number},
	loc: {
        type: { type: String },
        coordinates: []
    },
	maxDistance: {type: Number, default: 5},
	profilePicture: {type: String, required: true},
	topArtists: [String],
	topSongs: []
});

module.exports = mongoose.model('User', userSchema);