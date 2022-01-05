<template>
  <div class="full-wrap">
    <el-card class="left">
      <el-row style="margin-bottom: 10px" :gutter="0">
        <el-col :span="12">
          <el-button type="danger" plain :icon="Delete">批量删除</el-button></el-col
        >
        <el-col :span="12" style="text-align: right"
          ><el-button type="primary" plain>添加</el-button></el-col
        >
      </el-row>
      <el-table
        ref="roleTableRef"
        :data="roleData"
        style="width: 100%"
        row-key="id"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column fixed label="#" type="index" width="50" />

        <el-table-column fixed prop="name" label="名称" width="150" />
        <el-table-column prop="describe" label="描述" />
      </el-table>
    </el-card>
    <el-card class="right">
      <el-divider> 基础信息 </el-divider>
      <div style="height: 30px"></div>
      <el-form :label-position="right" label-width="100px" :model="form" style="max-width: 460px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 10px; text-align: right">
        <el-button type="primary">确认</el-button>
      </div>

      <el-divider> 权限列表 </el-divider>
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="{ class: customNodeClass }"
      />

      <div style="margin-bottom: 10px; text-align: right">
        <el-button type="primary">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const roleData = [
  {
    name: '超级管理员',
    describe: '',
  },
  {
    name: '管理员',
    describe: '',
  },
  {
    name: '用户',
    describe: '',
  },
];

const form = ref({});

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};

const customNodeClass = (data) => {
  if (data.isPenultimate) {
    return 'is-penultimate';
  }
  return null;
};

const treeData = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        isPenultimate: true,
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    isPenultimate: true,
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    isPenultimate: true,
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.full-wrap {
  .left {
    width: 600px;
  }
}

.left::v-deep .el-table .el-table__cell {
  padding: 2px 0;
}

// ::v-deep .el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
//   display: flex;
//   flex-direction: row;
// }

.right::v-deep .el-tree {
  padding: 10px 0 20px 60px;
}
</style>
