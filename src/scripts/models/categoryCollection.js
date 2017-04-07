import Backbone from 'backbone'

export const CategoryModel = Backbone.Model.extend({
	urlRoot: '/api/category',
	idAttribute: '_id'
})

export const CategoryCollection = Backbone.Collection.extend({
	model: CategoryModel,
	url: 'api/category'
})