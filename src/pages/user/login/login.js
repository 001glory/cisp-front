let that;
let login = {
  data() {
    return {
      systemName: this.yzy.systemName,
      loading: false,
      formData: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
    that = this
  },
  methods: {
    submitForm() {
      if (this.formData.username == '') {
        this.$message({
          type: 'error',
          message: '请输入账号'
        })
      } else if (this.formData.password == '') {
        this.$message({
          type: 'error',
          message: '请输入密码'
        })
      } else {
        // that.$router.push({
        //   path: '/'
        // })
        let param = new URLSearchParams()
        param.append('username', this.formData.username)
        param.append('pwd', this.formData.password)
        this.loading = true
        // this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        this.axios.post(
          '/api/user/login',
          param).then((res)=>{
            if(res.data.success){
              this.$message({
                type:'success',
                message:'登陆成功！'
              })
              // console.log(res.data.data)
              sessionStorage.setItem('uid', res.data.data.pkId)
              global.uid = res.data.data.pkId
              sessionStorage.setItem('userInfo', res.data.data)
              // console.log("给我打印用户信息："+res.data.data.username)
              sessionStorage.setItem('username', res.data.data.username)
              global.pwd = this.formData.password
              sessionStorage.setItem('dtype', res.data.data.dtype)
              sessionStorage.setItem('a_id', res.data.data.aid)
              this.$router.push({
                path: '/'
              })
            }else if(res.data.errorCode===1003){
              sessionStorage.removeItem('uid')
              sessionStorage.removeItem('userInfo')
              sessionStorage.removeItem('username')
              sessionStorage.removeItem('pwd')
              sessionStorage.removeItem('dtype')
              sessionStorage.removeItem('a_id')
              this.$message({
                type:'error',
                message:res.data.message
              })
              this.$router.push({
                path: '/login'
              })
            }else {
              sessionStorage.removeItem('uid')
              sessionStorage.removeItem('userInfo')
              sessionStorage.removeItem('username')
              sessionStorage.removeItem('pwd')
              sessionStorage.removeItem('dtype')
              sessionStorage.removeItem('a_id')
              this.$message({
                type:'error',
                message:'服务器繁忙，请稍后再试！'
              })
              this.$router.push({
                path: '/login'
              })
            }
        })
      }
    }
  }
}
export default login
