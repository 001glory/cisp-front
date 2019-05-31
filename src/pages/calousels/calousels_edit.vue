<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      label-width="80px"
      style="width:400px;margin:auto;margin-top:50px"
    >
      <el-form-item label="封面">
        <el-upload
          class="upload-demo"
          name="files"
          ref="upload"
          action="http://localhost:81/cisp/upload/file"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :auto-upload="true">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传到服务器</el-button>-->
          <div slot="tip" class="el-upload__tip" v-if="zs">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="区域ID">
        <el-input v-model="formData.aId" placeholder="区域ID（必填）"></el-input>
      </el-form-item>
      <el-form-item label="广告公司">
        <el-input v-model="formData.company" placeholder="广告公司"></el-input>
      </el-form-item>
      <el-form-item label="跳转路径">
        <el-select v-model="formData.path" placeholder="请选择" style="width:100%">
          <el-option
            v-for="(item,index) in urls"
            :key="index"
            :label="item.label"
            :value="item.path"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="跳转参数">-->
        <!--<el-input v-model="formData.params" placeholder="跳转参数"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="备注">
        <el-input v-model="formData.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="序号">
        <el-input v-model="formData.sort" placeholder="序号"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="isShow"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">确认提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="centerDialogVisible" width="1100px" center>
      <gallery :clear="clear"></gallery>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseIt()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import gallery from "../file/gallery.vue";
let app = require("./calousels_edit.js");
app.components = { gallery };
export default app;
</script>
