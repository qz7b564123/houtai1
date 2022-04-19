import {request} from './request.js'
export function Rights(type){
	return request({
		url:'/rights/'+type,
		method:'get',
		data:{
			type
		}
	})
}
