<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      label-width="90px"
      style="width:400px;margin:auto;margin-top:50px"
    >
      <el-form-item label="服务项">
        <el-select
          v-model="formData.serverName"
          placeholder="请选择"
          style="width:100%"
          :disabled="dtype != 1"
        >
          <el-option
            v-for="item in utype"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" v-if="formData.serverName == '快递代取'">
        <el-row :gutter="0">
          <el-col :span="8">
            <el-input v-model="price[0]" placeholder="小件价格"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="price[1]" placeholder="中件价格"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="price[2]" placeholder="大件价格"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="价格" v-if="formData.serverName == '打印服务'">
        <el-row :gutter="0">
          <el-col :span="8">
            <el-input v-model="price[0]" placeholder="黑白印"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="price[1]" placeholder="彩印"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="price[2]" placeholder="跑腿费"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="地区代码">
        <el-input v-model="formData.dlId" placeholder="地区代码" :disabled="dtype != 1 "></el-input>
      </el-form-item>
      <el-form-item label="用户收益">
        <el-input
          v-model="formData.userSy"
          type="number"
          placeholder="用户收益"
          :disabled="dtype != 1 "
        ></el-input>
      </el-form-item>
      <el-form-item label="代理收益">
        <el-input v-model="formData.dlSy" type="number" placeholder="代理收益" :disabled="dtype != 1 "></el-input>
      </el-form-item>
      <el-form-item label="平台收益">
        <el-input v-model="formData.psy" type="number" placeholder="平台收益" :disabled="dtype != 1 "></el-input>
      </el-form-item>
      <el-form-item
        label="标签"
        v-if="formData.serverName == '上门维修' || formData.serverName == '校园跑腿' || formData.serverName == '代替服务'"
      >
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增标签</el-button>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="formData.des" placeholder="描述"></el-input>
      </el-form-item>
      <!--<el-form-item label="ICON">-->
        <!--<el-input v-model="formData.icon" placeholder="ICON" :disabled="dtype != 1 "></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="ICON">
        <el-select
          v-model="formData.icon"
          placeholder="请选择"
          style="width:100%"
          :disabled="dtype != 1"
        >
          <el-option
            v-for="item in icons"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="默认接单员">
        <el-button @click="dialogVisible = true">选择接单员</el-button>
        <div class="ma-t20 panel-start item-center" v-if="jdr.length > 1">
          <img :src="jdr[0]" width="50px">
          <div class="ma-l20">{{jdr[1]}}</div>
        </div>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="formData.isShow" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保存提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="接单员信息" :visible.sync="dialogVisible" width="900px">
      <jd></jd>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getJd(),dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
<script>
import jd from "../wxuser/jdlist/jdlist.vue";
let app = require("./server.js");
app.components = { jd };
export default app;
</script>
