import React from 'react'
import User from './models/userModel.js'

const UTIL = {
	//Renders components if user is an admin
	renderAdminComponent(component){
		if(User.getCurrentUser()){
			if(User.getCurrentUser().get('admin')){
				return component
			}
		}
		return(
			<div/>
		)
	}
}

export default UTIL