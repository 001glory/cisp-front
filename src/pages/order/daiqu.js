let that;
let list = {

  data() {
    return {
      jdr: [],
      tempMsg: '',
      seevisable: false,
      dialogVisible: false,
      multipleSelection: [],
      query: {
        fields: 'helplist.*,wxuser.phone,wxuser.dphone,wxuser.avatar_url,wxuser.nick_name',
        wheres: '',
        sorts: 'helplist.state asc,helplist.create_time desc',
        pageIndex: 1,
        pageSize: 10
      },
      wheres: [],
      pageSize: this.yzy.pageSize,
      total: 0,
      tableData: [],
      searchList: this.yzy.initFilterSearch(['订单编号', '手机号'], ['orderNum','phone'])
    }
  },
  mounted() {
    that = this;
    that.getList()
    that.getJDUser()
  },
  methods: {
    changeJd() {
      this.jdr = [global.tempJd.avatar_url, global.tempJd.name, global.tempJd.openid, global.tempJd.id]
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
          that.axios.post('/api/index/delete',param).then((res)=> {
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
    wcclick(id) {
      let param = new URLSearchParams()
      param.append("id",id)
      this.axios.post('/api/index/confirm', param).then((res)=>{
        if (res.data.success) {
          that.$message({
            type: 'success',
            message: '操作成功'
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
    jdclick(res) {
      if (this.jdr.length == 0) {
        that.$message({
          type: 'error',
          message: '还没有设置默认接单人'
        })
      } else {
        this.yzy.post('help/jd', {
          jd_id: this.jdr[3],
          id: res.id,
          openid: res.openid,
          form_id: res.form_id,
          title: res.title,
          order_num: res.order_num
        }, function (res) {
          if (res.code == 1) {
            that.$message({
              type: 'success',
              message: '接单成功'
            })
            that.getList()
          } else {
            that.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }

    },
    //获取接单用户信息
    getJDUser() {
      let server = global.dlserver;
      let temp = '';
      for (let i in server) {
        if (server[i].server_name == '快递代取') {
          temp = server[i].jdr
        }
      }
      if (temp != '') {
        this.jdr = temp
      }
    },
    getList() {
      let t = this.query.wheres
      let sq = ''
      for (let i in this.wheres) {
        if (this.wheres[i].value && this.wheres[i].value != '') {
          sq += this.wheres[i].value + ' and '
        }
      }
      sq += ' title = "快递代取" and state in (1,2,3,4) and helplist.is_delete=0 '
      sq += sessionStorage.getItem('a_id') ? ' and a_id=' + sessionStorage.getItem('a_id') : ''
      this.query.wheres = sq
      let param = new URLSearchParams()
      param.append("aId",sessionStorage.getItem('a_id'))
      this.axios.post('/api/index/getExpress',param).then((res)=> {
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
      param.append("aId",sessionStorage.getItem('a_id'))
      this.axios.post('/api/index/like',param).then((res)=> {
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

      if (state == 'disable') {
        this.$confirm('此操作将使用户被迫下线, 是否继续?', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.update('user/state/' + state, {
            ids: that.filterIds().toString()
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        that.update('user/state/' + state, {
          ids: that.filterIds().toString()
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
      let param = new URLSearchParams()
      if (this.searchList[0].value != ''){
        param.append("orderNum",this.searchList[0].value)
      }
      if (this.searchList[1].value != '') {
        param.append("phone",this.searchList[1].value)
      }
      that.getList1(param)
    },
    clear() {
      this.searchList=this.yzy.initFilterSearch(['订单编号', '手机号'], ['order_num','phone'])
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
