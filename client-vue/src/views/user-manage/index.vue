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
        <el-table-column prop="leader" width="100" label="负责人" />
      </el-table>
    </el-card>
    <el-card class="right">
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
        <el-table-column fixed label="#" type="index" width="50" />
        <el-table-column fixed prop="name" label="姓名" width="100" />
        <el-table-column prop="city" label="部门" width="140" />
        <el-table-column prop="city" label="职务" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="date" label="联系方式" width="150" />
        <el-table-column prop="date" label="邮箱" width="150" />

        <el-table-column prop="address" label="权限角色" width="120">
          <template #default="scope">
            <el-tag size="small" :type="scope.row.tag === '自定义' ? 'danger' : 'success'">{{
              scope.row.tag
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="备注" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button type="text" size="small" @click="handleClick">详情</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" color="#f56c6c" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="left-page"
        v-model:currentPage="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const orgData = [
  {
    id: 1,
    leader: '张三',
    name: '信息科技有限公司',
    children: [
      {
        id: 11,
        leader: '李四',
        name: '采购部',
      },
      {
        id: 12,
        leader: '李四',
        name: '技术部',
        children: [
          {
            id: 121,
            leader: '李四',
            name: '技术部1部',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    leader: '张三',
    name: '工作室',
    children: [
      {
        id: 21,
        leader: '李四',
        name: '采购部',
      },
      {
        id: 22,
        leader: '李四',
        name: '技术部',
        children: [
          {
            id: 221,
            leader: '李四',
            name: '技术部1部',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    leader: '',
    name: '未分类',
  },
];

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
    tag: '自定义',
  },
  {
    date: '张三',
    name: 'Tom',
    age: '18',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: '超级管理员',
  },
  {
    date: '李四',
    name: 'Tom',
    age: '18',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: '自定义',
  },
];

const currentPage4 = ref(4);

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
</script>

<style lang="scss" scoped>
.full-wrap {
  display: flex;
  margin: 15px;
  .left {
    width: 400px;
    margin-right: 15px;
  }
  .right {
    flex: 1;
  }
}
</style>
