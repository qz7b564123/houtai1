<template>
	<div class="category" >
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>
		
		
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <el-button type="primary" @click="addshop" >添加分类</el-button>
		  </div>
		  
		  
		  <!-- 添加分类 -->
		  <el-dialog
		    title="添加分类"
		    :visible.sync="dialogVisible1"
		    :before-close="handleClose"
			width="50%"
			>
		    <el-form ref="form" :model="addshopname" :rules="addshopnamerule">
				<el-form-item label="分类名称" prop='cat_name'>
					<el-input v-model="addshopname.cat_name"></el-input>
				</el-form-item>
			</el-form>
			
			<el-form ref="form" >
				<el-form-item label="父级分类" >
					<el-cascader
					    v-model="value"
						:props="cascderprop"
					    :options="shopAll"
						:clearable='true'
						:change-on-select="true"
					    @change="handleChange"></el-cascader>
				</el-form-item>
			</el-form>
			
			
			<span slot="footer" class="dialog-footer">
		      <el-button @click="dialogVisible1 = false">取 消</el-button>
		      <el-button type="primary" @click="sendaddshop">确 定</el-button>
		    </span>
		  </el-dialog>
		  
		  
		  
		  <!-- 编辑 -->
		  <el-dialog
		    title="编辑"
		    :visible.sync="dialogVisible2"
		    :before-close="handleClose">
		    <el-form ref="editform" :model="editform">
		      <el-form-item label="用户名称">
		        <el-input v-model="editform.cat_name" ></el-input>
		      </el-form-item>
			</el-form>
		    <span slot="footer" class="dialog-footer">
		      <el-button @click="dialogVisible2 = false">取 消</el-button>
		      <el-button type="primary" @click="sendeditshop">确 定</el-button>
		    </span>
		  </el-dialog>
		  
		  
		  <!-- 删除 -->
		  <el-dialog
		    title="删除用户"
		    :visible.sync="dialogVisible3"
		    :before-close="handleClose">
		    <span>是否删除该用户</span>
		    <span slot="footer" class="dialog-footer">
		      <el-button @click="dialogVisible3 = false">取 消</el-button>
		      <el-button type="primary" @click='deletetrue' >确 定</el-button>
		    </span>
		  </el-dialog>
		  
		  
		  
		  
		  <el-table
		      :data="shop"
		      row-key="cat_id"
		      border
		      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
		      <el-table-column
		        label="#"
				type="index"
		        sortable>
		      </el-table-column>
			  <el-table-column
			    prop="cat_name"
			    label="名称"
			    sortable>
			  </el-table-column>
		      <el-table-column
		        prop="cat_deleted"
		        label="是否有效"
				v-slot="scope"
		        sortable>
				<el-button v-if="scope.row.cat_deleted === false" type="success" size="mini" icon="el-icon-check" circle></el-button>
				<el-button v-else type="danger" size="mini" icon="el-icon-close" circle></el-button>
		      </el-table-column>
		      <el-table-column
		        prop="cat_level"
		        label="层级"
				v-slot="scope"
		        sortable>
				<el-tag v-if="scope.row.cat_level == 0" >一级</el-tag>
				<el-tag v-else-if="scope.row.cat_level == 1" type="success">二级</el-tag>
				<el-tag v-else-if="scope.row.cat_level == 2" type="danger">三级</el-tag>
		      </el-table-column>
			  <el-table-column
			    label="操作"
				v-slot="scope"
			    sortable>
				<el-button type="primary" @click='editshop(scope.row)' >编辑</el-button>
				<el-button type="danger" @click='deletemessage(scope.row)' >删除</el-button>
			  </el-table-column>
			  
		    </el-table>
			  
			  <el-pagination
			        @size-change="handleSizeChange"
			        @current-change="handleCurrentChange"
			        :current-page="shopinfo.pagenum"
			        :page-sizes="[1, 3, 5, 10]"
			        :page-size="shopinfo.pagesize"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="total">
			      </el-pagination>
			  
		  
		</el-card>
		
	</div>
</template>

