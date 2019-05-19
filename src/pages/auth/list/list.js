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
      searchList: this.yzy.initFilterSearch(['ID', '名称', 'url', '类目ID'], ['id', 'auth_name', 'auth_url', 'cate_id'])
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
