import axios from 'axios';

let base = '';

export const getGameStatistics = params => { return axios.get(`${base}/main/list`, { params: params }); };

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/userlist`, { params: params });};

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const getGameRecondList = params => { return axios.get(`${base}/gamerecond/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };