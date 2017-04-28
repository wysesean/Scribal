import $ from 'jquery'
import request from 'superagent'

import STORE from './store.js'

import User from './models/userModel.js'
import {CategoryModel, CategoryCollection} from './models/categoryCollection.js'
import {CourseModel, CourseCollection} from './models/courseCollection.js'
import {LectureModel, LectureCollection} from './models/lectureCollection.js'
import {EnrollmentModel, EnrollmentCollection} from './models/enrollmentCollection.js'
import ClipModel from './models/clipModel.js'
import TranscriptionModel from './models/transcriptionModel.js'

const CLOUDINARY_UPLOAD_PRESET = 'sjgfpzzo'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dd21qo4mj/upload'

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

const ACTIONS = {

//---------------------
//User Actions
//---------------------
	registerUser(formData) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
			User.register(formData)
				.done((resp) => {
					console.log('register success', resp)
					ACTIONS.loginUser(formData.email, formData.password)
				})
				.fail((err)=> {
					console.log('register fail', err)
					toastr.error("Oops! Try again")
				})
		}
		else{
		}
	},

	loginUser(email, password) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			User.login(email, password) 
				.done((resp) => {
					console.log('login success')
					toastr.success("Welcome to Scribal!")
					location.hash = 'home'
				})
				.fail((err)=>{
					toastr.warning("Oops! Try again.")
					console.log('login fail', err)
				})
		}
		else{
			toastr.warning("Oops! Try again.")
		}
	},
	logoutUser() {
		User.logout()
			.done((resp) => {
				console.log('you logged out', resp)
				toastr.success('See you later!')
				location.hash = 'login'
			})
			.fail((err) => {
				console.log('problem logging out', err)
			})
	},
	// fetchUserCount(){
	// 	return $.ajax({
	// 		method: 'GET',
	// 		type: 'json',
	// 		url:'api/users/getUserCount'
	// 	})
	// 	.done((resp)=>{console.log('server sent back',resp)})
	// 	.fail((err)=>err)
	// },

//---------------------
//Enrollment Actions
//---------------------
	enrollUserToCourse(userId,courseId){		
		let payload = {
			courseInfo: courseId,
			userInfo: userId,
		}
		let newEnroll = new EnrollmentModel(payload)
		newEnroll.url = `/api/users/enrollment`
		newEnroll
			.save()
			.done((resp)=>{
				console.log('succesful enrollment',resp)
				ACTIONS.fetchUserEnrolledCourses(userId)
			})
			.fail((err)=>{
				console.log('error enrolling', err)
			})
	},
	unenrollUserFromCourse(userId,enrollId){
		var enrolledCourse = STORE.get('enrollmentCollection').get(enrollId)
		enrolledCourse.url = `/api/users/${userId}/enrollment/${enrollId}`
		enrolledCourse
			.destroy()
			.done((resp)=>{
				console.log('course unenrolled', resp)
			})
			.fail((err)=>{
				console.log('problem unenrolling', err)
			})
	},
	fetchUserEnrolledCourses(userId){
		let enrollColl = STORE.get('enrollmentCollection')
		enrollColl.url = `/api/users/${userId}/enrollment/`
		enrollColl
			.fetch()
			.then(()=>{
				STORE.set({
					enrollmentCollection: enrollColl
				})
			})
	},
	userWatchedLecture(userId, lectureId){
		console.log('action called')
		$.ajax({
			method: 'PUT',
			type: 'json',
			url:`api/users/${userId}/lecture/${lectureId}/watched`
		})
		.done((resp)=>{
			console.log('succesfully entered lecturewatched record')
		})
		.fail((err)=>{
			console.log('error recording lecturewatched', err)
		})
	},

//---------------------
//Category Actions
//---------------------
	addCategory(categoryObj){
		let newCategory = new CategoryModel(categoryObj)
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
		let categoryColl = STORE.get('categoryCollection')
		categoryColl
			.fetch()
			.then(()=>{
				STORE.set({
					categoryCollection: categoryColl
				})
			})
	},
	fetchCategoryById(categoryId){
		let categoryColl = STORE.get('categoryCollection')
		let categoryModel = new CategoryModel()

		categoryModel.url = `api/category/${categoryId}`
		categoryModel
			.fetch()
			.then(()=>{
				categoryColl.push(categoryModel)
				STORE.set({
					categoryCollection: categoryColl
				})
			})
	},
	//TO DO
	updateCategory(categoryId, updateObj){

	},

	//TO DO OVERHAUL THIS
	deleteCategory(categoryId){
		let category = STORE.data.categoryCollection.get(categoryId)
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
		let newCourse = new CourseModel(courseObj)
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
		let courseColl = STORE.get('courseCollection')
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
		let courseColl = STORE.get('courseCollection')
		courseColl.url = `/api/category/${courseId}`
		courseColl
			.fetch()
			.then(()=>{
				STORE.set({
					courseCollection: courseColl
				})
			})
	},

	//TO DO OVERHAUL THIS
	deleteCourse(courseId){
		
	},
//---------------------
//Lecture Actions
//---------------------
	uploadLecture(file){
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
							.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
							.field('file',file)
		return upload
	},
	addLectureToCourse(courseId,courseObj){
		let newLecture = new LectureModel(courseObj)
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
		let lectureColl = STORE.get('lectureCollection')
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
		let lectureColl = new LectureCollection()
		lectureColl.url = `/api/lecture/${lectureId}`
		return lectureColl
			.fetch()
			.then(()=>{
				STORE.set({
					lectureCollection: lectureColl
				})
			})
	},
	fetchTranscription(lectureId){
		let transcriptionMod = new TranscriptionModel()
		transcriptionMod.url = `/api/lecture/${lectureId}/getTranscription`
		return transcriptionMod
			.fetch()
			.then(()=>{
				STORE.set({
					transcriptionModel: transcriptionMod
				})
			})
	},

	//TO DO OVERHAUL THIS
	deleteLecture(videoId){

	},

//---------------------
//Clips Actions
//---------------------
	fetchRandomClip(){
		let clipMod = new ClipModel()
		clipMod.url = `/api/clips/getRandomClip`
		return clipMod
				.fetch()
				.then(()=>{
					STORE.set({
						clipModel: clipMod
					})
				})
	},
	//set is either a 0 or 1, which corresponds to set1 or set2 respectively
	transcribeClip(clip, set, inputStr){
		set ? clip.get('set2').transcriptionCollection.push(inputStr) : clip.get('set1').transcriptionCollection.push(inputStr)
		clip.url = `/api/clips/${clip.get('_id')}`
		clip.save()
			.done((resp)=>{console.log('clip has been transcribed', resp)})
			.fail((err)=>{console.log('problem transcribing clip', err)})
	}
}

export default ACTIONS