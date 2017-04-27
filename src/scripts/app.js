import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

//Views
import LoginPage from './views/loginPage.js'
import HomePage from './views/homePage.js'
import DashboardPage from './views/dashboardPage.js'
import AboutPage from './views/aboutPage.js'
import CategoriesPage from './views/categoriesPage.js'
import AllCoursesPage from './views/allCoursesPage.js'
import CoursePage from './views/coursePage.js'
import VideoPage from './views/videoPage.js'
import ErrorPage from './views/errorPage.js'

const app = function() {
	var MainRouter = Backbone.Router.extend({
		routes:{
			'login': 'showLoginPage',
			'home': 'showHomePage',
			'dashboard': 'showDashboardPage',
			'about': 'showAboutPage',
			'categories': 'showCategoriesPage',
			'category/:categoryId/courses': 'showAllCoursesPage',
			'category/:categoryId/course/:coursesId': 'showCoursePage',
			'category/:categoryId/course/:coursesId/video/:videoId': 'showVideoPage',
			'': 'handleRedirect',
			'*errorPage': 'showErrorPage' 
		},
		showLoginPage(){
			ReactDOM.render(<LoginPage />, document.querySelector('.maincontainer'))
		},	
		showHomePage(){
			ReactDOM.render(<HomePage />, document.querySelector('.maincontainer'))
		},
		showDashboardPage(){
			ReactDOM.render(<DashboardPage />, document.querySelector('.maincontainer'))
		},
		showAboutPage(){
			ReactDOM.render(<AboutPage />, document.querySelector('.maincontainer'))
		},
		showCategoriesPage(){
			ReactDOM.render(<CategoriesPage />, document.querySelector('.maincontainer'))
		},
		showAllCoursesPage(categoryId){
			ReactDOM.render(<AllCoursesPage category={categoryId}/>, document.querySelector('.maincontainer'))
		},
		showCoursePage(categoryId,courseId){
			ReactDOM.render(<CoursePage category={categoryId} course={courseId}/>, document.querySelector('.maincontainer'))
		},
		showVideoPage(categoryId,courseId,lectureId){
			ReactDOM.render(<VideoPage category={categoryId} course={courseId} lecture={lectureId}/>, document.querySelector('.maincontainer'))
		},
		handleRedirect(){
			location.hash = 'home'
		},
		showErrorPage(){
			ReactDOM.render(<ErrorPage />, document.querySelector('.maincontainer'))
		}
	})

	new MainRouter()
	Backbone.history.start()
}

export const app_name = init()
app()
