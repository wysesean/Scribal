import React from 'react'

var ListItem = React.createClass({
	handleButton(categoryId){
		location.hash = `courses/${categoryId}`
	},
	render(){
		return(
			<div className="ListItem">
				<p>Category: {this.props.listItemInfo.attributes.categoryName}</p>
				<p>Description: {this.props.listItemInfo.attributes.description}</p>
				<button onClick={()=>{this.handleButton(this.props.listItemInfo.attributes._id)}}> See courses </button>
				<br />
			</div>
		) 
	}
})

export default ListItem