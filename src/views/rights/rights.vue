<template>
	<div class="rights" >
		
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
		  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!-- 主体 -->
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <el-table
		          :data="rightlist"
				  :border='true'
				  >
				  <el-table-column
				    label="#"
					type="index"
					>
				  </el-table-column>
		          <el-table-column
		            prop="authName"
		            label="权限名称">
					<el-table-column
					  prop="authName"
					  label="权限名称">
					</el-table-column>
					
					
		          </el-table-column>
				  <el-table-column
				    prop="path"
				    label="路径">
				  </el-table-column>
				  <el-table-column
				    prop="level"
					v-slot="scope"
				    label="权限等级">
					<el-tag type="success" v-if="scope.row.level == 0"  >一级</el-tag>
					<el-tag type="info" v-else-if="scope.row.level == 1"  >二级</el-tag>
					<el-tag type="warning" v-else-if="scope.row.level == 2"  >三级</el-tag>
				  </el-table-column>
				  
				  
		          
		        </el-table>
		  </div>
		  
		</el-card>
		
	</div>
</template>

<script>
	import {Rights} from '../../network/rights.js'
	export default{
		name:'rights',
		data(){
			return{
				rightlist:[]
			}
		},
		created(){
			this.Rights('list')
		},
		methods:{
			Rights(type){
				Rights(type).then(res=>{
					if(res.meta.status !== 200) return this.$message.error('获取权限列表失败')
					this.$message.success('获取权限列表成功')
					this.rightlist = res.data
					console.log(this.rightlist)
				})
			},
			aaa(scope){
				console.log(scope)
			}
		}
	}
</script>

<style scoped="scoped" >
	.box-card{
		margin-top: 30px;
	}
</style>
