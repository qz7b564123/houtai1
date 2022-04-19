import {request} from './request.js'
export function roles(){
	return request({
		url:'/roles',
		method:'get'
	})
}
export function deleteRights(roleId,rightId){
	return request({
		url:'/roles/' + roleId + '/rights/' + rightId,
		method:'delete',
		params:{
			roleId,rightId
		}
	})
}

export function addRoles(roleId,rids){
	return request({
		url:'/roles/'+roleId + '/rights',
		method:'post',
		data:{
			roleId,rids
		}
	})
}