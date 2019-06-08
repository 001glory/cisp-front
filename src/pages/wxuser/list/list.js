let that;
let list = {
  data() {
    return {
      dtype:0,
      multipleSelection: [],
      query: {
        wheres: '',
        sorts: 'create_time desc',
        pageIndex: 1,
        pageSize: 10
      },
      wheres: [],
      pageSize: this.yzy.pageSize,
      total: 0,
      tableData: [],
      searchList: this.yzy.initFilterSearch(['ID', '昵称', '手机号',  '性别'], ['id', 'nickName', 'phone',  'gender'])
    }
  },
  mounted() {
    that = this;
    that.getList()
  },
  methods: {
    getList() {
      let param = new URLSearchParams()
      param.append("page",this.query.pageIndex-1)
      param.append("size",this.query.pageSize)
      this.axios.post('/api/wx/user/get', param).then((res)=> {
        if (res.data.success) {

          that.tableData = res.data.data.content
          that.total = res.data.data.totalElements
        } else {
          that.$message({
            type: 'error',
            message: "系统错误！"
          })
        }
      })
    },
    getAgentList() {
      let param = new URLSearchParams()
      param.append("aId",sessionStorage.getItem("a_id"))
      param.append("page",this.query.pageIndex-1)
      param.append("size",this.query.pageSize)
      this.axios.post('/api/wx/user/agent/get', param).then((res)=> {
        if (res.data.success) {

          that.tableData = res.data.data.content
          that.total = res.data.data.totalElements
        } else {
          that.$message({
            type: 'error',
            message: "系统错误！"
          })
        }
      })
    },
    getList1(param) {
      this.axios.post('/api/wx/user/get2', param).then((res)=> {
        if (res.data.success) {

          that.tableData = res.data.data.content
          that.total = res.data.data.totalElements
        } else {
          that.$message({
            type: 'error',
            message: "系统错误！"
          })
        }
      })
    },
    filterChange(e) {
      let temp = -1
      let arr = this.wheres
      let resArr = e['user_state']

      for (let i in resArr) {
        if (resArr[i].indexOf("'") < 0) {
          resArr[i] = "'" + resArr[i] + "'"
        }
      }

      let sq = 'user_state in (' + resArr + ')'
      for (let i in arr) {
        if (arr[i].label == 'user_state') {
          temp = i
        }
      }

      if (resArr.length == 0) {
        if (temp != -1) {
          this.wheres.splice(temp, 1)
        }
      } else {
        if (temp == -1) {
          this.wheres.push({
            label: 'user_state',
            value: sq
          })
        } else {
          this.wheres[temp].value = sq
        }
      }

      this.getList()
    },
    changeUserState(state) {
      if (this.multipleSelection.length == 0) {
        that.$message({
          type: 'warning',
          message: '您还没有选择任何一项'
        })
      } else {
        let param = new URLSearchParams()
        param.append("id",that.filterIds().toString())
        if (state == 'disable') {
          this.$confirm('此操作将使用户被迫下线, 是否继续?', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            console.log(that.filterIds().toString())
            that.update("/api/wx/user/state/"+state,param)
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          that.update('/api/wx/user/state/' + state, param)
        }
      }
    },
    filterIds() {
      let arr = []
      for (let i in this.multipleSelection) {
        arr.push(this.multipleSelection[i].id)
      }
      return arr
    },
    update(url, data) {
      this.axios.post(url, data).then((res)=> {
        if (res.data.success) {
          that.$message({
            type: 'success',
            message: "操作成功！"
          })
          that.getList()
        } else {
          that.$message({
            type: 'error',
            message: "操作失败！"
          })
        }
      })
    },
    searchInput(index) {
    },
    search() {
      let param = new URLSearchParams()
      param.append("page",this.query.pageIndex-1)
      param.append("size",this.query.pageSize)
      if (this.searchList[0].value != ''){
        param.append("id",this.searchList[0].value)
        that.getList1(param)
      }else if (this.searchList[1].value != '') {
        param.append("nickName",this.searchList[1].value)
        that.getList1(param)
      }else if (this.searchList[2].value != '') {
        param.append("phone",this.searchList[2].value)
        that.getList1(param)
      }else if (this.searchList[3].value != '') {
        param.append("gender", this.searchList[3].value)
        that.getList1(param)
      } else {
        that.getList()
      }
    },
    clear() {
      this.searchList=this.yzy.initFilterSearch(['ID', '昵称', '手机号',  '性别'], ['id', 'nickName', 'phone',  'gender'])
      that.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(e) {
      this.getList()
    },
    handleCurrentChange(e) {
      this.query.pageIndex = e
      this.getList()
    },
  }
}
module.exports = list
