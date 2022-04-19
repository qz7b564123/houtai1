<template>
	<div class="users" >
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-row :gutter="20">
			  <el-col :span="6"><div class="grid-content bg-purple">
			  <div style="margin-top: 15px;">
			    <el-input placeholder="请输入内容"
				 v-model="queryInfo.query"
				  class="input-with-select">
			      <el-button slot="append"
				   icon="el-icon-search"
					@click="usersInfo(queryInfo.query)"></el-button>
			    </el-input>
			  </div>
			  </div></el-col>
			  
			  <el-col :span="4"><div class="grid-content bg-purple">
			  <div style="margin-top: 15px;">
			    <el-button type="primary" 
				@click="dialogVisible = true">添加用户</el-button>
			  </div>
			  </div></el-col>
			  
			  <!-- 弹出框 -->
			  <el-dialog
			    title="添加用户"
			    :visible.sync="dialogVisible"
			    width="30%">
			    <el-form ref="adduser"
				 :model="adduser"
				 :rules="addrules"
				 >
					<el-form-item label="用户名"
					prop='username'>
					<el-input 
					v-model="adduser.username" 
					placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码"
					prop='password'>
					<el-input 
					v-model="adduser.password" 
					type="password"
					placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item label="邮箱"
					prop='email'>
					<el-input 
					v-model="adduser.email" 
					placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<el-form-item label="电话"
					prop='mobile'>
					<el-input 
					v-model="adduser.mobile" 
					placeholder="请输入电话"
					></el-input>
					</el-form-item>
				</el-form>
			    <span slot="footer" class="dialog-footer">
			      <el-button @click="resetForm('adduser')">取 消</el-button>
			      <el-button type="primary" @click="adduserclick('adduser')">确 定</el-button>
			    </span>
			  </el-dialog>
			  
			  
			</el-row>
			
			
			<!-- 用户数据展示 -->
			<el-table
			      style="width: 100%"
				  :border='true'
				  :data="userMessage"
				  >
				  <el-table-column
				    label="#"
					type="index"
				  >
				  </el-table-column>
			      <el-table-column
			        label="姓名"
					prop='username'
					>
			      </el-table-column>
				  <el-table-column
				    label="邮箱"
					prop='email'
					>
				  </el-table-column>
				  <el-table-column
				    label="电话"
					prop='mobile'>
				  </el-table-column>
				  <el-table-column
				    label="状态"
					v-slot="scope">
					<el-switch
					  v-model="scope.row.mg_state"
					  @change='mgclick(scope.row.id,scope.row.mg_state)'
					  >
					</el-switch>
				  </el-table-column>
				  <el-table-column
				    label="角色"
					prop="role_name">
				  </el-table-column>
				  <el-table-column
				    label="操作"
					width="200px"
					v-slot="scope"
					>
					<!-- 修改 -->
					<el-button type="primary" 
					icon="el-icon-edit" 
					size="small" @click='changeusers(scope.row.id)' ></el-button>
					
					
					
					<!-- 删除 -->
					<el-button type="danger" 
					icon="el-icon-delete" 
					size="small" @click="deleteuser(scope.row.id)" ></el-button>
					
					
					
					<!-- 分配角色 -->
					<el-tooltip class="item" 
					effect="dark" 
					content="分配角色" 
					:enterable='false' 
					placement="top">
					      <el-button type="warning" 
						  icon="el-icon-s-tools" 
						  size="small" @click='fenpei(scope.row)' ></el-button>
					    </el-tooltip>
				  </el-table-column>
			    </el-table>
				
				<!-- 修改用户 -->
				<el-dialog
				  title="提示"
				  :visible.sync="dialogVisible1"
				  width="30%"
				  :before-close="handleClose">
				  <el-form ref="adduser"
				   :model="changeusermessage"
				   :rules="changeusersrules"
				   >
				  	<el-form-item label="用户名"
				  	prop='username'>
				  	<el-input 
				  	v-model="changeusermessage.username" 
					:disabled="true"
				  	></el-input>
				  	</el-form-item>
				  	<el-form-item label="邮箱"
				  	prop='email'>
				  	<el-input 
				  	v-model="changeusermessage.email" 
				  	placeholder="请输入邮箱"></el-input>
				  	</el-form-item>
				  	<el-form-item label="电话"
				  	prop='mobile'>
				  	<el-input 
				  	v-model="changeusermessage.mobile" 
				  	placeholder="请输入电话"
				  	></el-input>
				  	</el-form-item>
				  </el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible1 = false">取 消</el-button>
				    <el-button type="primary" @click="changeusersure">确 定</el-button>
				  </span>
				</el-dialog>
				
				
				<!-- 删除用户 -->
				<el-dialog
				  title="提示"
				  :visible.sync="dialogVisible2"
				  width="30%"
				  :before-close="handleClose">
				  <span>删除此用户</span>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible2 = false">取 消</el-button>
				    <el-button type="primary" @click="suredelete">确 定</el-button>
				  </span>
				</el-dialog>
				
				
				<!-- 分配角色 -->
				<el-dialog
				  title="提示"
				  :visible.sync="dialogVisible3"
				  width="30%"
				  :before-close="handleClose">
				  <p>当前用户:{{userInfo.username}}</p>
				  <p>当前角色:{{userInfo.role_name}}</p>
				  <p>分配新角色:
				  <el-select v-model="value" placeholder="请选择">
				      <el-option
					   v-for="item in options"
					   :key="item.id"
					   :label="item.roleName"
					   :value="item.id"
					  >
				      </el-option>
				    </el-select>
				  </p>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible3 = false">取 消</el-button>
				    <el-button type="primary" @click="changerole">确 定</el-button>
				  </span>
				</el-dialog>
				
				
				<!-- 分页 -->
				<el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
					  :current-page="queryInfo.pagenum"
				      :page-sizes="[1, 2, 5, 10]"
				      :page-size="queryInfo.pagesize"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="total">
				    </el-pagination>
			
		</el-card>
		
		
	</div>
