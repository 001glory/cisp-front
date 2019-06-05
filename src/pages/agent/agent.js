let that;
let list = {

  data() {
    return {
      tempUid: '',
      tempAid: '',
      seevisable: false,
      seevisable2: false,
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
      searchList: this.yzy.initFilterSearch([ '用户名','手机号'], [ 'username','phone'])
    }
  },
  mounted() {
    that = this;
    that.getList()
  },
  methods: {
    getList() {
      let param = new URLSearchParams()
      param.append("uid",sessionStorage.getItem("uid"))
      this.axios.post('/api/user/get/info',param).then((res)=>{
        if (res.data.success) {

          that.tableData = res.data.data
          that.total = res.data.data.length
        } else {
          that.$message({
            type: 'error',
            message: "系统错误！"
          })
        }
      })
    },

    getList1(param) {
      param.append("uid",sessionStorage.getItem("uid"))
      this.axios.post('/api/user/get/like',param).then((res)=>{
        if (res.data.success) {

          that.tableData = res.data.data
          that.total = res.data.data.length
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
      if (sessionStorage.getItem("dtype") == 1) {
        let param = new URLSearchParams()
        param.append("pkId",that.filterIds().toString())
        if (state == 'disable') {
          this.$confirm('此操作将使用户被迫下线, 是否继续?', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.update('/api/user/update/state/' + state, param)
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          that.update('/api/user/update/state/' + state, param)
        }
      }
    },
    del() {
      if (this.multipleSelection.length == 0) {
        that.$message({
          type: 'warning',
          message: '您还没有选择任何一项'
        })
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = new URLSearchParams()
          param.append("id",this.filterIds().toString())
          that.axios.post('/api/user/delete',param).then((res)=> {
            if (res.data.success) {
              that.$message({
                type: 'success',
                message: "删除成功！"
              })
              that.getList()
            } else {
              that.$message({
                type: 'error',
                message: "系统错误！"
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    filterIds() {
      let arr = []
      for (let i in this.multipleSelection) {
        arr.push(this.multipleSelection[i].pk_id)
      }
      return arr
    },
    update(url, data) {
      this.axios.post(url, data).then((res)=>{
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
      this.wheres = this.yzy.filterSearch(this.searchList[index], this.wheres)
    },
    search() {
      let param = new URLSearchParams()
      if (this.searchList[0].value != ''){
        param.append("username",this.searchList[0].value)
        that.getList1(param)
      }else if (this.searchList[1].value != '') {
        param.append("phone",this.searchList[1].value)
        that.getList1(param)
      }else {
        that.getList()
      }
    },
    clear() {
      this.searchList = this.yzy.initFilterSearch([ '用户名','手机号'], [ 'username','phone'])
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
