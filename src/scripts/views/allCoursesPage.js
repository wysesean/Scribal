import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import AddCourseForm from './components/adminComponents/addCourseForm.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var AllCoursesPage = React.createClass({
	componentWillMount(){
		ACTIONS.fetchCoursesByCategory(this.props.category)
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
		return(
			<div className="AllCoursesPage">
				<NavBar />
				<h2>AllCoursesPage</h2>
				<ElementList list={this.state.courseCollection} />
				<AddCourseForm categoryId={this.props.category}/>
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
		location.hash = `course/${categoryId}`
	},
	render(){
		return(
			<div className="ListItem">
				<p>Category: {this.props.listItemInfo.attributes.courseName}</p>
				<p>Description: {this.props.listItemInfo.attributes.description}</p>
				<button onClick={()=>{this.handleButton(this.props.listItemInfo.attributes._id)}}> See Course </button>
				<br />
			</div>
		) 
	}
})

export default AllCoursesPage