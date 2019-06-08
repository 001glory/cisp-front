let that;
let list = {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        checkPwd: '',
        dtype: '',
        aid: '',
        phone: '',
        deadline: ''
      },
      formData2: {
        username: '',
        password: '',
        checkPwd: '',
        dtype: '',
        aid: '',
        phone: '',
        deadline: ''
      },
      utype: [{
        label: '管理员',
        value: 1
      }, {
        label: '校园代理',
        value: 2
      }],
      loading: false
    }
  },
  mounted() {
    that = this
  },
  methods: {
    onSubmit() {
      this.loading = true

      if (this.formData.username.length>=4 && this.formData.password ===this.formData.checkPwd){
        let param = new URLSearchParams()
        param.append("username",this.formData.username)
        // param.append("pwd",this.formData.password)
        // param.append("checkPwd",this.formData.checkPwd)
        param.append("aid",this.formData.a_id)
        param.append("dtype",this.formData.dtype)
        param.append("phone",this.formData.phone)
        param.append("deadLine",this.formData.deadline)
        // formData.password = this.yzy.encrypt(formData.password)
        // formData.checkPwd = this.yzy.encrypt(formData.checkPwd)
        this.axios.post('/api/user/register',param).then((res)=> {
          that.loading = false
          if (res.data.success) {
            that.formData = that.formData2
            that.$message.success("新增成功！")
          } else {
            that.$message.error(res.data.message)
          }
        })
      } else {
        that.loading = false
        that.$message.error("用户名至少6个字符！")
        that.formData = that.formData2
      }
    }
  }
}
module.exports = list
