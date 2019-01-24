<template>
	<div>
		<button type="" @click="login">login</button>
	</div>
 </template>

 <script>
    export default {
	    name: '',
	    components: {

	    },
	    data () {
	      return {

	      }
	    },
	    computed: {
	      
	    },
	    methods: {
	    	login(){
	    		var user = {};
	    		sessionStorage.setItem('user', JSON.stringify(user));
	    		this.$router.toLogin({ path: '/' });
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