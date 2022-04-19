<template>
	<div class="goodstable" >
		<el-table
		      :data="goodsmessage"
			  border
			  >
			  <el-table-column
			    type="index"
			    label="#">
			  </el-table-column>
			  <el-table-column
			    prop="goods_name"
			    label="商品名称"
				width="500px"
				>
			  </el-table-column>
			  <el-table-column
			    prop="goods_price"
			    label="商品价格(元)"
				width="100px"
				>
			  </el-table-column>
			  <el-table-column
			    prop="goods_weight"
			    label="商品重量"
				width="100px"
				>
			  </el-table-column>
			  <el-table-column
			    prop="add_time"
			    label="创建时间"
				width="300px"
				>
			  </el-table-column>
			  <el-table-column
			  width="400px"
			    prop="date"
			    label="操作"
				v-slot="scope"
				>
				<el-button type="primary" icon="el-icon-edit"></el-button>
				<el-button type="danger" icon="el-icon-delete" @click='deleteclick(scope.row)' ></el-button>
			  </el-table-column>
			  
		</el-table>
		
		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="goods.pagenum"
		      :page-sizes="[1, 3, 8]"
		      :page-size="goods.pagesize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
			
			<!-- 删除弹出框 -->
			<el-dialog
			  title="删除"
			  width="30%"
			  :visible.sync="deldialogVisible">
			  <span>确认删除该信息</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="deldialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="handleClose">确 定</el-button>
			  </span>
			</el-dialog>
		
	</div>
</template>

<script>
	import {goodsmes,deletemes} from '../../../network/goods.js'
	import {formatDate} from '../../../components/timer/shijiancuo.js'
	export default{
		name:'goodstable',
		data(){
			return{
				goods:{
					query:'',
					pagenum:1,
					pagesize:1
				},
				// 获取的表格数据
				goodsmessage:[],
				total:0,
				// 删除用户的ID
				goods_id:'',
				// 删除弹出框
				deldialogVisible:false
			}
		},
		created(){
			this.goodsmes(this.goods.query,this.goods.pagenum,this.goods.pagesize)
		},
		methods:{
			goodsmes(query,pagenum,pagesize){
				goodsmes(query,pagenum,pagesize).then(res=>{
					// console.log(res)
					if(res.meta.status !== 200){
						return this.$message.error('获取列表失败')
					}
					res.data.goods.forEach(item=>{
						item.add_time = formatDate(item.add_time)
					})
					this.goodsmessage = res.data.goods
					this.total = res.data.total
				})
			},
			// 分页
			handleSizeChange(val) {
			        console.log(`每页 ${val} 条`);
					this.goods.pagesize = val
					this.goodsmes(this.goods.query,this.goods.pagenum,this.goods.pagesize)
			      },
			handleCurrentChange(val) {
			        console.log(`当前页: ${val}`);
					this.goods.pagenum = val
					this.goodsmes(this.goods.query,this.goods.pagenum,this.goods.pagesize)
			      },
			// 删除按钮
			deleteclick(scope){
				this.deldialogVisible = true
				console.log(scope)
				this.goods_id = scope.goods_id
			},
			// 删除
			handleClose() {
			        this.deletemes(this.goods_id)
			},
			deletemes(id){
				deletemes(id).then(res=>{
					if(res.meta.status !== 200){
						return this.$message.error('删除失败')
					}
					this.deldialogVisible = false
					this.goodsmes(this.goods.query,this.goods.pagenum,this.goods.pagesize)
				})
			}
		},
		updated(){
			this.$bus.$on('searchclick',searchclick=>{
				this.goods.query = searchclick
				this.goodsmes(this.goods.query,this.goods.pagenum,this.goods.pagesize)
			})
		}
	}
</script>

<style scoped="scoped" >
	.goodstable{
		margin-top: 30px;
	}
	
</style>
