<template>
	<div class="orders" >
		<bread>
			<span slot='first' >首页</span>
			<span slot='second' >订单管理</span>
			<span slot='third' >订单列表</span>
		</bread>
		
		<el-card>
			<!-- 搜索框 -->
			<el-input placeholder="请输入内容" class="input-with-select" >
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
			
			<shoptable></shoptable>
			
		</el-card>
		
	</div>
	
</template>

<script>
	import bread from '../../components/bread/bread.vue'
	import shoptable from './children/table.vue'
	export default{
		name:'orders',
		components:{
			bread,
			shoptable
		}
	}
</script>

<style scoped="scoped" >
	.orders{
		height: 100%;
		overflow-y:auto
	}
	.el-card{
		margin-top: 15px;
	}
	.el-input{
		width: 400px;
	}
	
</style>
