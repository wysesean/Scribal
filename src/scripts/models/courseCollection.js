import Backbone from 'backbone'
import $ from 'jquery'

export const CourseModel = Backbone.Model.extend({
	urlRoot: '/api/course',
	idAttribute: '_id'
})

export const CourseCollection = Backbone.Collection.extend({
	model: CourseModel})
