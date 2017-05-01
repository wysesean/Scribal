import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import UTIL from '../util.js'

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
		return(
			<div className="CategoriesPage">
				<NavBar />
				<div className="parallax-container">
					<h1 className="parallax-title">Online course categories</h1>
					<div ref={(e)=>this.parallax = e} className="parallax">
						<div className="live-container">
							<LiveBackground colorScheme={"rgb(255,255,255)"} />
						</div>
					</div>
				</div>
				<div className="container">
					<h3>Find your interests by browsing our online course categories. Start learning today.</h3>
					<ElementList list={this.state.categoryCollection} />
					{UTIL.renderAdminComponent(<AddCategoryForm />)}
				</div>
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
			<div className="ElementList row">
				{this.props.list.map(this.mapListItem)}
			</div>
		) 
	}
})

var ListItem = React.createClass({
	handleButton(categoryId){
		location.hash = `category/${categoryId}/courses`
	},
	render(){
		return(
			<div onClick={()=>this.handleButton(this.props.listItemInfo.attributes._id)} className="ListItem col s12 m4 l3">
				<center>
					<div  className="img-container">
						<img className="responsive-img" src={this.props.listItemInfo.attributes.categoryImage} />
						<p className="text flow-text">{this.props.listItemInfo.attributes.categoryName}</p>
					</div>
				</center>
			</div>
		) 
	}
})

export default CategoriesPage