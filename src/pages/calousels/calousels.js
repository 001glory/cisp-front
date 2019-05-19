let that;
let list = {
  data() {
    return {
      multipleSelection: [],
      query: {
        wheres: '',
        sorts: 'sort asc,create_time desc',
        pageIndex: 1,
        pageSize: 10
      },
      wheres: [],
      pageSize: this.yzy.pageSize,
      page:0,
      total: 0,
      tableData: [],
      searchList: this.yzy.initFilterSearch(['ID', '公司名称','区域ID'], ['id', 'company','aid'])
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
          that.axios.post('/api/calousels/delete',param).then((res)=> {
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
      let sq = ''
      for (let i in this.wheres) {
        if (this.wheres[i].value && this.wheres[i].value != '') {
          sq += this.wheres[i].value + ' and '
        }
      }

      // this.query.wheres = sq + ' is_delete=0 '
      let param = new URLSearchParams()
      this.page =this.query.pageIndex-1
      param.append("page",this.page)
      param.append("size",this.query.pageSize)
      this.axios.post('/api/calousels/getAll', param).then((res)=>{
        if (res.data.success) {
          that.tableData = res.data.data.content
          that.total = res.data.data.totalElements
        } else {
          that.$message({
            type: 'error',
            message: res.data.message
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

        let param = new URLSearchParams()
        param.append("id",this.filterIds().toString())
        param.append("show",show)
        this.axios.post('/api/calousels/updateShow', param).then((res)=> {
          if (res.data.success) {
            that.$message({
              type: 'success',
              message: "修改成功！"
            })
            that.getList()
          } else {
            that.$message({
              type: 'error',
              message: "系统错误！"
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
