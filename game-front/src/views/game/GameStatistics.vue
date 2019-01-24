<template>
    <el-container>
        <el-aside width="150px" style="background-color: #eee">
            <div style="width: 140px;margin: 5px 0 0 5px">
                <el-tree :data="treeData" :props="defaultProps" :default-expanded-keys="[1]" node-key="id" @node-click="handleNodeClick"></el-tree>
            </div>
        </el-aside>
        <el-main style="padding: 0 10px 10px 10px">
            <!--查询条件-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true">
                    <el-form-item label="时间区间">
                        <div class="block">
                            <el-date-picker size="small" v-model="time1" type="datetimerange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="商户名称">
                        <el-select v-model="bizhongValue" placeholder="请选择" size="small" clearable>
                            <el-option v-for="item in bizhongArr" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getTableList" size="small"> 查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" class="panel panel-default">
                <el-col :span="24" class="panel-heading">
                    游戏数据统计
                </el-col>
                <el-col :span="24" class="panel-body">
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
                </el-col>
            </el-col>
            <!--列表-->
            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 50, 100, 500]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
                </el-pagination>
            </el-col>
        </el-main>
    </el-container>
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
            time1: '',
            treeData: [{
                label: '游戏列表',
                id: '1',
                children: [{
                    label: '奔驰宝马',
                }, {
                    label: '金鲨银鲨',
                }, {
                    label: '西游争霸',
                }, {
                    label: '玛丽水果机',
                }, {
                    label: '水浒传',
                }, {
                    label: '五龙',
                }, {
                    label: '龙凤呈祥',
                }, {
                    label: '二人麻将',
                }, {
                    label: '大话骰',
                }, {
                    label: '德州扑克',
                }, {
                    label: '森林舞会',
                }, {
                    label: '百家乐',
                }, {
                    label: 'ATT连环炮',
                }, {
                    label: '龙虎斗',
                }, {
                    label: '骰宝',
                }, {
                    label: '美人鱼的礼物',
                }, {
                    label: '赛马',
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
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
    mounted() {}
}
</script>
<style scoped>
.panel-default {
    border-color: #ddd;
}

.panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.panel-default>.panel-heading {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
}

.panel-heading {
    background-color: #F5F4F9 !important;
    background-repeat: repeat-x;
    border-bottom: 1px solid #CDCDCD;
    -moz-border-radius: 6px 6px 0 0;
    -webkit-border-radius: 6px;
    border-radius: 6px 6px 0 0;
    -moz-box-shadow: 0 1px 0 #fff inset;
    -webkit-box-shadow: 0 1px 0 #fff inset;
    box-shadow: 0 1px 0 #fff inset;
    height: 36px;
    line-height: 36px;
    position: relative;
    padding: 0 10px;
}

.panel-body {
    padding: 10px;
}
</style>