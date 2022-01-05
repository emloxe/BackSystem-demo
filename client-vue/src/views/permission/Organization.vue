<template>
  <div class="full-wrap">
    <el-card class="left">
      <el-table
        ref="organizationTableRef"
        :data="orgData"
        style="width: 100%"
        row-key="id"
        highlight-current-row
        border
        default-expand-all
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="roles" width="300" label="角色权限">
          <template #default="scope">
            <el-tag
              v-for="(role, index) in scope.row.roles"
              :key="scope.row.id + '-' + index"
              size="small"
              >{{ role }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="right">
      <template #header>
        <div class="card-header">
          <el-row>
            <el-col :span="20">
              <span>信息科技有限公司</span>
            </el-col>
            <el-col :span="4" style="text-align: right">
              <el-tooltip content="子部门将自动继承父部门组件" placement="top-end" effect="light">
                <el-icon><warning /></el-icon>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </template>
      <span style="font-size: 12px; color: rgb(204 204 204)">（至少选择一个角色权限）</span>
      <el-checkbox-group v-model="checkedRoles" :min="1">
        <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">{{
          role.title
        }}</el-checkbox>
      </el-checkbox-group>

      <div style="margin-top: 20px; text-align: right">
        <el-button type="primary">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Warning } from '@element-plus/icons-vue';

const orgData = [
  {
    id: 1,
    roles: ['管理员'],
    name: '信息科技有限公司',
    children: [
      {
        id: 11,
        roles: ['管理员'],
        name: '采购部',
      },
      {
        id: 12,
        roles: ['管理员'],
        name: '技术部',
        children: [
          {
            id: 121,
            roles: ['管理员', '技术员'],
            name: '技术部1部',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    roles: ['管理员'],
    name: '工作室',
    children: [
      {
        id: 21,
        roles: ['管理员'],
        name: '采购部',
      },
      {
        id: 22,
        roles: ['管理员'],
        name: '技术部',
        children: [
          {
            id: 221,
            roles: ['管理员'],
            name: '技术部1部',
          },
        ],
      },
    ],
  },
];

const checkedRoles = ref([]);
const roles = [
  { title: '超级管理员', id: '1' },
  { title: '管理员', id: '2' },
  { title: '编辑', id: '3' },
  { title: '技术员', id: '4' },
  { title: '普通用户', id: '5' },
];
</script>

<style lang="scss" scoped>
.full-wrap {
  .left {
    width: 600px;
  }
}

::v-deep .el-tag {
  margin: 0 6px;
}
</style>
