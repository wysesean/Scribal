import Backbone from 'backbone'

export const EnrollmentModel = Backbone.Model.extend({
	urlRoot: '/api/user/enrollment',
	idAttribute: '_id'
})

export const EnrollmentCollection = Backbone.Collection.extend({
	model: EnrollmentModel,
	url: 'api/user/enrollment'
})