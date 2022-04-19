<template>
	<div class="add">
		<bread>
			<span slot='first'>首页</span>
			<span slot='second'>商品管理</span>
			<span slot='third'>添加商品</span>
		</bread>

		<el-card>
			<el-alert title="添加商品信息" show-icon center type="info">
			</el-alert>

			<!-- 横向 -->
			<el-steps align-center :active="active *1" finish-status="success">
				<el-step title="基本信息"></el-step>
				<el-step title="商品参数"></el-step>
				<el-step title="商品属性"></el-step>
				<el-step title="商品图片"></el-step>
				<el-step title="商品内容"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>

			<!-- 纵向 -->
			<el-form :model="addForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px">
				<el-tabs :tab-position="'left'" @tab-click="tabclick" v-model="active" :before-leave='beforeTabLeave'>
					<el-tab-pane label="基本信息" name="0">
						<el-form-item label="商品名称" prop="goods_name">
							<el-input v-model="addForm.goods_name"></el-input>
						</el-form-item>
						<el-form-item label="商品价格" prop="goods_price">
							<el-input type="number" v-model="addForm.goods_price"></el-input>
						</el-form-item>
						<el-form-item label="商品重量" prop="goods_weight">
							<el-input type='number' v-model="addForm.goods_weight"></el-input>
						</el-form-item>
						<el-form-item label="商品数量" prop="goods_number">
							<el-input type="number" v-model="addForm.goods_number"></el-input>
						</el-form-item>
						<el-form-item label="商品分类" prop="goods_cat">
							<el-cascader v-model="addForm.goods_cat" :options="fenlei" :props="option"
								@change="handleChange"></el-cascader>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品参数" name="1">
						<!-- 渲染表单item项 -->
						<el-form-item v-for="(m,index) in manydata" :label="m.attr_name" :key="m.attr_id">
							<!-- <el-tag v-for="(n,index) in m.attr_vals" >{{n}}</el-tag> -->
							<el-checkbox-group v-model="m.attr_vals">
								<el-checkbox v-for="(n,index1) in m.attr_vals" border :label="n" :key="index1">
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品属性" name="2">
						<el-form-item v-for="(m,index) in manydata1" :label="m.attr_name" :key="m.attr_id">
							<!-- <el-tag v-for="(n,index) in m.attr_vals" >{{n}}</el-tag> -->
							<el-input v-model="m.attr_vals"></el-input>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品图片" name="3">
						<!-- action表示图片要上传的地址 -->
						<!-- on-preview处理图片预览效果 -->
						<!-- on-remove处理移除图片的操作 -->
						<!-- list-type当前预览方式 -->
						<el-upload class="upload-demo" action="http://127.0.0.1:8888/api/private/v1/upload"
							:on-preview="handlePreview" :on-remove="handleRemove" :headers="headerObj"
							:on-success="handlesuccess" list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>

						</el-upload>
					</el-tab-pane>
					<el-tab-pane label="商品内容" name="4">

						<!-- vue-quill -->
						<quill-editor 
						v-model="addForm.goods_introduce" 
						ref="myQuillEditor" 
						>
						</quill-editor>
						
						<el-button type="primary" @click='addclick'>添加商品</el-button>

					</el-tab-pane>
				</el-tabs>
			</el-form>


		</el-card>


		<!-- 预览图片 -->
		<el-dialog title="图片预览" :visible.sync="picdialogVisible" :before-close="handleClose">
			<span>
				<img :src="lujing" />
			</span>
		</el-dialog>


	</div>
</template>

