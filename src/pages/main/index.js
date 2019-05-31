const nav = require('./../../assets/js/nav')

let that;
let main = {
  data() {
    return {
      innerHeight: window.innerHeight,
      systemName: this.yzy.systemName,
      topNav: [],
      nav: [],
      defaultMeun: '',
      defaultActive: '',
      linkName: '',
      dtype: -1,
      username: sessionStorage.getItem('username')
    }
  },
  watch: {
    $route() {
      this.linkName = this.$route.name
    },

  },
  mounted() {
    document.title = this.yzy.systemName;
    that = this
    this.onResize()
    this.initUser()
    this.getServer()
  },
  methods: {
    getServer() {
      // this.yzy.post('server/get/uid', {
      //   uid: sessionStorage.getItem('uid')
      // }, function (res) {
      //   if (res.code == 1) {
      //     for (let i in res.data) {
      //       if (res.data[i].jdr != '' && res.data[i].jdr != null) {
      //         res.data[i].jdr = res.data[i].jdr.split(',')
      //       } else {
      //         res.data[i].jdr = []
      //       }
      //     }
      //     that.list = res.data
      //     global.dlserver = res.data
      //   }
      // })
      let param = new URLSearchParams()
      param.append("uid",sessionStorage.getItem("uid"))
      if(sessionStorage.getItem("uid") != null){
        console.log("成功！")
        this.axios.post('/api/server/getList',param).then((res)=>{
          if(res.data.success){
            for (let i in res.data.data) {
              // console.log("参数："+param)
              if(res.data.data[i].jdr!=""&&res.data.data[i].jdr!= null) {
                res.data.data[i].jdr = res.data.data[i].jdr.split(',')
              }else {
                res.data.data[i].jdr = []
              }
              that.list = res.data.data
              global.dlserver = res.data.data
            }
          }
        })
      }
    },
    //监听窗口变化
    onResize() {
      window.onresize = function () {
        that.innerHeight = window.innerHeight
      }
    },
    navTo(path) {
      this.$router.push({
        path: path
      })
    },
    //初始化用户
    initUser() {
      // console.log("用户名"+sessionStorage.getItem('username'))
      // console.log(sessionStorage.getItem('username')!=null)
      if (sessionStorage.getItem('username')!=null) {
        this.initNav()
        this.dtype = sessionStorage.getItem('dtype')
        // console.log(this.dtype)
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    //初始化导航
    initNav() {
      this.topNav = nav.topNav
      this.dtype = 1
      // console.log(this.topNav)
      this.defaultMeun = this.topNav[0].path
      if (sessionStorage.getItem('dtype') == 2) {
        this.nav = nav.daili1
      } else {
        this.nav = nav.item1
      }

      this.defaultActive = this.nav[0].sub[0].path
      this.$router.push({
        path: this.nav[0].sub[0].path
      })
    },

    selectTopNav(e) {
      this.nav = nav[e]
      this.defaultActive = this.nav[0].sub[0].path
      this.$router.push({
        path: this.nav[0].sub[0].path
      })
    },

    logout() {
      sessionStorage.removeItem('uid')
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('pwd')
      sessionStorage.removeItem('dtype')
      this.$router.push({
        path: '/login'
      })
    },
    navSelect(e) {
      this.$router.push({
        path: e
      })
    }
  }

}
module.exports = main
