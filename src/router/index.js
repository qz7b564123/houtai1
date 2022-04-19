import Vue from 'vue'
import VueRouter from 'vue-router'
const login =() => import('../views/Login/login.vue')
const home =() => import('../views/home/home.vue')
const welcome =() => import('../views/welcome/welcome.vue')
const users =() => import('../views/users/users.vue')
const roles =() => import('../views/roles/roles.vue')
const rights =() => import('../views/rights/rights.vue')
const goods =() => import('../views/goods/goods.vue')
const params =() => import('../views/params/params.vue')
const categories =() => import('../views/categories/categories.vue')
const orders =() => import('../views/orders/orders.vue')
const reports =() => import('../views/reports/reports.vue')
const Rights =() => import('../views/rights/rights.vue')

const add =()=> import('../views/goods/children/add.vue')

Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		redirect:'/login'
	},
	{
		path:'/login',
		component:login,
	},
	{
		path:'/home',
		component:home,
		redirect:'/welcome',
		children:[
			{
				path:'/welcome',
				component:welcome
			},
			{
				path:'/users',
				component:users
			},
			{
				path:'/roles',
				component:roles
			},
			{
				path:'/rights',
				component:rights
			},
			{
				path:'/goods',
				component:goods
			},
			{
				path:'/params',
				component:params
			},
			{
				path:'/categories',
				component:categories
			},
			{
				path:'/orders',
				component:orders
			},
			{
				path:'/reports',
				component:reports
			},
			{
				path:'/add',
				component:add
			}
			
			
		]
	}
]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next)=>{
	if(to.path === '/login') return next()
	const token = window.sessionStorage.getItem('token')
	if(!token) return next('/login')
	next()
})



export default router
