import Backbone from 'backbone'

export const LectureModel = Backbone.Model.extend({
	urlRoot: '/api/lecture',
	idAttribute: '_id'
})

export const LectureCollection = Backbone.Collection.extend({
	model: LectureModel,
	url: 'api/lecture'
})