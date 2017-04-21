import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import UTIL from '../util.js'
import { Parallax } from 'react-parallax'

import AddCategoryForm from './components/adminComponents/addCategoryForm.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'
import LiveBackground from './components/liveBackground.js'

var CategoriesPage = React.createClass({
	getInitialState(){
		return STORE.data
	},
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
	render() {
		return(
			<div className="CategoriesPage">
				<NavBar />
						<Parallax bgImage="../images/1.jpg" strength={400}>
							<br />
							<center><h1>Online course categories</h1></center>
						</Parallax>
				<h3>Find your interests by browsing our online course categories. Start learning with a great university.</h3>
				<ElementList list={this.state.categoryCollection} />
				{UTIL.renderAdminComponent(<AddCategoryForm />)}
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