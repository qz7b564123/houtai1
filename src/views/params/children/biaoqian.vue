<template>
	<div class="biaoqian" >
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="动态参数" name="first"></el-tab-pane>
		    <el-tab-pane label="静态属性" name="second"></el-tab-pane>
		  </el-tabs>
	</div>
</template>

<script>
	export default{
		name:'biaoqian',
		data(){
			return{
				activeName: 'first'
			}
		},
		methods:{
			handleClick(tab, event) {
			    // console.log(tab, event);
				if(tab.index == 0){
					this.$bus.$emit('value',tab.index)
				}
				else if(tab.index == 1){
					this.$bus.$emit('value',tab.index)
				}
			}
		}
	}
</script>

<style>
</style>
