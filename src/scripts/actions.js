import $ from 'jquery'

import STORE from './store.js'

import User from './models/userModel.js'
import CategoryCollection from '.models/categoryCollection.js'
import CourseCollection from '.models/courseCollection.js'
import VideoCollection from '.models/videoCollection.js'
import ClipModel from '.models/clipModel.js'


const ACTIONS = {

//---------------------
//User Actions
//---------------------
	registerUser(formData) {
		User.register(formData)
			.done((response) => {
				console.log('register success', response)
				ACTIONS.loginUser(formData.email, formData.password)
			})
			.fail((error)=> console.log('register fail', error)) 
	},
	loginUser(email, password) {
		User.login(email, password) 
			.done((response) => {
				console.log('login success', response)
				location.hash = 'home'
			})
			.fail((error)=>{
				console.log('login fail', error)
			})
	},
	logoutUser() {
		User.logout()
			.done((response) => {
				console.log('you logged out', response)
				location.hash = 'login'
			})
			.fail((error) => {
				console.log('problem logging out', error)
			})
	},

//---------------------
//Category Actions
//---------------------
	addCategory(categoryObj){
		
	},
	fetchCategories(){
		
	},
	fetchCategoryById(categoryId){

	},
	updateCategory(categoryId, updateObj){

	},
	deleteCategory(categoryId){

	},
//---------------------
//Course Actions
//---------------------
	addCourseToCategory(categoryId, courseObj){
		
	},
	fetchCoursesByCategory(categoryId){
		
	},
	fetchCourseById(courseId){

	},
]	deleteCourse(courseId){
		
	},
//---------------------
//Video Actions
//---------------------
	addVideoToCourse(courseId){
		
	},
	fetchVideoByCourse(courseId){

	},
	fetchVideoById(videoId){

	},
	deleteVideo(videoId){

	},

//---------------------
//Clips Actions
//---------------------
	fetchRandomClip(){

	},
	transcribeClip(clipId,transcriptionObj){

	}
}

export default ACTIONS