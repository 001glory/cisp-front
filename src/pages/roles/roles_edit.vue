<template>
  <el-form
    ref="form"
    :model="formData"
    label-width="80px"
    style="width:400px;margin:auto;margin-top:50px"
  >
    <el-form-item label="名称">
      <el-input v-model="formData.roleName" placeholder="类目名称"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="formData.remarks" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="序号">
      <el-input v-model="formData.sort" placeholder="序号"></el-input>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="isShow"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="loading">确认提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default require("./roles_edit.js");
</script>
