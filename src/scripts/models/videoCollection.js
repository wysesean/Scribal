import Backbone from 'backbone'

const VideoModel = Backbone.Model.extend({
	urlRoot: '/api/video',
	idAttribute: '_id'
})

const VideoCollection = Backbone.Collection.extend({
	model: VideoModel,
	url: 'api/video'
})

export default VideoCollection