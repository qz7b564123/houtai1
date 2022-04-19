import{request} from'./request.js'
export function usersInfo(query,pagenum,pagesize){
	return request({
		url:'/users',
		method:'get',
		params:{
			query,
			pagenum,
			pagesize
		}
	})
}
export function getuser(){
	return request({
		url:'/roles',
		method:'get'
	})
}
export function getuserrole(id,rid){
	return request({
		url:'/users/'+id+'/role',
		method:'put',
		data:{
			id,rid
		}
	})
}