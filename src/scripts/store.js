import Backbone from 'backbone'
import {CategoryCollection} from './models/categoryCollection.js'
import {CourseCollection} from './models/courseCollection.js'
import {VideoCollection} from './models/videoCollection.js'
import ClipModel from './models/clipModel.js'

const STORE = Object.assign({}, Backbone.Events, {

	data: {
		categoryCollection: new CategoryCollection(),
		courseCollection: new CourseCollection(),
		videoCollection: new VideoCollection(), 
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

})

export default STORE