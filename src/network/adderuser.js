import{request} from './request.js'
export function addusers(username,password,email,mobile){
	return request({
		url:'/users',
		method:'post',
		data:{
			username,password,email,mobile
		}
	})
}
export function searchusersid(id){
	return request({
		url:'/users/'+id,
		method:'get',
		params:{
			id
		}
	})
}
export function changeuser(id,email,mobile){
	return request({
		url:'/users/'+id,
		method:'put',
		data:{
			email,mobile
		}
	})
}
export function deleteusers(id){
	return request({
		url:'/users/'+id,
		method:'delete',
		params:{
			id
		}
	})
}