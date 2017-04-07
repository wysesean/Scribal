import Backbone from 'backbone'

const ClipModel = Backbone.Model.extend({
	urlRoot: '/api/clips',
	idAttribute: '_id'
})

export default ClipModel