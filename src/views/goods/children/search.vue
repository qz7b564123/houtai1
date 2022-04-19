<template>
	<div class="search" >
		<el-input placeholder="请输入内容" v-model="search">
			<el-button slot='append' icon="el-icon-search" @click='searchclick'></el-button>
		</el-input>
		
		<el-button class="btn2" type="primary" @click='addshop'>添加商品</el-button>
		
	</div>
</template>

<script>
	export default{
		name:'search',
		data(){
			return{
				search:''
			}
		},
		methods:{
			searchclick(){
				this.$bus.$emit('searchclick',this.search)
			},
			addshop(){
				this.$router.push('/add')
			}
		}
	}
</script>

<style scoped="scoped" >
	.el-input{
		width: 400px;
	}
	.btn2{
		margin-left: 20px;
	}
</style>
