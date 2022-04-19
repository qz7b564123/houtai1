<template>
	<div class="login" >
		<div class="login_box" >
			<div class="login_title" >登录界面</div>
			<el-form 
			:model="form"
			:rules="rules"
			 ref="loginform">
			  <el-form-item prop='username'>
			    <el-input prefix-icon='el-icon-user-solid' v-model="form.username" ></el-input>
			  </el-form-item>
			  <el-form-item prop='password'>
			    <el-input type="password" prefix-icon='el-icon-s-tools' v-model="form.password" ></el-input>
			  </el-form-item>
			  </el-form>
			<div class="login_btn" >
				<el-button type="primary" @click="submitForm('loginform')">登录</el-button>
				<el-button type="info" @click="resetForm('loginform')">重置</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {login} from '../../network/login.js'
	export default{
		name:'login',
		data(){
			return{
				form:{
					username:'admin',
					password:'123456'
				},
				rules:{
					username:[{
							required: true,
							message: '请输入用户名',
							trigger: 'blur',
							min: 3,
							max: 10,
							message: '长度在3到10个字符',
						}
					],
					password:[{
							required: true,
							message: '请输入密码',
							trigger: 'blur',
							min: 3,
							max: 10,
							message: '长度在3到10个字符'
						}
					]
				}
			}
		},
		methods:{
			submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			            this.login(this.form.username,this.form.password)
			          }
			        })
			      },
			resetForm(formName) {
			        this.$refs[formName].resetFields();
			      },
			login(username,password){
				login(username,password).then(res=>{
					console.log(res)
					if(res.meta.status !== 200) this.$message.error('登录失败')
					window.sessionStorage.setItem('token',res.data.token)
					this.$message.success('登录成功')
					this.$router.push('/home')
				})
			}
		}
	}
</script>

<style scoped="scoped" >
	.login{
		background-color: #264A6B;
		height: 100%;
	}
	.login_box{
		width: 600px;
		height: 400px;
		background-color: #fff;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.login_title{
		text-align: center;
		font-size: 30px;
		color: #264A6B;
		font-weight: bold;
		margin-top: 20px;
	}
	.el-form{
		margin-top: 80px;
		padding: 0 50px;
	}
	.login_btn{
		position: fixed;
		right: 50px;
		bottom: 60px;
	}
	
</style>
