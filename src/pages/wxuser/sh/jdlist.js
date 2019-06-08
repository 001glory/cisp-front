let that;
let list = {
  data() {
    return {
      multipleSelection: [],
      query: {
        tables: 'wxuser,userinfo',
        fields: 'wxuser.*,userinfo.name,userinfo.card_num,userinfo.card_num,userinfo.cert,userinfo.stu_card,userinfo.id s_id,userinfo.state,userinfo.msg',
        wheres: 'wxuser.id = userinfo.wx_id ',
        sorts: 'userinfo.state asc,wxuser.create_time desc',
        pageIndex: 1,
        pageSize: 10
      },
      centerDialogVisible2: false,
      tempimg: '',
      bmsg: '',
      sid: 0,
      centerDialogVisible: false,
      wheres: [],
      pageSize: this.yzy.pageSize,
      total: 0,
      tableData: [],
      searchList: this.yzy.initFilterSearch(['姓名'], ['nick_name'])
    }
  },
  mounted() {
    that = this;
    that.getList()
  },
  methods: {
    unpass() {
      if (this.bmsg == '') {
        that.$message({
          type: 'error',
          message: '请填写驳回信息'
        })
      } else {
        let param = new URLSearchParams()
        param.append("id",that.sid)
        param.append("msg",that.bmsg)
        that.axios.post('/api/wx/user/unpass', param).then((res)=>{
          that.centerDialogVisible = false
          if (res.data.success) {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            that.getList()
          }
        })
      }
    },
    pass(sid) {
      this.$confirm('确认信息无误？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = new URLSearchParams()
        param.append("id",sid)
        that.axios.post('/api/wx/user/pass', param).then((res)=> {
          if (res.data.success) {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            that.getList()
          }
        })
      }).catch(() => {

      });
    },
    getList() {
      // let sq = ''
      // for (let i in this.wheres) {
      //   if (this.wheres[i].value && this.wheres[i].value != '') {
      //     sq += this.wheres[i].value + ' and '
      //   }
      // }
      // this.query.wheres = sq + this.query.wheres
      // if(sessionStorage.getItem('dtype') == 2){
      //   this.query.wheres += ' and userinfo.a_id='+sessionStorage.getItem('a_id')
      // }
      this.axios.post('/api/wx/get/review',null).then((res)=> {
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
      this.axios.post('/api/wx/get/review1',param).then((res)=> {
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
      // this.wheres = this.yzy.filterSearch(this.searchList[index], this.wheres)
    },
    search() {
      let param = new URLSearchParams()
     if (this.searchList[0].value != '') {
        param.append("nickName",this.searchList[0].value)
        that.getList1(param)
      } else {
        that.getList()
      }
    },
    clear() {
      this.searchList=this.yzy.initFilterSearch(['姓名'], ['nick_name'])
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
