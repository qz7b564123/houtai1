<template>
	<div class="tianjia" >
		<el-button type="primary" :disabled="disable">添加参数</el-button>
	</div>
</template>

<script>
	export default{
		name:'tianjia',
		data(){
			return{
				disable:true
			}
		},
		mounted(){
			this.aaa()
		},
		methods:{
			aaa(){
				this.$bus.$on('disable',value=>{
					this.disable = value
				})
			}
		}
	}
</script>

<style scoped="scoped" >
</style>
