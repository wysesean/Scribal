import Backbone from 'backbone'
import {EnrollmentCollection} from './models/enrollmentCollection.js'
import {CategoryCollection} from './models/categoryCollection.js'
import {CourseCollection} from './models/courseCollection.js'
import {LectureCollection} from './models/lectureCollection.js'
import TranscriptionModel from './models/transcriptionModel.js'
import ClipModel from './models/clipModel.js'

const STORE = Object.assign({}, Backbone.Events, {
	data: {
		enrollmentCollection: new EnrollmentCollection(),
		categoryCollection: new CategoryCollection(),
		courseCollection: new CourseCollection(),
		lectureCollection: new LectureCollection(), 
		transcriptionModel: new TranscriptionModel(),
		clipModel: new ClipModel()
	},
	data_default:{
		enrollmentCollection: new EnrollmentCollection(),
		categoryCollection: new CategoryCollection(),
		courseCollection: new CourseCollection(),
		lectureCollection: new LectureCollection(), 
		transcriptionModel: new TranscriptionModel(),
		clipModel: new ClipModel()
	},
	get(prop){
		if(this.data[prop] === undefined) {
			throw new Error ('the store does not have a property called: ', + prop)
		}
		return this.data[prop]
	},
	set(attrs){
		this.data = Object.assign({},this.data,attrs)
		this.trigger('dataUpdated')
	},
	reset: function() {
		this.data = this.data_default
		this.trigger('dataUpdated')
	}
})

export default STORE