<template>
    <section>
        <!--查询条件-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item label="商户账号">
                    <el-input placeholder="商户账号" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>模糊查询</el-checkbox>
                </el-form-item>
                <el-form-item label="游戏局号">
                    <el-input placeholder="游戏局号" size="small"></el-input>
                </el-form-item>
                <el-form-item label="注单区间">
                    <div class="block">
                        <el-date-picker size="small" v-model="time1" type="datetimerange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
            <el-form :inline="true">
                <el-form-item label="玩家账号">
                    <el-input placeholder="玩家账号" size="small" v-model="searchForm.accountNo"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>模糊查询</el-checkbox>
                </el-form-item>
                <el-form-item label="注单号">
                    <el-input placeholder="注单号" size="small"></el-input>
                </el-form-item>
                <el-form-item label="盈利区间">
                    <el-input placeholder="请输入金额" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="-" label-width="15px">
                </el-form-item>
                <el-form-item label="" label-width="0px" style="text-align: left;">
                    <el-input placeholder="请输入金额" size="small" type="number"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true">
                <el-form-item label="游戏设备">
                    <el-select v-model="statusValue" placeholder="请选择" size="small" clearable="true">
                        <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="游戏类型">
                    <el-select v-model="statusValue" placeholder="请选择" size="small" clearable="true">
                        <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="游戏名称">
                    <el-select v-model="statusValue" placeholder="请选择" size="small" clearable="true">
                        <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTableList" size="small"><i class="el-icon-search"></i> 查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTableList" size="small"><i class="el-icon-download"></i> 下载</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="lists" v-loading="listLoading" border size="mini">
            <el-table-column prop="account" label="玩家账号" align="center" min-width="60">
            </el-table-column>
            <el-table-column prop="sh" label="所属商户" align="center" min-width="60">
            </el-table-column>
            <el-table-column prop="gameOddNo" label="游戏注单号" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="ip" label="下注IP" align="center" min-width="92">
            </el-table-column>
            <el-table-column label="局号" align="center" min-width="100">
                <template slot-scope="scope">
                    <el-button @click="showGameInfo(scope.row)" type="text" size="small">{{scope.row.gNo}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" align="center" min-width="113">
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center" min-width="60">
            </el-table-column>
            <el-table-column prop="gameName" label="游戏名称" align="center" min-width="60">
            </el-table-column>
            <el-table-column prop="oddMoney" label="注单金额" align="center" min-width="50">
            </el-table-column>
            <el-table-column prop="profitMoney" label="盈利金额" align="center" min-width="80">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="Number(scope.row.profitMoney) > 0">+{{scope.row.profitMoney}}</el-tag>
                    <el-tag type="success" v-if="Number(scope.row.profitMoney) <= 0">{{scope.row.profitMoney}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="equipment" label="游戏设备" align="center" min-width="50">
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 50, 100, 500]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--游戏详情界面-->
        <el-dialog title="游戏详情" :visible.sync="editFormVisible" width="650px">
            <el-row>
                <el-col :span="8"><span class="info-label">游戏名称:</span><span class="info-value">{{editForm.gameName}}</span></el-col>
                <el-col :span="8"><span class="info-label">游戏局号:</span><span class="info-value">{{editForm.gNo}}</span></el-col>
                <el-col :span="8"><span class="info-label">结束时间:</span><span class="info-value">{{editForm.endTime}}</span></el-col>
            </el-row>
            <el-row style="margin: 10px 0">
                <el-col :span="8"><span class="info-label">玩家账号:</span><span class="info-value">{{editForm.account}}</span></el-col>
                <el-col :span="8">
                    <span class="info-label">玩家盈亏:</span>
                    <span class="info-value">
                        <el-tag type="danger" v-if="Number(editForm.profitMoney) > 0">+{{editForm.profitMoney}}</el-tag>
                        <el-tag type="success" v-if="Number(editForm.profitMoney) <= 0">{{editForm.profitMoney}}</el-tag>
                   </span>
                </el-col>
                <el-col :span="8"><span class="info-label">游戏设备:</span><span class="info-value">{{editForm.equipment}}</span></el-col>
            </el-row>
            <div class="line"></div>
            <div style="margin: 5px 0;">游戏局结果截图</div>
            <img src="../../assets/img/global/u1959.png" alt="" width="100%">
        </el-dialog>
    </section>
</template>
<script>
import util from '../../common/js/util'
import { getGameRecondList } from '../../api/api';

export default {
    data() {
        return {
            lists: [],
            total: 0,
            page: 1,
            size: 20,
            listLoading: false,
            time1: '',
            editFormVisible: false,
            editForm: {},
            searchForm: {
                accountNo: this.$route.query.accountNo,
            }

        }
    },
    watch: {
        $route(to, from) {
            this.searchForm.accountNo = this.$route.query.accountNo;
            this.getTableList();
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
        getTableList() {
            let para = {
                page: this.page,
                size: this.size
            };
            this.listLoading = true;
            getGameRecondList(para).then((res) => {
                this.total = res.data.total;
                this.lists = res.data.lists;
                this.listLoading = false;
            });
        },
        showGameInfo(data) {
            console.log(data)
            this.editFormVisible = true;
            this.editForm = Object.assign({}, data);
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
.info-label {
    font-weight: bold;
    width: 80px;
    text-align: right;
    margin-right: 10px;
}

.info-value {
    color: #909399;
}

.line {
    height: 1px;
    background-color: #ddd
}
</style>