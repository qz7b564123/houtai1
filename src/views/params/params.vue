<template>
	<div class="params">
		<!-- 面包屑 -->
		<bread>
			<span slot='first'>首页</span>
			<span slot='second'>商品管理</span>
			<span slot='third'>参数列表</span>
		</bread>
		
		<el-card>
			
			<!-- 注意 -->
			<el-alert
			    title="注意!只允许为第三方分类设置相关参数"
			    type="error">
			  </el-alert>
			  
			  <!-- 选择商品分类 -->
			  <fenlei></fenlei>
			  
			  <!-- 添加参数 -->
			  <biaoqian></biaoqian>
			  <tianjia></tianjia>
			  <biaoge></biaoge>
			
		</el-card>
		
		

	</div>
</template>

<script>
	import bread from '../../components/bread/bread.vue'
	import fenlei from './children/fenlei.vue'
	import biaoqian from './children/biaoqian.vue'
	import tianjia from './children/tianjia.vue'
	import biaoge from './children/table.vue'
	export default{
		name:'params',
		components:{
			bread,
			fenlei,
			biaoqian,
			tianjia,
			biaoge
		}
	}
</script>

<style scoped="scoped">
	.el-card {
		margin-top: 30px;
	}

	.el-form {
		margin-top: 30px;
	}

	.el-tab-pane {
		margin-top: 30px;
	}
	.el-tag{
		margin: 0 5px;
	}
</style>
