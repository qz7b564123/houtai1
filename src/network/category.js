import {request} from './request.js'
 export function getcategory(type,pagenum,pagesize){
	 return request({
		 url:'/categories',
		 method:'get',
		 params:{
			 type,
			 pagenum,
			 pagesize
		 }
	 })
 }
 export function addCategory(){
	 return request({
		 url:'/categories',
		 method:'post',
		 data:{
			 cat_pid,
			 cat_name,
			 cat_level
		 }
	 })
 }
 
 export function addCategory1(type){
 	 return request({
 		 url:'/categories',
 		 method:'get',
		 params:{
			 type
		 }
 	 })
 }
 
 export function sedaddCategory1(cat_pid,cat_name,cat_level){
 	 return request({
 		 url:'/categories',
 		 method:'post',
 		 data:{
 			 cat_pid,cat_name,cat_level
 		 }
 	 })
 }
 export function sendmessage(id,cat_name){
	 return request({
		 url:'/categories/'+id,
		 method:'put',
		 data:{
			 id,cat_name
		 }
	 })
 }
 export function delshopmessage(id){
	 return request({
		 url:'/categories/'+id,
		 method:'delete',
		 params:{
			 id
		 }
	 })
 }