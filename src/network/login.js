import {request} from './request.js'
export function login(username,password){
	return request({
		url:'/login',
		method:'post',
		data:{
			username,password
		}
	})
}