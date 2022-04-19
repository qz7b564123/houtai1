<template>
	<div class="fenlei" >
		<el-form ref="form" label-width="80px">
		  <el-form-item label="商品分类">
		    <el-cascader
		        v-model="value"
				:props="options"
		        :options="shopAll"
		        @change="handleChange"
				:clearable='true'></el-cascader>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {addCategory1} from '../../../network/category.js'
	export default{
		name:'fenlei',
		data(){
			return{
				value:[],
				options:{
					value:'cat_id',
					label:'cat_name',
					children:'children',
					expandTrigger:'hover',
				},
				shopAll:[]
			}
		},
		created(){
			this.addCategory1(3)
		},
		methods:{
			addCategory1(type){
				addCategory1(type).then(res=>{
					this.shopAll = res.data
				})
			},
			handleChange(value) {
			        // console.log(value);
					if(value.length === 3){
						this.$bus.$emit('disable',false)
						this.$bus.$emit('id',value[value.length-1])
					}
					else if(value.length === 2){
						this.$bus.$emit('disable',true)
					}
			}
		}
	}
</script>

<style scoped="scoped" >
	.fenlei{
		margin-top: 30px;
	}
</style>
