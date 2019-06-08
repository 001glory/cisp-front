<template>
  <div>
    <div style="margin-top:15px">
      <div class="panel-between item-center">
        <el-button-group>
          <el-button type="danger" plain icon="el-icon-delete"  @click="del()"></el-button>
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
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="sort" label="序号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>

      <el-table-column label="状态" column-key="isShow">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isShow == 1 ? 'success':'warning'"
          >{{scope.row.isShow == 1 ? '显示':'关闭'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="navTo('/address_cate_edit',scope.row)">修改</el-button>
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
  </div>
</template>
<script>
export default require("./address_cate.js");
</script>
