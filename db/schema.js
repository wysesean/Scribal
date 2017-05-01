const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	admin: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now}
})

//-----------------------
//ENROLLMENT
//-----------------------
const enrollmentSchema = new mongoose.Schema({
	courseInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
	userInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	lecturesWatched: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'}
	],
	percentageComplete: {type: Number, default: 0},
	createdAt: {type: Date, default: Date.now} 
})

//-----------------------
//CATEGORY
//-----------------------
const categorySchema = new mongoose.Schema({
	categoryName: {type: String, required:true},
	categoryImage: {type: String, required:true},
	description: {type: String, required:true},
	colorScheme: {type: String, required:true},
	createdAt: {type: Date, default: Date.now}
})

//-----------------------
//COURSE
//-----------------------
const courseSchema = new mongoose.Schema({
	courseName: {type: String, required: true},
	courseImage: {type: String},
	description: {type: String},
	numberOfLectures: {type: Number, default: 0},
	categoryInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	createdAt: {type: Date, default: Date.now }
})

//-----------------------
//LECTURE
//-----------------------
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

//-----------------------
//CLIPS
//-----------------------
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

module.exports = {
	User: mongoose.model('User', usersSchema),	
	Category: mongoose.model('Category', categorySchema),
	Course: mongoose.model('Course', courseSchema),
	Lecture: mongoose.model('Lecture', lectureSchema),
	Clips: mongoose.model('Clips', clipsSchema),
	Enrollment: mongoose.model('Enrollment', enrollmentSchema)
}
