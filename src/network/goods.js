import {request} from './request.js'
export function goodsmes(query,pagenum,pagesize){
	return request({
		url:'/goods',
		method:'get',
		params:{
			query,pagenum,pagesize
		}
	})
}
export function deletemes(id){
	return request({
		url:'/goods/'+id,
		method:'delete',
		params:{
			id
		}
	})
}
export function adduser(goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,
pics,attrs){
	return request({
		url:'/goods',
		method:'post',
		data:{
			goods_name,
			goods_cat,
			goods_price,
			goods_number,
			goods_weight,
			goods_introduce,
			pics,
			attrs
		}
	})
}