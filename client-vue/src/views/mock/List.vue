<template>
  <el-card class="box-card">
    <el-row style="margin-bottom: 10px" :gutter="0">
      <el-col :span="12">
        <el-button type="danger" plain :icon="Delete">批量删除</el-button></el-col
      >
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" plain>添加</el-button>
      </el-col>
    </el-row>

    <el-table
      ref="userTableRef"
      :data="userData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      @current-change="handleCurrentChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column fixed type="index" width="50" />
      <el-table-column fixed prop="name" label="名称" width="200" />
      <el-table-column prop="city" label="路由" width="240" />

      <el-table-column prop="zip" label="备注" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button type="text" size="small" @click="handleClick">详情</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
const userData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    age: '18',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: '超级管理员',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    age: '18',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    age: '18',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: '超级管理员',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    age: '18',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
];
</script>

<style></style>
