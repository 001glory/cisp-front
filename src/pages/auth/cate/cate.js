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
      searchList: this.yzy.initFilterSearch(['ID', '名称'], ['id', 'cate_name'])
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
      } else{
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = new URLSearchParams()
          param.append("id",that.filterIds())
          that.axios.post('/api/cate/del', param).then((res)=> {
            if (res.data.success) {
              that.$message({
                type: 'success',
                message: "删除成功！"
              })
              that.getList()
            } else {
              that.$message({
                type: 'error',
                message: res.data.message
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
      let sq = ''
      for (let i in this.wheres) {
        if (this.wheres[i].value && this.wheres[i].value != '') {
          sq += this.wheres[i].value + ' and '
        }
      }

      let param = new URLSearchParams()
      param.append("page",this.query.pageIndex-1)
      param.append("size",this.query.pageSize)
      this.query.wheres = sq + ' is_delete=0 '
      this.axios.post('/api/cate/get', param).then((res)=>{
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
    updateState(show) {
      if (this.multipleSelection.length == 0) {
        that.$message({
          type: 'warning',
          message: '您还没有选择任何一项'
        })
      } else {
        let isShow =0;
        if (show ==="onShow"){
          isShow = 1
        } else {
          isShow = 0
        }
        let param = new URLSearchParams()
        param.append("isShow",isShow)
        param.append("id",this.filterIds().toString())
        this.axios.post('/api/cate/change/',param).then((res)=> {
          if (res.data.success) {
            that.$message({
              type: 'success',
              message: "修改成功！"
            })
            that.getList()
          } else {
            that.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      }

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
