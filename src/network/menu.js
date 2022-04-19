import{request} from './request.js'
 export function menu(){
	 return request({
		 url:'/menus',
		 method:'get'
		 
	 })
 }