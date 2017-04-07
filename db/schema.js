const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	coursesSelected: [{
		course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
		videosCompleted: {type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
		progress: {type: Number, default: 0},
		createdAt: {type: Date, default: Date.now}
	}],
	admin: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now}
})

//-----------------------
//COURSES AND VIDEOS
//-----------------------
const categorySchema = new mongoose.Schema({
	categoryName: {type: String, required:true},
	categoryImage: {type: String},
	description: {type: String},

	createdAt: {type: Date, default: Date.now}
})

const courseSchema = new mongoose.Schema({
	courseName: {type: String, required: true},
	courseImage: {type: String},
	description: {type: String},
	badges: [String],

	categoryInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	createdAt: {type: Date, default: Date.now }
})

const videoSchema = new mongoose.Schema({
	referenceURL: {type: String, required: true},
	videoLength: {type: Number, required: true},
	courseIndex: {type: Number, required: true},
	description: {type: String},
	views: {type:Number, default: 0},


	courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
	createdAt: {type: Date, default: Date.now}
})

const clipsSchema = new mongoose.Schema({
	startingOffset: {type: Number, required: true},
	endingOffset: {type: Number, required: true},
	transcriptionCollection: [{body:String, language:String}],
	transcriptionTotal: {type: Number, default: 0},

	videoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Video'}
})

module.exports = {
	User: mongoose.model('User', usersSchema),	
	Category: mongoose.model('Category', categorySchema),
	Course: mongoose.model('Course', courseSchema),
	Video: mongoose.model('Video', videoSchema),
	Clips: mongoose.model('Clips', clipsSchema)
}
