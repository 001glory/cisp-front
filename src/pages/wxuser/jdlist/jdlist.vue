<template>
  <div>
    <div class="panel-start">
      <el-input
        v-for="(item,index) in searchList"
        v-model="item.value"
        :placeholder="item.label"
        @blur="searchInput(index)"
        :key="index"
        class="filter-input"
      ></el-input>
      <el-button-group>
        <el-button type="ghost" @click="clear()">清除</el-button>
        <el-button type="primary" @click="search()">搜索</el-button>
      </el-button-group>
    </div>

    <div style="margin-top:15px">
      <div class="panel-between item-center">
        <el-button-group>
          <el-button type="success" plain @click="changeUserState('available')">启用接单员</el-button>
          <el-button type="warning" plain @click="changeUserState('disable')">禁用接单员</el-button>
        </el-button-group>
        <el-select
          v-model="query.pageSize"
          placeholder="请选择"
          style="width:150px"
          @change="handleSizeChange"
        >
          <el-option
            v-for="item in pageSize"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <el-table
      :data="tableData"
      ref="multipleTable"
      tooltip-effect="dark"
      border
      size="small"
      style="width: 100%;margin-top:15px"
      @selection-change="handleSelectionChange"
      @filter-change="filterChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="55">
        <template slot-scope="scope">
          <div>{{scope.row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="80">
        <template slot-scope="scope">
          <div>
            {{scope.row.avatarUrl ? '':'未授权'}}
            <img
              v-if="scope.row.avatarUrl"
              :src="scope.row.avatarUrl"
              height="50px"
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          <div>{{scope.row.nickName ? scope.row.nickName:'未授权'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
        <template slot-scope="scope">
          <div>{{scope.row.phone ? scope.row.phone:'未注册'}}</div>
        </template>
      </el-table-column>
      <!--<el-table-column prop="dphone" label="短号">-->
        <!--<template slot-scope="scope">-->
          <!--<div>{{scope.row.dphone ? scope.row.dphone:'未填写'}}</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="信息" label="微信地址信息">
        <template slot-scope="scope">
          <div>{{scope.row.nickName ? scope.row.province + ' ' +scope.row.city:'未授权'}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="auth"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.auth == '1' ? 'success':'warning'"
          >{{scope.row.auth == '1' ? '可用':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="tempname=scope.row.nickName,tempAid = scope.row.id,seevisable2=true"
          >查看数据</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="panel-end">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="query.pageIndex"
        :page-size="query.pageSize"
        layout="total,prev, pager, next, jumper"
        :total="total"
        style="margin-top:15px"
      ></el-pagination>
    </div>
    <el-dialog :title="tempname+'的数据'" :visible.sync="seevisable2" width="920px" center>
      <wv :jdid="tempAid"></wv>
    </el-dialog>
  </div>
</template>
<script>
import wv from "../../overview/wxview.vue";
let app = require("./jdlist.js");
app.components = { wv };
export default app;
</script>
