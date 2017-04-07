import Backbone from 'backbone'

const CategoryModel = Backbone.Model.extend({
	urlRoot: '/api/category',
	idAttribute: '_id'
})

const CategoryCollection = Backbone.Collection.extend({
	model: CategoryModel,
	url: 'api/category'
})

export default CategoryCollection