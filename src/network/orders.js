import {request} from './request.js'
export function shopmessage(query,pagenum,pagesize,user_id,pay_status,is_send,order_fapiao_title,order_fapiao_company,order_fapiao_content,consignee_addr){
	return request({
		url:'/orders',
		method:'get',
		params:{
			query,
			pagenum,
			pagesize,
			user_id,
			pay_status,
			is_send,
			order_fapiao_title,
			order_fapiao_company,
			order_fapiao_content,
			consignee_addr
		}
	})
}
export function wuliudata(id){
	return request({
		url:'/kuaidi/'+id,
		method:'get',
		params:{
			id
		}
	})
}