<script>
	import bread from '../../../components/bread/bread.vue'
	import {adduser} from '../../../network/goods.js'
	import {
		uploadimg
	} from '../../../network/goods.js'
	import {
		getcategory
	} from '../../../network/category.js'
	import {
		getparams,
		edituser
	} from '../../../network/params.js'
	export default {
		name: 'add',
		components: {
			bread
		},
		data() {
			return {
				active: '0',
				// 表单数据对象
				addForm: {
					goods_name: '',
					goods_price: 0,
					goods_weight: 0,
					goods_number: 0,
					goods_cat: [],
					sel: 'many',
					// 图片临时地址
					pics: [],
					// 商品详情描述
					goods_introduce:'',
					attrs:[]
				},
				// 选择分类
				value: [],
				option: {
					value: 'cat_id',
					label: 'cat_name',
					children: 'children',
					expandTrigger: 'hover'
				},
				fenlei: [],
				rules: {
					goods_name: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					goods_price: [{
						required: true,
						message: '请输入商品价格',
						trigger: 'blur'
					}],
					goods_weight: [{
						required: true,
						message: '请输入商品重量',
						trigger: 'blur'
					}],
					goods_number: [{
						required: true,
						message: '请输入商品数量',
						trigger: 'blur'
					}],
					goods_cat: [{
						required: true,
						message: '请输入商品分类',
						trigger: 'blur'
					}]
				},
				// 商品参数
				manydata: [],
				// 商品属性
				manydata1: [],
				// 图片上传组件的headres请求头对象
				headerObj: {
					Authorization: window.sessionStorage.getItem('token')
				},
				// 预览图片开关
				picdialogVisible: false,
				lujing: ''
			}
		},
		created() {
			this.getcategory(3)
		},
		methods: {
			getcategory(type) {
				getcategory(type).then(res => {
					// console.log(res)
					this.fenlei = res.data
				})
			},
			handleChange(value) {
				console.log(value);
				if (value.length !== 3) {
					this.addForm.goods_cat = []
				}

			},
			beforeTabLeave(activeName, oldActiveName) {
				if (this.addForm.goods_cat.length !== 3) {
					this.$message.error('请先选择分类')
					return false
				}
			},
			tabclick() {
				// 证明访问的是动态参数面板
				if (this.active === '1') {
					this.getparams(this.addForm.goods_cat[this.addForm.goods_cat.length - 1], 'many')
				} else if (this.active === '2') {
					this.getparams1(this.addForm.goods_cat[this.addForm.goods_cat.length - 1], 'only')
				}
			},
			getparams(id, sel) {
				getparams(id, sel).then(res => {
					console.log(res)
					if (res.meta.status !== 200) {
						this.$message.error('获取失败')
					}
					res.data.forEach(item => {
						if (item.attr_vals === '') {
							item.attr_vals = []
						} else {
							item.attr_vals = item.attr_vals.split(',')
						}
					})
					this.manydata = res.data
				})
			},
			getparams1(id, sel) {
				getparams(id, sel).then(res => {
					console.log(res)
					if (res.meta.status !== 200) {
						this.$message.error('获取失败')
					}
					this.manydata1 = res.data
				})
			},
			// 上传图片
			// 处理移除图片的操作
			handleRemove(file, fileList) {
				// console.log(file, fileList);
				// 当前要移除的图片的临时路径
				const filepath = file.response.data.tmp_path
				const i = this.addForm.pics.findIndex(x => {
					x.pic === filepath
				})
				this.addForm.pics.splice(i, 1)
				// console.log(this.addForm)
			},
			// 处理图片预览效果
			handlePreview(file) {
				console.log(file)
				this.picdialogVisible = true
				this.lujing = file.response.data.url
			},
			// 监听图片上传成功
			handlesuccess(respone) {
				// console.log(respone)
				// 拼接
				const picinfo = {
					pic: respone.data.tmp_path
				}
				// 将图片信息对象push到pic数组中
				this.addForm.pics.push(picinfo)
				console.log(this.addForm)
			},
			// 图片预览关闭
			handleClose(done) {
				this.picdialogVisible = false
			},
			addclick(){
				this.$refs.ruleForm.validate(valid=>{
					if(!valid){
						return this.$message.error('请输入必填信息')
					}
					
					// 处理动态参数和静态属性
					this.manydata.forEach(item=>{
						const newInfo = {
							attr_id:item.attr_id,
							attr_value:item.attr_vals.join(' ')
						}
						this.addForm.attrs.push(newInfo)
					})
					// console.log(this.addForm)
					this.manydata1.forEach(item=>{
						const newInfo = {
							attr_id:item.attr_id,
							attr_value:item.attr_vals
						}
						this.addForm.attrs.push(newInfo)
					})
					this.adduser(
					this.addForm.goods_name,
					this.addForm.goods_cat,
					this.addForm.goods_price,
					this.addForm.goods_number,
					this.addForm.goods_weight,
					this.addForm.goods_introduce,
					this.addForm.pics,
					this.addForm.attrs
					)
				})
			},
			adduser(goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs){
				goods_cat = goods_cat.join(',')
				adduser(goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs).then(res=>{
					console.log(res)
					if(res.meta.status !== 201){
						return this.$message.error('创建失败')
					}
					this.$message.success('创建成功')
					this.$router.push('/goods')
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.el-card {
		padding-top: 30px;
	}

	.el-steps {
		padding-top: 30px;
	}

	.el-step__title {
		font-size: 12px;
	}
	.el-button{
		margin-top: 20px;
	}
</style>
