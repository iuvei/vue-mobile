<template>
	<div></div>
</template>

<script>

	import { requestLogin } from '../api/api';
	export default {
		data() {
			return {
				name:'zhangsan'
			};
		},
		methods: {
			
		},
		created(){
			console.log(this)
		}
	}
</script>

<style>

</style>