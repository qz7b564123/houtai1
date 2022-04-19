<template>
	<div class="dialog" >
		<el-dialog
		  :title="title"
		  :visible.sync="choice1"
		  :before-close="handleClose">
		  <span>{{title}}:<el-input
		   placeholder="请输入内容"
		   
		   ></el-input> </span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="close">取 消</el-button>
		    <el-button type="primary" @click="determine">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'dialogshow',
		props:{
			title:{
				type:String,
				default:''
			},
			content:{
				type:String,
				default:''
			},
			choice:{
				type:Boolean,
				default:false
			},
			tablemsg:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{
				choice1:false
			}
		},
		watch:{
			choice(value){
				this.choice1= value
			}
		},
		methods:{
			handleClose(done) {
			        this.$confirm('确认关闭？')
			          .then(_ => {
			            done();
			          })
			          .catch(_ => {});
			},
			close(){
				this.choice1 = false
				this.$emit('close',this.choice1)
			}
		}
	}
</script>

<style scoped="scoped" >
	.el-input{
		width: 80%
	}
</style>
