<template>
	<div class="roles" >
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
		  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-card class="box-card">
			
			<!-- 添加角色 -->
			<el-button type="primary" >添加角色</el-button>
			
			<!-- 用户角色列表 -->
			<el-table
			      :data="roleslist"
				  :border="true"
				  >
				  
				  <el-table-column
				    type="expand"
					>
					<template
					v-slot="scope"
					>
					<!-- 渲染一级权限 -->
					<el-row :class="['bdbottom',index1===0 ? 'bdtop' : '','vcenter']" v-for="(m,index1) in scope.row.children" :key="m.id" >
						<!-- 渲染一级权限 -->
						<el-col :span="5">
							<el-tag closable @close="removeRight(scope.row,m.id)" >{{m.authName}}  </el-tag>
							<i class="el-icon-caret-right" ></i>
						</el-col>
						<!-- 渲染二级和三级权限 -->
						<el-col :span="19" >
							<el-row :class="[index2===0 ? '' : 'bdtop','vcenter']" v-for="(n,index2) in m.children" >
								<el-col :span="6">
									<el-tag type="success" closable @close="removeRight(scope.row,n.id)" >{{n.authName}}  </el-tag>
									<i class="el-icon-caret-right" ></i>
								</el-col>
								<el-col :span="18" >
									<el-tag type="warning" v-for="(o,index3) in n.children" closable @close="removeRight(scope.row,o.id)" >{{o.authName}}  </el-tag>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					</template>
				  </el-table-column>
				  
				  <el-table-column
				    type="index"
				    label="#">
				  </el-table-column>
				  
			      <el-table-column
			        prop="roleName"
			        label="角色名称">
			      </el-table-column>
				  <el-table-column
				    prop="roleDesc"
				    label="角色描述">
				  </el-table-column>
				  <el-table-column
				    label="操作"
					width="500px"
					v-slot="scope"
					>
					<el-button type="primary" icon="el-icon-edit">编辑</el-button>
					<el-button type="danger" icon="el-icon-delete">删除</el-button>
					<el-button type="warning" icon="el-icon-s-tools" @click='quanxian(scope)' >分配权限</el-button>
				  </el-table-column>
			    </el-table>
		</el-card>
		
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  @close="cleardefkeys">
		  <el-tree :data="AllRights" 
		  show-checkbox node-key="id" 
		  :default-expand-all="true" 
		  :props="defaultProps"
		  :default-checked-keys='defkeys'
		  ref='treeref'
		  ></el-tree>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="allotright">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
	
</template>

<script>
	import {roles,deleteRights,addRoles} from '../../network/roles.js'
	import {Rights} from '../../network/rights.js'
	export default{
		name:'roles',
		data(){
			return{
				roleslist:[],
				AllRights:[],
				defaultProps: {
				          children: 'children',
				          label: 'authName'
				        },
				dialogVisible : false,
				// 默认选中的节点ID值数组
				defkeys:[],
				addrolescope:''
			}
		},
		created(){
			this.roles()
		},
		methods:{
			roles(){
				roles().then(res=>{
					if(res.meta.status !== 200) return this.$message.error('获取角色列表失败')
					this.$message.success('获取角色列表成功')
					// console.log(res.data)
					this.roleslist = res.data
					// console.log(this.roleslist)
					
				})
			},
			// 根据ID删除对应权限
			async removeRight(roleId,rightId){
				// 提示是否删除
				 const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).catch(err=>{
							return err
						})
						if(confirmResult !== 'confirm') return this.$message.info('取消了删除')
						// console.log(roleId)
						let aa = roleId
						this.deleteRights(roleId.id,rightId,aa)
						roleId = aa
			},
			deleteRights(roleId,rightId,aa){
				deleteRights(roleId,rightId).then(res=>{
					if(res.meta.status !== 200) return this.$message.error('删除失败')
					aa.children = res.data
				})
			},
			// 分配权限对话框
			quanxian(scope){
				this.addrolescope = scope.row.id
				this.dialogVisible = true
				this.Rights('tree',scope)
				// 递归获取三级节点ID
				this.getLeafKey(scope.row,this.defkeys)
			},
			Rights(type){
				Rights(type).then(res=>{
					// console.log(res)
					if(res.meta.status !== 200) return this.$message.error('获取所有权限失败')
					this.AllRights = res.data
				})
			},
			// 通过递归获取三级权限ID并保存到数组中
			getLeafKey(node,arr){
				// 如果node节点不包含children属性则是三级节点
				if(!node.children) return arr.push(node.id)
				node.children.forEach(item=>{
					this.getLeafKey(item,arr)
				})
			},
			// 监听分配权限对话框的关闭事件
			cleardefkeys(){
				this.defkeys = []
			},
			// 为角色分配权限
			allotright(){
				const key = [
					...this.$refs.treeref.getCheckedKeys(),
					...this.$refs.treeref.getHalfCheckedKeys()
				]
				const idStr = key.join(',')
				console.log(idStr)
				this.addRoles(this.addrolescope,idStr)
				
			},
			addRoles(roleId,rids){
				addRoles(roleId,rids).then(res=>{
					if(res.meta.status !== 200) return this.$message.error('更新失败')
					this.$message.success('更新成功')
					this.roles()
					this.dialogVisible = false
				})
			}
		}
	}
</script>

<style scoped="scoped" >
	.el-card{
		margin-top: 20px;
	}
	.el-tag{
		margin: 7px;
	}
	.bdtop{
		border-top: solid 1px #eee;
	}
	.bdbottom{
		border-bottom: solid 1px #eee;
	}
	.vcenter{
		display: flex;
		align-items: center;
	}
</style>
