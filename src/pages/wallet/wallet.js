let that;
let list = {
  data() {
    return {
      msg:'',
      tableData:[],
      total:0,
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
    this.getMsg()
    this.getList()
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

      let param = new URLSearchParams()
      param.append("uid",sessionStorage.getItem("uid"))
      this.axios.post('/api/wallets/get',param).then((res)=>{
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
      if(sessionStorage.getItem("a_id")){
        this.query.wheres += ' and capital_trend.a_id='+sessionStorage.getItem("a_id")
      }
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
