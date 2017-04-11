import $ from 'jquery'
import request from 'superagent'

import STORE from './store.js'

import User from './models/userModel.js'
import {CategoryModel, CategoryCollection} from './models/categoryCollection.js'
import {CourseModel, CourseCollection} from './models/courseCollection.js'
import {LectureModel, LectureCollection} from './models/lectureCollection.js'
import ClipModel from './models/clipModel.js'

const CLOUDINARY_UPLOAD_PRESET = 'sjgfpzzo'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dd21qo4mj/upload'

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
		var newCategory = new CategoryModel(categoryObj)
			newCategory
				.save()
				.done((resp)=>{
					console.log('saved your category', resp)
					ACTIONS.fetchCategories()
				})
				.fail((err)=>{
					console.log('problem saving your category',err)
				})
	},
	fetchCategories(){
		var categoryColl = STORE.get('categoryCollection')
		categoryColl
			.fetch()
			.then(()=>{
				STORE.set({
					categoryCollection: categoryColl
				})
			})
	},
	updateCategory(categoryId, updateObj){

	},
	deleteCategory(categoryId){
		var category = STORE.data.categoryCollection.get(categoryId)
		category
			.destroy()
			.done((resp)=>{
				console.log('category has been deleted', resp)
				ACTIONS.fetchCategories()
			})
			.fail((err)=>{
				console.log('problem deleting category', err)
			})

	},
//---------------------
//Course Actions
//---------------------
	addCourseToCategory(categoryId, courseObj){
		var newCourse = new CourseModel(courseObj)
		newCourse.categoryId = categoryId
			newCourse
				.save()
				.done((resp)=>{
					console.log('saved your course', resp)
					ACTIONS.fetchCoursesByCategory(categoryId)
				})
				.fail((err)=>{
					console.log('problem saving your course',err)
				})

	},
	fetchCoursesByCategory(categoryId){
		var courseColl = STORE.get('courseCollection')
		courseColl.url = `/api/category/${categoryId}/course/`
		courseColl
			.fetch()
			.then(()=>{
				STORE.set({
					courseCollection: courseColl
				})
			})
	},
	fetchCourseById(courseId){
		var courseColl = STORE.get('courseCollection')
		courseColl.url = `/api/category/${courseId}`
		courseColl
			.fetch()
			.then(()=>{
				STORE.set({
					courseCollection: courseColl
				})
			})
	},
	deleteCourse(courseId){
		
	},
//---------------------
//Video Actions
//---------------------
	uploadVideo(file){
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
							.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
							.field('file',file)
		return upload
	},
	addLectureToCourse(courseId,courseObj){
		var newLecture = new LectureModel(courseObj)
			newLecture
				.save()
				.done((resp)=>{
					console.log('saved your lecture', resp)
					ACTIONS.fetchLectureByCourse(courseId)
				})
				.fail((err)=>{
					console.log('problem saving lecture to database', err)
				})
	},
	fetchLectureByCourse(courseId){
		var lectureColl = STORE.get('lectureCollection')
		lectureColl.url = `/api/course/${courseId}/lecture/`
		lectureColl
			.fetch()
			.then(()=>{
				STORE.set({
					lectureCollection: lectureColl
				})
			})

	},
	fetchLectureById(lectureId){
		var lectureColl = new LectureCollection()
		lectureColl.url = `/api/lecture/${lectureId}`
		lectureColl
			.fetch()
			.then(()=>{
				STORE.set({
					lectureCollection: lectureColl
				})
			})
	},
	deleteLecture(videoId){

	},

//---------------------
//Clips Actions
//---------------------
	fetchRandomClip(){
		var clipMod = new ClipModel()
		clipMod.url = `/api/clips/getRandomClip`
		clipMod
			.fetch()
			.then(()=>{
				STORE.set({
					clipModel: clipMod
				})
			})
	},
	transcribeClip(clipId,transcriptionObj){

	}
}

export default ACTIONS