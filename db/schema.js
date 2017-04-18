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
	
	categoryInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	createdAt: {type: Date, default: Date.now }
})

const lectureSchema = new mongoose.Schema({
	lectureTitle: {type:String, required: true},
	videoURL: {type: String, required: true},
	videoPublicId: {type: String, required: true},
	thumbnailURL: {type:String, required: true},
	videoLength: {type: Number, required: true},
	courseIndex: {type: Number, required: true},
	description: {type: String},
	views: {type:Number, default: 0},

	courseInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
	createdAt: {type: Date, default: Date.now}
})

const clipsSchema = new mongoose.Schema({
	set1: {
		startingOffset: {type: Number, required: true},
		endingOffset: {type: Number, required: true},
		transcriptionCollection: [String]
	},
	//Set 2 is 3 seconds ahead of set1's offsets
	set2:{
		startingOffset: {type: Number, required: true},
		endingOffset: {type: Number, required: true},
		transcriptionCollection: [String]
	},
	clipIndex:{type:Number, required: true},
	transcription: {type:String, default:''},
	transcriptionTotal: {type: Number, default: 0},
	lectureInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'}
})

// const transcriptionSchema = new mongoose.Schema({
// 	transcriptionCollection: [{
// 		startingOffset: {type: Number, required: true},
// 		endingOffset: {type:Number, required: true},
// 		transcription: {type:String, required: true}
// 	}],
// 	percentComplete: {type:Number, default: 0},
// 	confidence: {type: Number},
// 	createdAt: {type: Date, default: Date.now},

// 	lectureInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'}
// })

module.exports = {
	User: mongoose.model('User', usersSchema),	
	Category: mongoose.model('Category', categorySchema),
	Course: mongoose.model('Course', courseSchema),
	Lecture: mongoose.model('Lecture', lectureSchema),
	Clips: mongoose.model('Clips', clipsSchema),
	// Transcription: mongoose.model('Transcription',transcriptionSchema)
}