</template>

<script>
	import {usersInfo,getuser,getuserrole} from '../../network/users.js'
	import {changetype} from '../../network/changetype.js'
	import {addusers,searchusersid,changeuser,deleteusers} from '../../network/adderuser.js'
	export default{
		name:'users',
		data(){
			// 验证邮箱规则
			var checkemail = (rule, value, callback) => {
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
			        if (reg.test(value)) {
			        return callback();
					}
					callback(new Error('请输入合法的邮箱'))
			}
			// 验证电话规则
			var checkmobile = (rule, value, callback) => {
			    var reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
				if(reg.test(value)){
					return callback()
				}
				callback(new Error('请输入正确的电话号码'))
			}
			return{
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:1
				},
				userMessage:[],
				total:null,
				dialogVisible: false,
				adduser:{
					username:'',
					password:'',
					email:'',
					mobile:''
				},
				addrules:{
					username:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					email:[
						{validator:checkemail,trigger: 'blur' }
					],
					mobile:[
						{validator:checkmobile,trigger: 'blur'}
					]
				},
				dialogVisible1:false,
				dialogVisible2:false,
				dialogVisible3:false,
				changeusermessage:{},
				id:0,
				changeusersrules:{
					email:[
						{validator:checkemail,trigger: 'blur' }
					],
					mobile:[
						{validator:checkmobile,trigger: 'blur'}
					]
				},
				userInfo:{},
				options:[],
				value:'',
				userrole:{}
			}
		},
		created(){
			this.usersInfo(this.queryInfo.query)
		},
		methods:{
			usersInfo(query){
				usersInfo(query,this.queryInfo.pagenum,this.queryInfo.pagesize).then(res=>{
					if(res.meta.status!==200) return this.$message.error('请求用户数据失败')
					this.total = res.data.total
					this.userMessage = res.data.users
					
				})
			},
			mgclick(uId,type){
				this.changetype(uId,type)
			},
			changetype(uId,type){
				changetype(uId,type).then(res=>{
					if(res.meta.status!==200) return this.$message.error('修改角色失败')
					this.$message.success('修改角色成功')
					this.usersInfo(this.queryInfo.query,this.queryInfo.pagenum,this.queryInfo.pagesize)
				})
			},
			// 分页
			handleSizeChange(val) {
					this.queryInfo.pagesize = val
					this.usersInfo(this.queryInfo.query,this.queryInfo.pagenum,this.queryInfo.pagesize)
			      },
			handleCurrentChange(val) {
					this.queryInfo.pagenum = val
					this.usersInfo(this.queryInfo.query,this.queryInfo.pagenum,this.queryInfo.pagesize)
			      },
			handleClose(done) {
			        this.$confirm('确认关闭？')
			          .then(_ => {
			            done();
			          })
			          .catch(_ => {});
			      },
			resetForm(formName) {
			        this.$refs[formName].resetFields()
					this.dialogVisible = false
					this.dialogVisible1 = false
			      },
			adduserclick(name){
				this.$refs[name].validate(valid=>{
					if(valid){
						this.addusers(this.adduser.username,this.adduser.password,this.adduser.email,this.adduser.mobile)
					}
				})
				this.dialogVisible = false
				this.resetForm(name)
			},
			addusers(username,password,email,mobile){
				addusers(username,password,email,mobile).then(res=>{
					console.log(res)
					if(res.meta.status !== 201) return this.$message.error('添加失败')
					this.$message.success('添加成功')
				})
				this.usersInfo(this.queryInfo.query)
			},
			changeusers(id){
				this.dialogVisible1 = true
				this.searchusersid(id)
			},
			searchusersid(id){
				searchusersid(id).then(res=>{
					if(res.meta.status!==200) return this.$message.error('获取修改的用户信息失败')
					this.changeusermessage = res.data
				})
			},
			changeusersure(){
				this.changeuser(this.changeusermessage.id,this.changeusermessage.email,this.changeusermessage.mobile)
			},
			changeuser(id,email,mobile){
				changeuser(id,email,mobile).then(res=>{
					if(res.meta.status!==200) return this.$message.error('修改用户信息失败')
					this.$message.success('修改用户信息成功')
					this.dialogVisible1 = false
					this.usersInfo(this.queryInfo.query)
				})
			},
			deleteuser(id){
				this.id = id
				this.dialogVisible2 = true
			},
			suredelete(){
				this.deleteusers(this.id)
			},
			deleteusers(id){
				deleteusers(id).then(res=>{
					console.log(res)
					this.usersInfo(this.queryInfo.query)
					this.dialogVisible2 =false
				})
			},
			fenpei(scope){
				this.dialogVisible3 = true
				this.userInfo = scope
				this.getuser()
			},
			getuser(){
				getuser().then(res=>{
					if(res.meta.status !== 200) return this.$message.error('获取用户角色失败')
					this.options = res.data
				})
			},
			changerole(){
				if(!this.value) return this.$message.error('请选择要分配的角色')
				this.getuserrole(this.userInfo.id,this.value)
			},
			getuserrole(id,rid){
				getuserrole(id,rid).then(res=>{
					if(res.meta.status !== 200) return this.$message.error('修改用户角色失败')
					this.dialogVisible3 = false
					this.usersInfo(this.queryInfo.query)
				})
			}
			
		}
	}
</script>

<style scoped="scoped" >
	.el-card{
		margin-top: 20px;
	}
</style>
