let that;
let list = {
  data() {
    return {
      multipleSelection: [],
      query: {
        wheres: '',
        sorts: 'create_time asc',
        pageIndex: 1,
        pageSize: 10
      },
      wheres: [],
      pageSize: this.yzy.pageSize,
      total: 0,
      tableData: [],
      searchList: this.yzy.initFilterSearch(['名称'], ['auth_name'])
    }
  },
  mounted() {
    that = this;
    that.getList()
  },
  methods: {
    del() {
      if(this.multipleSelection.length ==0){
        that.$message({
          type: 'warning',
          message: '您还没有选择任何一项'
        })
      } else {
        let param = new URLSearchParams()
        param.append("id",that.filterIds())
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.axios.post('/api/auth/del', param).then((res)=>{
            if (res.data.success) {
              that.$message({
                type: 'success',
                message: "删除成功"
              })
              that.getList()
            } else {
              that.$message({
                type: 'error',
                message: "服务器错误，请稍后再试！"
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
      param.append("page",this.query.pageIndex-1)
      param.append("size",this.query.pageSize)
      this.axios.post('/api/auth/getList', param).then((res)=> {
        if (res.data.success) {
          that.tableData = res.data.data.content
          that.total = res.data.data.totalElements
        } else {
          that.$message({
            type: 'error',
            message: "服务器异常，请稍后再试！"
          })
        }
      })
    },
    getList1(param) {
      param.append("page",this.query.pageIndex-1)
      param.append("size",this.query.pageSize)
      this.axios.post('/api/auth/like', param).then((res)=> {
        if (res.data.success) {
          that.tableData = res.data.data.content
          that.total = res.data.data.totalElements
        } else {
          that.$message({
            type: 'error',
            message: "服务器异常，请稍后再试！"
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

    searchInput(index) {
      this.wheres = this.yzy.filterSearch(this.searchList[index], this.wheres)
    },
    search() {
      let param = new URLSearchParams()
      if (this.searchList[0].value != ''){
        param.append("authName",this.searchList[0].value)
        that.getList1(param)
      } else {
        that.getList()
      }
    },
    clear() {
      this.searchList = this.yzy.initFilterSearch(['名称'], ['auth_name'])
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
