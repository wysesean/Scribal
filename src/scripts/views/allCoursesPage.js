import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import UTIL from '../util.js'

import AddCourseForm from './components/adminComponents/addCourseForm.js'
import NavBar from './components/navBar.js'
import LiveBackground from './components/liveBackground.js'
import FooterBar from './components/footerBar.js'

var AllCoursesPage = React.createClass({
	getInitialState(){
		return STORE.data
	},
	componentWillMount(){
		ACTIONS.fetchCategoryById(this.props.category)
		ACTIONS.fetchCoursesByCategory(this.props.category)
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentDidMount(){
		if(this.parallax){
			$('.parallax').parallax()
		}
	},
	componentWillUnmount(){
		STORE.reset()
		STORE.off('dataUpdated')
	},
	render() {
		console.log("state",this.state)
		if(this.state.categoryCollection.models[0]){
			console.log(this.state.categoryCollection.models[0].attributes.categoryName)
		}
		return(
			<div className="AllCoursesPage">
				<NavBar	/>
				<div className="parallax-container">
					{this.state.categoryCollection.models[0]?<h1 className="parallax-title">Courses for {this.state.categoryCollection.models[0].attributes.categoryName}</h1>:<div />}
					<div ref={(e)=>this.parallax = e} className="parallax">
						<div className="live-container">
							{this.state.categoryCollection.models[0]?<LiveBackground colorScheme={this.state.categoryCollection.models[0].attributes.colorScheme} />:<div />}
						</div>
					</div>
				</div>
				<div className="container">
					{this.state.categoryCollection.models[0]?<h3>{this.state.categoryCollection.models[0].attributes.description}</h3>:<div />}
					<ElementList category={this.props.category} list={this.state.courseCollection} />
					{UTIL.renderAdminComponent(<AddCourseForm categoryId={this.props.category}/>)}
				</div>
				<FooterBar />
			</div>
		)
	}
})

var ElementList = React.createClass({
	mapListItem(singleObj){
		return(
			<ListItem category={this.props.category} key={singleObj.cid} listItemInfo={singleObj}/>
		)
	},
	render() {
		return(
			<div className="ElementList row">
				{this.props.list.map(this.mapListItem)}
			</div>
		) 
	}
})


// {User.getCurrentUser()?<button onClick={()=>{this.enrollButton(this.props.listItemInfo.attributes._id)}}>Enroll</button>:<div />}


var ListItem = React.createClass({
	enrollButton(courseId){
		if(User.getCurrentUser()){
			ACTIONS.enrollUserToCourse(User.getCurrentUser().get('_id'),courseId)
		}
	},
	handleLink(courseId){
		location.hash = `category/${this.props.category}/course/${courseId}`
	},
	render(){
		return(
			<div className="ListItem col s12">
				<div className="my-own-hoverable card horizontal">
					<div className="card-image">
						<img onClick={()=>this.handleLink(this.props.listItemInfo.attributes._id)} className="responsive-img" src="http://lorempixel.com/150/200/" />
					</div>
					<div className="card-stacked">
						<div className="card-content">
							<h6 onClick={()=>this.handleLink(this.props.listItemInfo.attributes._id)}>{this.props.listItemInfo.attributes.courseName}</h6>
							<div className="just-a-line" />
							<p>{this.props.listItemInfo.attributes.description}</p>
							<div className="just-a-line" />
							<div className="make-me-wider">
								<div><p className="givemeroom">5 Lectures Available</p></div>
								<button className="card-btn" onClick={()=>this.handleLink(this.props.listItemInfo.attributes._id)}>More</button>
							</div>
							<div className="just-a-line" />
						</div>
					</div>
				</div>
			</div>
		) 
	}
})

export default AllCoursesPage