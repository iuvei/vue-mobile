<template>
    <section>
        <!--查询条件-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" label-width="80px">
                <el-form-item label="玩家账号">
                    <el-input placeholder="玩家账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>模糊查询</el-checkbox>
                    <!-- <el-button type="primary" @click="getTableList" ><i class="el-icon-search"></i> 查询</el-button> -->
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-select v-model="statusValue" placeholder="请选择">
                        <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册时间">
                    <div class="block">
                        <el-date-picker v-model="time1" type="datetimerange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
            <el-form :inline="true" label-width="80px">
                <el-form-item label="商户账号">
                    <el-input placeholder="商户账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>模糊查询</el-checkbox>
                    <!-- <el-button type="primary" @click="getTableList" ><i class="el-icon-search"></i> 查询</el-button> -->
                </el-form-item>
                <el-form-item label="币 种">
                    <el-select v-model="bizhongValue" placeholder="请选择">
                        <el-option v-for="item in bizhongArr" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="getTableList" ><i class="el-icon-search"></i> 查询</el-button>
                </el-form-item>
            </el-form>

        </el-col>
        <!--列表-->
        <el-table :data="lists" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="account" label="玩家账号">
            </el-table-column>
            <el-table-column prop="sh" label="所属商户">
            </el-table-column>
            <el-table-column prop="sh" label="别名/昵称">
            </el-table-column>
            <el-table-column prop="bizhong" label="币种">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="endTime" label="注册时间" sortable width="170">
            </el-table-column>
            <el-table-column prop="endTime" label="最近登陆时间" sortable width="170">
            </el-table-column>
            <el-table-column prop="ip" label="最近登陆IP" sortable width="140">
            </el-table-column>
            <el-table-column prop="loginTime" label="登陆次数" sortable width="120">
            </el-table-column>
            <el-table-column prop="profitMoney" label="账户余额" sortable width="120">
            </el-table-column>
            <el-table-column prop="profitMoney" label="总有效投注额" sortable width="140">
            </el-table-column>
            <el-table-column prop="profitMoney" label="总派彩额" sortable width="120">
            </el-table-column>
            <el-table-column prop="profitMoney" label="总输赢值" sortable width="120">
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 50, 100, 500]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
import { getUserList } from '../../api/api';

export default {
    data() {
        return {
            lists: [],
            total: 0,
            page: 1,
            size: 20,
            listLoading: false,
            statusArr: [{
                    value: 0,
                    label: '启用'
                },
                {
                    value: 1,
                    label: '禁用'
                }
            ],
            statusValue: '',
            bizhongArr: [{
                    value: 0,
                    label: '人名币'
                },
                {
                    value: 1,
                    label: '美金'
                }
            ],
            bizhongValue: '',
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            time1:''
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val;
            this.getTableList();
        },
        handleSizeChange(val) {
            this.size = val;
            this.getTableList();
        },
        //获取用户列表
        getTableList() {
            let para = {
                page: this.page,
                size: this.size
            };
            this.listLoading = true;
            getUserList(para).then((res) => {
                this.total = res.data.total;
                this.lists = res.data.lists;
                this.listLoading = false;
            });
        }

    },
    created() {
        this.getTableList();
    },
    mounted() {
    }
}
</script>
<style scoped>
</style>