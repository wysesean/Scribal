import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import AddCourseForm from './components/adminComponents/addCourseForm.js'
import ElementList from './components/elementList.js'
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



export default AllCoursesPage