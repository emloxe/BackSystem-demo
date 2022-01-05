<template>
  <el-card class="box-card">
    <el-row style="margin-bottom: 10px" :gutter="0">
      <el-col :span="12">
        <el-button type="danger" plain :icon="Delete">批量删除</el-button></el-col
      >
      <el-col :span="12" style="text-align: right"
        ><el-button type="primary" plain>添加</el-button></el-col
      >
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
      <el-table-column fixed prop="name" label="姓名" width="100" />
      <el-table-column prop="city" label="部门" width="140" />
      <el-table-column prop="city" label="职务" width="120" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="date" label="联系方式" width="150" />
      <el-table-column prop="date" label="邮箱" width="150" />

      <el-table-column prop="address" label="权限角色" width="120">
        <template #default="scope">
          <el-tag size="small" :type="scope.row.tag === '超级管理员' ? 'danger' : 'success'">{{
            scope.row.tag
          }}</el-tag>
        </template>
      </el-table-column>
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
