import {request} from './request.js'
export function getparams(id,sel){
	return request({
		url:'/categories/'+id+'/attributes',
		method:'get',
		params:{
			id,sel
		}
	})
}
export function adduser(id,attr_name,attr_sel){
	return request({
		url:'/categories/'+id+'/attributes',
		method:'post',
		data:{
			id,attr_name,attr_sel
		}
	})
}

export function edituser(id,attrId,attr_name,attr_sel,attr_vals){
	return request({
		url:'/categories/'+id +'/attributes/'+attrId,
		method:'put',
		data:{
			id,attrId,attr_name,attr_sel,attr_vals
		}
	})
}
export function deleuser(id,attrid){
	return request({
		url:'/categories/'+id+'/attributes/'+attrid,
		method:'delete',
		params:{
			id,attrid
		}
	})
}