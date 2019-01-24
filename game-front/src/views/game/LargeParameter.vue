<template>
    <section>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="大额投注阈值">
                <el-col :span="11">
                    <el-input v-model="form.name" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="大额输赢阈值">
                <el-col :span="11">
                    <el-input v-model="form.name" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="大额转入阈值">
                <el-col :span="11">
                    <el-input v-model="form.name" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="大额转出阈值">
                <el-col :span="11">
                    <el-input v-model="form.name" ></el-input>
                </el-col>
            </el-form-item>
            <el-alert
                title="注意"
                type="warning"
                description="大额参数相关阈值配置后，系统将会记录所有商户下属玩家符合条件的相关数据供参考"
                show-icon
                :closable="false"
                style="margin-bottom: 15px"
                >
              </el-alert>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存 Save</el-button>
                <el-button>取消 Cancel</el-button>
            </el-form-item>
        </el-form>

    </section>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {

    },
    created() {},
    mounted() {}
}
</script>
<style scoped>
.el-form-item{margin-bottom: 15px!important;}
</style>