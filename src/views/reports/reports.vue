<template>
	<div class="report" >
		<bread>
			<span slot='first' >首页</span>
			<span slot='second' >数据统计</span>
			<span slot='third' >数据列表</span>
		</bread>
		
		<el-card>
			
			<div id="main" style="width: 750px;height:400px;"></div>
			
		</el-card>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	import _ from 'lodash'
	import {getreports} from '../../network/reports.js'
	import bread from '../../components/bread/bread.vue'
	export default{
		name:'report',
		components:{
			bread
		},
		data(){
			return{
				// 需要合并的数据
				options: {
				        title: {
				          text: '用户来源'
				        },
				        tooltip: {
				          trigger: 'axis',
				          axisPointer: {
				            type: 'cross',
				            label: {
				              backgroundColor: '#E9EEF3'
				            }
				          }
				        },
				        grid: {
				          left: '3%',
				          right: '4%',
				          bottom: '3%',
				          containLabel: true
				        },
				        xAxis: [
				          {
				            boundaryGap: false
				          }
				        ],
				        yAxis: [
				          {
				            type: 'value'
				          }
				        ]
				      },
				option:{},
			}
		},
		created(){
			this.getreports()
		},
		mounted() {
			 var myChart = echarts.init(document.getElementById('main'))
			 setTimeout(()=>{
				 const result = _.merge(this.option,this.options)
				 myChart.setOption(result)
			 },1000)
		},
		methods:{
			getreports(){
				getreports().then(res=>{
					console.log(res)
					if(res.meta.status !== 200){
						return this.$message.error('获取数据报表失败')
					}
					this.option = res.data
				})
			}
		},
	}
</script>

<style scoped="scoped" >
	.el-card{
		margin-top: 15px;
	}
</style>
