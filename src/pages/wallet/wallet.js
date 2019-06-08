let that;
let list = {
  data() {
    return {
      msg:'',
      tableData:[],
      total:0,
      dtype:0,
      query:{
        tables:'capital_trend,helplist',
        fields:'capital_trend.*,helplist.order_num,helplist.total_fee',
        sorts:'capital_trend.create_time desc',
        wheres:'capital_trend.h_id = helplist.id  ',
        pageIndex:1,
        pageSize:10,
      }
    }
  },
  mounted() {
    that = this;
    that.dtype = sessionStorage.getItem("dtype")
    if (that.dtype == 1){
      this.getMsg()
      this.getList()
    } else {
      this.getMsg1()
      this.getList1()
    }
  },
  methods: {
    handleSizeChange(e) {
      this.getList()
    },
    handleCurrentChange(e) {
      this.query.pageIndex = e
      this.getList()
    },
    getMsg(){
      this.axios.post('/api/wallets/get/admin').then((res)=>{
        if(res.data.success){
          that.msg = res.data.data
        } else {
          that.$message({
            type: 'error',
            message: "系统错误！"
          })
        }
      })
    },
    getMsg1(){
      let param = new URLSearchParams()
      param.append("uid",sessionStorage.getItem("uid"))
      param.append("aId",sessionStorage.getItem("a_id"))
      this.axios.post('/api/wallets/get/agent',param).then((res)=>{
        if(res.data.success){
          that.msg = res.data.data
        } else {
          that.$message({
            type: 'error',
            message: "系统错误！"
          })
        }
      })
    },
    getList(){
      this.axios.post('/api/wallets/get2/admin').then((res)=> {
        if(res.data.success){
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
    getList1(){
      let params = new URLSearchParams()
      params.append("aId",sessionStorage.getItem("a_id"))
      this.axios.post('/api/wallets/get2',params).then((res)=> {
        if(res.data.success){
          that.tableData = res.data.data
          that.total = res.data.data.length
        } else {
          that.$message({
            type: 'error',
            message: "系统错误！"
          })
        }
      })
    }
  }
}
module.exports = list
