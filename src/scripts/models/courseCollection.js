import Backbone from 'backbone'

const CourseModel = Backbone.Model.extend({
	urlRoot: '/api/course',
	idAttribute: '_id'
})

const CourseCollection = Backbone.Collection.extend({
	model: CourseModel,
	url: 'api/course'
})

export default CourseCollection