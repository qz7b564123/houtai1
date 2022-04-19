<template>
	<div class="goods" >
		<bread>
			<span slot='first' >首页</span>
			<span slot='second' >商品管理</span>
			<span slot='third' >商品列表</span>
		</bread>
		
		<el-card>
			
			<!-- 搜索添加 -->
			<search></search>
			
			<!-- 主体内容区域 -->
			<goodstable></goodstable>
			
		</el-card>
		
	</div>
</template>

<script>
	import bread from '../../components/bread/bread.vue'
	import search from './children/search.vue'
	import goodstable from './children/table.vue'
	export default{
		name:'goods',
		components:{
			bread,
			search,
			goodstable
		}
	}
</script>

<style scoped="scoped" >
	.el-card{
		margin-top: 30px;
	}
</style>
