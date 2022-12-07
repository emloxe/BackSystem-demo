<template>
  <el-card class="box-card">
    <div class="form-center">
      <el-form ref="formRef" :model="form" label-width="120px">
        <el-form-item label="路径">
          <el-input v-model="form.path" placeholder="/ test">
            <template #prepend>/ mock</template>
          </el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder=""> </el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.desc" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="代码">
          <MonacoEditor
            height="300"
            language="json"
            :code="monaco.code"
            :key="monaco.randomkey"
            :editorOptions="monaco.options"
            @mounted="onMounted"
            @codeChange="onCodeChange"
          >
          </MonacoEditor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue';
import MonacoEditor from 'vue-monaco-editor';

// do not use same name with ref
const form = reactive({
  name: '',
  path: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const monaco = reactive({
  code: '{}',
  randomkey: '123',
});

let editor = '';

const onMounted = (editor1) => {
  editor = editor1;
};

const onCodeChange = () => {
  console.log(editor.getValue());
};

const onSubmit = () => {
  console.log('submit!');
};
</script>

<style></style>
