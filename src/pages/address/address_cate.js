let that;
let list = {
  data() {
    return {
      multipleSelection: [],
      query: {
        wheres: '',
        sorts: 'sort asc',
        pageIndex: 1,
        pageSize: 10
      },
      wheres: [],
      pageSize: this.yzy.pageSize,
      total: 0,
      tableData: [],
      searchList: this.yzy.initFilterSearch(['ID', '地区名', '地区类型'], ['pk_id', 'name', 'atype'])
    }
  },
  mounted() {
    that = this;
    that.getList()
  },
  methods: {
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
          that.axios.post('/api/address/cate/delete',param).then((res)=> {
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
    navTo(path, row) {
      this.$router.push({
        path: path,
        query: row
      })
    },
    getList() {
      let param = new URLSearchParams()
      param.append("aId",sessionStorage.getItem("a_id"))
      param.append("page",this.query.pageIndex-1)
      param.append("size",this.query.pageSize)
      this.axios.post('/api/address/get/cate', param).then((res)=> {
        if (res.data.success) {
          that.tableData = res.data.data.content
          that.total = res.data.data.totalElements
        } else {
          that.$message({
            type: 'error',
            message: "系统异常！"
          })
        }
      })
    },

    filterIds() {
      let arr = []
      for (let i in this.multipleSelection) {
        arr.push(this.multipleSelection[i].id)
      }
      return arr
    },
    update(url, data) {
      this.yzy.post(url, data, function (res) {
        if (res.code == 1) {
          that.$message({
            type: 'success',
            message: res.msg
          })
          that.getList()
        } else {
          that.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    searchInput(index) {
      this.wheres = this.yzy.filterSearch(this.searchList[index], this.wheres)
    },
    search() {
      that.getList()
    },
    clear() {
      for (let i in this.wheres) {
        if (this.wheres[i].label != 'user_state') {
          this.wheres[i].value = ''
        }
      }
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
