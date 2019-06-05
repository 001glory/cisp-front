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
      searchList: this.yzy.initFilterSearch(['序号', '公司名称'], ['sort', 'company'])
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
    getList1(param) {
      this.page =this.query.pageIndex-1
      param.append("page",this.page)
      param.append("size",this.query.pageSize)
      this.axios.post('/api/calousels/like', param).then((res)=>{
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
      let param = new URLSearchParams()
      if (this.searchList[0].value != ''){
        param.append("sort",this.searchList[0].value)
        that.getList1(param)
      }else if (this.searchList[1].value != '') {
        param.append("company",this.searchList[1].value)
        that.getList1(param)
      }else {
       that.getList()
      }
    },
    clear() {
      this.searchList = this.yzy.initFilterSearch(['序号', '公司名称'], ['sort', 'company'])
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
