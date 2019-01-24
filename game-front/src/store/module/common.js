import * as types from '../mutation-types'

const state = {
	name:'zhangsan',
	isLoading:false,
	isSmallWindow:false
}

const getters = {
	getName:(state)=>{
		return state.name;
	}
}

const mutations = {
	[types.SET_NAME](state,newName){
		state.name = newName;
	},
	[types.SET_ISLOADING](state,bool){
	    state.isLoading = bool
	},
	[types.SET_ISSMALLWINDOW](state,bool){
	    state.isSmallWindow = bool
	},
}

const actions = {
	setName({commit},newName){
		commit(types.SET_NAME,newName);
	}
}

export default {
	namespaced:true,
	state,
	getters,
	mutations,
	actions
}