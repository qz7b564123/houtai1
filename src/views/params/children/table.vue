<template>
	<div class="biaoge" >
		<el-table
		      :data="tableData"
			  border
			  >
			  <el-table-column
			    label=""
			  	type="expand"
			  	>
				<template v-slot="scope" >
					<el-tag v-for="(m,index) in scope.row.attr_vals" >{{m}}</el-tag>
					<el-input
					  class="input-new-tag"
					  v-if="scope.row.inputVisible"
					  v-model="scope.row.inputValue"
					  ref="saveTagInput"
					  size="small"
					  @keyup.enter.native="handleInputConfirm(scope.row)"
					  @blur="handleInputConfirm(scope.row)"
					>
					</el-input>
					<el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
				</template>
			  </el-table-column>
			  <el-table-column
			    label="#"
				type="index"
				>
			  </el-table-column>
		      <el-table-column
		        prop="attr_name"
		        label="参数名称"
				>
		      </el-table-column>
			  <el-table-column
			    label="操作">
			  </el-table-column>
		      
		    </el-table>
	</div>
</template>

<script>
	import {getparams,edituser} from '../../../network/params.js'
	export default{
		name:'biaoge',
		data(){
			return{
				message:{
					id:'',
					sel:'many'
				},
				tableData:[]
			}
		},
		mounted(){
			this.$bus.$on('value',sel=>{
				// console.log(sel)
				if(sel == 0){
					this.message.sel = 'many'
					this.getparams(this.message.id,this.message.sel)
				}
				else if(sel ==1){
					this.message.sel = 'only'
					this.getparams(this.message.id,this.message.sel)
				}
			})
			this.$bus.$on('id',messageid=>{
				this.message.id = messageid
				this.getparams(this.message.id,this.message.sel)
			})
		},
		methods:{
			getparams(id,sel){
				getparams(id,sel).then(res=>{
					// console.log(res)
					if(res.meta.status !== 200){
						return this.$message.error('获取数据失败')
					}
					res.data.forEach(item=>{
						if(item.attr_vals === ''){
							item.attr_vals = []
						}
						else{
							item.attr_vals = item.attr_vals.split(',')
						}
						item.inputVisible = false
						item.inputValue = ''
					})
					this.tableData = res.data
				})
			},
			handleClose(tag) {
			        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
			      },
			
			      showInput(scope) {
			        scope.inputVisible = true
					// 文本框自动获得焦点
					//$nextTick挡页面上元素被重新渲染之后，才会指定回调函数中的代码
					this.$nextTick(_ => {
					 this.$refs.saveTagInput.$refs.input.focus();
					});
			      },
			
			      handleInputConfirm(scope) {
					  if(scope.inputValue.trim().length === 0){
						  scope.inputValue = ''
						  scope.inputVisible = false
						  return
					  }
					  // 如果没有return则证明输入了内容需要做后续处理
					  scope.attr_vals.push(scope.inputValue.trim())
					  // console.log(scope.inputValue)
					  scope.inputValue = ''
					  scope.inputVisible = false
					  // console.log(scope)
					  // console.log(scope)
					  this.edituser(scope.cat_id,scope.attr_id,scope.attr_name,scope.attr_sel,scope.attr_vals)
			      },
				  edituser(id,attrId,attr_name,attr_sel,attr_vals){
					  attr_vals=attr_vals.join(',')
					  // console.log(id,attrId,attr_name,attr_sel,attr_vals)
					  edituser(id,attrId,attr_name,attr_sel,attr_vals).then(res=>{
						  // console.log(res)
						  if(res.meta.status !== 200){
							  return this.$message.error('添加失败')
						  }
						  // this.getparams(this.message.id,this.message.sel)
					  })
				  }
		}
	}
</script>

<style scoped="scoped" >
	.input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
	  }
</style>