<script>
	import {getcategory,addCategory1,sedaddCategory1,sendmessage,delshopmessage} from '../../network/category.js'
	export default{
		name:'category',
		data(){
			return {
				shopinfo:{
					type:3,
					pagenum:1,
					pagesize:5
				},
				total:0,
				shop:[],
				dialogVisible1:false,
				addshopname:{
					cat_name:'',
					cat_pid:0,
					cat_level:0
				},
				addshopnamerule:{
					cat_name:[
						{required:true,message:'请输入分类名称',trigger:'blur'}
					]
				},
				shopAll:[],
				totalAll:0,
				cascderprop:{
					// 指定级联选择器对象
					value:'cat_id',
					label:'cat_name',
					children:'children',
					expandTrigger:'hover',
					checkStrictly:true
				},
				value:[],
				dialogVisible2:false,
				editform:{
					id:'',
					cat_name:''
				},
				dialogVisible3:false,
				deleteid:''
			}
		},
		created(){
			this.getcategory(this.shopinfo.type,this.shopinfo.pagenum,this.shopinfo.pagesize)
		},
		methods:{
			// 获取数据
			getcategory(type,pagenum,pagesize){
					getcategory(type,pagenum,pagesize).then(res=>{
						if(res.meta.status !== 200) return this.$message.error('获取商品分类失败')
						this.shop = res.data.result
						this.total = res.data.total
					})
			},
			// 分页功能
			handleSizeChange(val) {
					this.shopinfo.pagesize = val
					this.getcategory(this.shopinfo.type,this.shopinfo.pagenum,this.shopinfo.pagesize)
			},
			handleCurrentChange(val) {
					this.shopinfo.pagenum = val
					this.getcategory(this.shopinfo.type,this.shopinfo.pagenum,this.shopinfo.pagesize)
			},
			handleClose(done) {
			        this.$confirm('确认关闭？')
			          .then(_ => {
			            done();
			          })
			          .catch(_ => {});
			},
			addshop(){
				this.dialogVisible1 = true
				this.addCategory1(2)
			},
			addCategory1(type){
				addCategory1(type).then(res=>{
					this.shopAll = res.data
				})
			},
			handleChange(value) {
			        console.log(this.value)
					if(this.value.length > 0){
						this.addshopname.cat_pid = value[value.length-1]
						this.addshopname.cat_level = value.length
						// console.log(this.addshopname)
					}
			},
			sendaddshop(){
				this.$refs.form.validate(valid=>{
					if(!valid) return
				})
				// console.log(this.addshopname)
				this.sedaddCategory1(this.addshopname.cat_pid,this.addshopname.cat_name,this.addshopname.cat_level)
				this.dialogVisible1 = false
			},
			sedaddCategory1(cat_pid,cat_name,cat_level){
				sedaddCategory1(cat_pid,cat_name,cat_level).then(res=>{
					if(res.meta.status !== 201) {
						return this.$message.error('创建失败')
					}
					this.$message.success('创建成功')
					this.getcategory(this.shopinfo.type,this.shopinfo.pagenum,this.shopinfo.pagesize)
				})
			},
			// 编辑
			editshop(scope){
				console.log(scope)
				this.editform.id = scope.cat_id
				this.dialogVisible2 = true
			},
			sendeditshop(){
				this.sendmessage(this.editform.id,this.editform.cat_name)
				this.dialogVisible2 = false
				console.log(this.editform)
			},
			sendmessage(id,cat_name){
				sendmessage(id,cat_name).then(res=>{
					if(res.meta.status !== 200) {
						return this.$message.error('更新失败')
					}
					this.getcategory(this.shopinfo.type,this.shopinfo.pagenum,this.shopinfo.pagesize)
				})
			},
			// 删除
			deletemessage(scope){
				console.log(scope.cat_id)
				this.dialogVisible3 = true
				this.deleteid=scope.cat_id
			},
			deletetrue(){
				this.delshopmessage(this.deleteid)
				this.dialogVisible3 = false
			},
			delshopmessage(id){
				delshopmessage(id).then(res=>{
					if(res.meta.status !== 200) {
						return this.$message.error('删除失败')
					}
					this.getcategory(this.shopinfo.type,this.shopinfo.pagenum,this.shopinfo.pagesize)
				})
			}
			
		}
	}
</script>

<style scoped="scoped" >
	.el-card{
		margin-top: 30px;
	}
	.el-input{
		width: 600px;
	}
</style>
