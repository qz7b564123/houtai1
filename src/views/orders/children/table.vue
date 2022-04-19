<template>
	<div class="table">
		<el-table 
		:data="message" 
		border
		style="width: 100%">
		    <el-table-column
		    type="index" 
		    label="#"
			 >
		    </el-table-column>
			
			<el-table-column 
			prop="order_number" 
			label="订单编号" 
			width="300px"
			>
			</el-table-column>
			
			<el-table-column
			prop="order_price" 
			label="订单价格" 
			>
			</el-table-column>
			
			<el-table-column
			prop="order_pay" 
			label="是否付款" 
			v-slot="scope"
			>
			<el-tag v-if="scope.row.order_pay !== '0'" >已付款</el-tag>
			<el-tag v-else type="danger">未付款</el-tag>
			</el-table-column>
			
			<el-table-column
			prop="is_send" 
			label="是否发货" 
			>
			</el-table-column>
			
			<el-table-column
			prop="create_time" 
			label="下单时间" 
			>
			</el-table-column>
			
			<el-table-column
			label="操作" 
			v-slot="scope"
			>
			<el-button type="primary" icon="el-icon-edit" @click='changeclick(scope.row)' ></el-button>
			<el-button type="success" icon="el-icon-position" @click='searchclick(scope.row)' ></el-button>
			</el-table-column>
			
		</el-table>
		
		
		<!-- 编辑 -->
		<el-dialog
		  title="修改地址"
		  :visible.sync="dialogVisible"
		  :before-close="handleClose">
		  
		  <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRules" label-width="100px">
		    <el-form-item label="省市区/县" prop="address1">
		      <el-cascader
		          :options="citydata"
				  v-model="addressForm.address1"
		          :props="{ expandTrigger: 'hover' }"
		          @change="handleChange"></el-cascader>
		    </el-form-item>
			<el-form-item label="详细地址" prop="address2">
			  <el-input v-model="addressForm.address2"></el-input>
			</el-form-item>
		  </el-form>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="closeclick">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		<!-- 查询物流进度 -->
		<el-dialog
		  title="物流进度"
		  :visible.sync="dialogVisible1"
		  width="30%"
		  >
		  <span>这是一段信息</span>
		</el-dialog>
		
		
		
		<!-- 分页 -->
		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="ordersmes.pagenum"
		      :page-sizes="[10,20,30]"
		      :page-size="ordersmes.pagesize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		</el-pagination>
		
	</div>
</template>

<script>
	import {shopmessage,wuliudata} from '../../../network/orders.js'
	import {formatDate} from '../../../components/timer/shijiancuo.js'
	import citydata from '../../../components/citydata/citydata.js'
	export default {
		name: 'shoptable',
		data(){
			return{
				ordersmes:{
					// 查询参数
					query:'',
					// 当前页码	
					pagenum:1,
					// 每页显示条数	
					pagesize:10,
					// 用户 ID	
					user_id:'',
					// 支付状态	
					pay_status:'',
					// 是否发货	
					is_send:'',
					// ['个人','公司']	
					order_fapiao_title:'',
					// 公司名称	
					order_fapiao_company:'',
					// 发票内容	
					order_fapiao_content:'',
					// 发货地址	
					consignee_addr:''
				},
				// 总数
				total:0,
				message:[],
				dialogVisible:false,
				addressForm:{
					address1:[],
					address2:''
				},
				addressFormRules:{
					address1:[
						{ required: true, message: '请选择省市区/县', trigger: 'blur' }
					],
					address2:[
						{ required: true, message: '请输入详细地址', trigger: 'blur' }
					]
				},
				citydata:citydata,
				dialogVisible1:false,
			}
		},
		created(){
			// 获取订单数据
			this.shopmessage(
			this.ordersmes.query,
			this.ordersmes.pagenum,
			this.ordersmes.pagesize)
		},
		methods:{
			// 获取订单数据
			shopmessage(query,pagenum,pagesize,user_id,pay_status,is_send,order_fapiao_title,order_fapiao_company,order_fapiao_content,consignee_addr){
				shopmessage(query,pagenum,pagesize,user_id,pay_status,is_send,order_fapiao_title,order_fapiao_company,order_fapiao_content,consignee_addr).then(res=>{
					// console.log(res)
					if(res.meta.status !== 200){
						return this.$message.error('获取订单失败')
					}
					this.total = res.data.total
					res.data.goods.forEach(item=>{
						item.create_time = formatDate(item.create_time)
					})
					this.message = res.data.goods
				})
			},
			
			// 分页
			handleSizeChange(val) {
			        this.ordersmes.pagesize = val
					this.shopmessage(
					this.ordersmes.query,
					this.ordersmes.pagenum,
					this.ordersmes.pagesize)
			},
			handleCurrentChange(val) {
					this.ordersmes.pagenum = val
					this.shopmessage(
					this.ordersmes.query,
					this.ordersmes.pagenum,
					this.ordersmes.pagesize)
			},
			// 弹出框
			changeclick(scope){
				this.dialogVisible = true
			},
			handleClose(done) {
			        this.dialogVisible = false
					this.$refs.addressFormRules.resetFields()
			},
			closeclick(){
				this.$refs.addressFormRules.resetFields()
				this.dialogVisible = false
			},
			handleChange(value) {
			        // console.log(value);
			},
			searchclick(scope){
				this.dialogVisible1 = true
				console.log(scope)
				// this.wuliudata(1106975712662)
			},
			// wuliudata(id){
			// 	wuliudata(id).then(res=>{
			// 		console.log(res)
			// 	})
			// }
		}
	}
</script>

<style scoped="scoped">
</style>
