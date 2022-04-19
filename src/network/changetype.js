import{request} from './request.js'
export function changetype(uId,type){
	return request({
		url:'users/'+uId+'/state/'+type,
		method:'put',
		params:{
			uId,type
		}
	})
}