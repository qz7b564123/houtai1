import{request} from './request.js'
export function getreports(){
	return request({
		url:'/reports/type/1',
		method:'get'
	})
}