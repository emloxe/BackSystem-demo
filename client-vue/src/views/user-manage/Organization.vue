<template>
  <el-card class="box-card">
    <el-row style="margin-bottom: 10px" :gutter="0">
      <el-col :span="12">
        <el-button type="danger" plain :icon="Delete">批量删除</el-button></el-col
      >
      <el-col :span="12" style="text-align: right"
        ><el-button color="#626aef" plain @click="clearCurrent()">清除选中</el-button
        ><el-button type="primary" plain>添加</el-button></el-col
      >
    </el-row>

    <el-table
      ref="organizationTableRef"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      highlight-current-row
      border
      default-expand-all
      @current-change="handleCurrentChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column prop="name" label="名称" width="220" />
      <el-table-column prop="id" label="id" width="80" />
      <el-table-column prop="id" label="负责人" width="140" />

      <el-table-column prop="level" label="备注" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click.prevent="deleteRow(scope.$index, tableData)">
            修改
          </el-button>
          <el-button type="text" size="small" @click.prevent="deleteRow(scope.$index, tableData)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { Delete } from '@element-plus/icons-vue';

export default {
  components: [Delete],
  data() {
    return {
      tableData: [
        {
          id: 1,
          level: '2016-05-02',
          name: '信息科技有限公司',
          children: [
            {
              id: 11,
              level: '2016-05-01',
              name: '采购部',
            },
            {
              id: 12,
              level: '2016-05-01',
              name: '技术部',
              children: [
                {
                  id: 121,
                  level: '2016-05-01',
                  name: '技术部1部',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          level: '2016-05-04',
          name: '工作室',
          children: [
            {
              id: 21,
              level: '2016-05-01',
              name: '采购部',
            },
            {
              id: 22,
              level: '2016-05-01',
              name: '技术部',
              children: [
                {
                  id: 221,
                  level: '2016-05-01',
                  name: '技术部1部',
                },
              ],
            },
          ],
        },
      ],
      currentRow: null,
    };
  },

  methods: {
    clearCurrent() {
      this.$refs.organizationTableRef.setCurrentRow();
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__cell {
  padding: 2px 0;
}
</style>
