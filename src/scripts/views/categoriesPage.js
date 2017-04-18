import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import User from '../models/userModel'

import AddCategoryForm from './components/adminComponents/addCategoryForm.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var CategoriesPage = React.createClass({
	componentWillMount(){
		ACTIONS.fetchCategories()
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount(){
		STORE.reset()
		STORE.off('dataUpdated')
	},
	getInitialState(){
		return STORE.data
	},
	render() {
		console.log(User.getCurrentUser().get('admin'))
		return(
			<div className="CategoriesPage">
				<NavBar />
				<h2>CategoriesPage</h2>
				<ElementList list={this.state.categoryCollection} />
				{User.getCurrentUser().get('admin')?<AddCategoryForm />:<div />}
				<FooterBar />
			</div>
		) 
	}
})

var ElementList = React.createClass({
	mapListItem(singleObj){
		return(
			<ListItem key={singleObj.cid} listItemInfo={singleObj}/>
		)
	},
	render() {
		return(
			<div className="ElementList">
				{this.props.list.map(this.mapListItem)}
			</div>
		) 
	}
})

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

export default CategoriesPage