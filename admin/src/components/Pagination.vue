<template>
	<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 50, 100, 500]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" style="float:right;">
    </el-pagination>
 </template>

 <script>
    export default {
	    name: '',
	    components: {

	    },
	    props:[],
	    data () {
	      return {
	      	total: 0,
	      	page: 1,
	      	size:20,
	      }
	    },
	    computed: {
	      
	    },
	    methods: {
	    	handleSizeChange(val){

	    	},
	    	handleCurrentChange(val){

	    	},
	    	getList(){

	    	}
	    },
	    created() {

	    },
	    beforeDestroy(){

	    }
	}
</script>

 <style  scoped>

</style>