<template>
	<div class="home" >
		<el-container>
		  <el-header>
			  <div class="left" >电商后台管理系统</div>
			  <div class="right" ><el-button type="primary" @click='tuichu'>退出</el-button></div></el-header>
		  <el-container>
		    <el-aside>
				<el-menu
      :default-active="path"
	  :unique-opened='true'
	  :router='true'
	  :collapse='iscollapse'
      :class="{aaa:iscollapse}"
      background-color="#545c64"
	  :collapse-transition='false'
      text-color="#fff"
      active-text-color="#ffd04b">
	  <div class="change" @click="changecallpse()" >|||</div>
      <el-submenu :index="m.path" v-for="(m,index) in show" >
        <template slot="title">
          <i :class="logo[m.id]"></i>
          <span>{{m.authName}}</span>
        </template>
        <el-menu-item-group v-for="(n,index) in m.children" >
            <el-menu-item :index="n.path" @click='change(n.path)'>
				<template slot="title">
				  <i class="el-icon-menu"></i>
				  <span>{{n.authName}}</span>
				</template>
			</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
			</el-aside>
		    <el-main > <router-view></router-view> </el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	import {menu} from '../../network/menu.js'
	export default{
		name:'home',
		data(){
			return{
				show:[],
				logo:{
					'125':'el-icon-user-solid',
					'103':'el-icon-s-tools',
					'101':'el-icon-s-goods',
					'102':'el-icon-edit',
					'145':'el-icon-finished'
				},
				iscollapse:false,
				path:''
			}
		},
		methods:{
			tuichu(){
				window.sessionStorage.clear('token')
				this.$message.success('退出成功')
				this.$router.push('/login')
			},
			getMenu(){
				menu().then(res=>{
					if(res.meta.status!==200) return this.$message.error('获取列表失败')
					this.show = res.data
					this.$message.success('获取列表成功')
				})
			},
			changecallpse(){
				this.iscollapse = !this.iscollapse
			},
			change(path){
				window.sessionStorage.setItem('path',path)
				this.path=path
			}
		},
		created(){
			this.getMenu()
			this.path=window.sessionStorage.getItem('path')
		}
	}
</script>

<style scoped="scoped" >
	.home{
		height: 100%;
	}
	.el-container{
		height: 100%;
	}
	.el-header{
		background-color: #363D40;
	}
	.left{
		position: fixed;
		left: 20px;
		color: #fff;
		padding-top: 15px;
	}
	.right{
		padding-top: 10px;
		position: fixed;
		right: 20px;
	}
	.el-aside,.el-menu{
		height: 100%;
	}
	.change{
		background-color: #475163;
		text-align: center;
		color: #fff;
		height: 30px;
		font-size: 18px;
		cursor: pointer;
	}
	.aaa{
		width: 55px;
	}
	
</style>
