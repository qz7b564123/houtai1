import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
export function request(config){
	const instance = axios.create({
		baseURL:'http://127.0.0.1:8888/api/private/v1/',
		timeout:3000
	})
	instance.interceptors.request.use(config=>{
		Nprogress.start()
		config.headers.Authorization = window.sessionStorage.getItem('token')
		return config
	},err=>{
		
	})
	instance.interceptors.response.use(res=>{
		Nprogress.done()
		return res.data
	},err=>{
		
	})
	return instance(config)
	}