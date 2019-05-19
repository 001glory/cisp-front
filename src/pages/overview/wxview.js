let that;
let list = {
  props: {
    jdid: {
      type: Number,
      require: false
    }
  },
  watch: {
    jdid() {
      this.getAnalysisData()
    }
  },
  data() {
    return {
      totalData: [],
      msg: [],
      jdData: [],
      jdDasssta:{}
    }
  },
  mounted() {
    that = this
    this.getAnalysisData()
  },
  methods: {
    
  
    getAnalysisData() {
      let param = new URLSearchParams()
      param.append("jdId",this.jdid)
      this.axios.post('/api/index/analysis/wx', param).then((res)=> {
        if (res.data.success) {
          that.msg = res.data.data
          console.log(that.msg)
        }
      })

      let param1 = new URLSearchParams()
      param1.append("jdId",this.jdid)
      this.axios.post('/api/index/analysis/wx1', param1).then((res)=> {
        if (res.data.success) {
          that.jdData = res.data.data
        }
      })

    }
  },

}
module.exports = list
