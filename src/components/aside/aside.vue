<template>
	<div class="aside" >
		<el-aside>
					<el-menu
		  :default-active="path"
		  :unique-opened='true'
		  :router='true'
		  :collapse='iscollapse'
		  :class="{aaa:iscollapse}"
		  background-color="#545c64"
		  :collapse-transition='false'
		  text-color="#fff"
		  active-text-color="#ffd04b">
		  <div class="change" @click="changecallpse()" >|||</div>
		  <el-submenu :index="m.path" v-for="(m,index) in show" >
		    <template slot="title">
		      <i :class="logo[m.id]"></i>
		      <span>{{m.authName}}</span>
		    </template>
		    <el-menu-item-group v-for="(n,index) in m.children" >
		        <el-menu-item :index="n.path" @click='choice(n.path)'>
					<template slot="title">
					  <i class="el-icon-menu"></i>
					  <span>{{n.authName}}</span>
					</template>
				</el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		</el-menu>
				</el-aside>
	</div>
</template>

<script>
</script>

<style>
</style>
