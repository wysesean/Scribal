import $ from 'jquery'

import STORE from './store.js'

import User from './models/userModel.js'
import {CategoryModel, CategoryCollection} from './models/categoryCollection.js'
import {CourseModel, CourseCollection} from './models/courseCollection.js'
import {VideoModel, VideoCollection} from './models/videoCollection.js'
import ClipModel from './models/clipModel.js'


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
		var categoryInstance = new CategoryModel(categoryObj)
			// categoryInstance
			// 	.save()
			// 	.done((resp)=>{
			// 		console.log('saved your category', resp)
			// 	})
			// 	.fail((err)=>{
			// 		console.log('problem saving your category',err)
			// 	})

		$.ajax({
			method: 'POST',
			type: 'json',
			url: 'api/category',
			data: categoryObj
		})
		.done(()=>{
			//NOTE: CALLING FETCHCATEGORIES CAUSES ITSELF TO LOOP
			ACTIONS.fetchCategories()
		})
		.fail((err)=>{
			console.log('failed adding category', err)
		})
	},
	fetchCategories(){
		//BAD INFINITE LOOP

		// var categoryColl = STORE.get('categoryCollection')
		// categoryColl
		// 	.fetch()
		// 	.then(()=>{
		// 		STORE.set({
		// 			categoryCollection: categoryColl
		// 		})
		// 	})

		// $.ajax({
		// 	method: 'GET',
		// 	type: 'json',
		// 	url: 'api/category'
		// })
		// .done((resp)=>{
		// 	var newColl = new CategoryCollection()
		// 	resp.forEach((singleObj)=>{
		// 		newColl.create(singleObj)
		// 	})
		// 	STORE.set({
		// 		categoryCollection: newColl
		// 	})
		// })
		// .fail((err)=>{
		// 	console.log('failed fetching categories', err)
		// })

		$.ajax({
			method: 'GET',
			type: 'json',
			url: 'api/category'
		})
		.done((resp)=>{
			STORE.set({
				categoryCollection: resp
			})
		})
		.fail((err)=>{
			console.log('failed fetching categories', err)
		})

	},
	updateCategory(categoryId, updateObj){

	},
	deleteCategory(categoryId){
		var category = STORE.data.categoryCollection.get(categoryId)
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
	deleteCourse(courseId){
		
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