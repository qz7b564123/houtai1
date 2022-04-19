<template>
	<div class="bread" >
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home' }"> <slot name='first' ></slot></el-breadcrumb-item>
		  <el-breadcrumb-item> <slot name='second' ></slot> </el-breadcrumb-item>
		  <el-breadcrumb-item> <slot name="third" ></slot> </el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	export default{
		name:'bread'
	}
</script>

<style scoped="scoped" >
</style>
