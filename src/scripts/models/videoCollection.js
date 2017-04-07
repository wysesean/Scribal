import Backbone from 'backbone'

export const VideoModel = Backbone.Model.extend({
	urlRoot: '/api/video',
	idAttribute: '_id'
})

export const VideoCollection = Backbone.Collection.extend({
	model: VideoModel,
	url: 'api/video'
})