let that;
let list = {
  props: {
    uid: {
      type: Number || String,
      require: false
    }
  },
  data() {
    return {
      msg: {
        username: '',
        user_state: 'DISABLE',
        create_time: '',
        phone: ''
      },
      list: []
    }
  },
  watch: {
    uid() {
      this.getUserInfo()
      this.getServer()
    }
  },
  mounted() {
    that = this;
    this.getUserInfo()
    this.getServer()
  },
  methods: {
    navTo(path, id) {
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      })
    },
    getUserInfo() {
      let uid = sessionStorage.getItem("uid")
      this.axios.get('/api/user/getInfo',{params:{uid}}).then((res)=>{
        if (res.data.success) {
          that.msg = res.data.data
        }
      })
    },
    getServer() {

      let param = new URLSearchParams()
      param.append("uid",sessionStorage.getItem("uid"))
      this.axios.post('/api/server/getList',param).then((res)=>{
        if(res.data.success){
          for (let i in res.data.data) {
            console.log("参数："+param)
            if(res.data.data[i].jdr!=""&&res.data.data[i].jdr!= "") {
              res.data.data[i].jdr = res.data.data[i].jdr.split(',')
            }else {
              res.data.data[i].jdr = []
            }
            that.list = res.data.data
            global.dlserver = res.data.data
          }
          console.log(that.list)
        }
      })
    }
  }
}
module.exports = list
