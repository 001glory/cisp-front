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

      // let formData = {
      //   username: this.formData.username,
      //   password: this.yzy.encrypt(this.formData.password),
      //   checkPwd: this.yzy.encrypt(this.formData.checkPwd),
      //   a_id: this.formData.a_id,
      //   dtype: this.formData.dtype,
      //   phone: this.formData.phone,
      //   deadline: this.formData.deadline
      // }
      if (this.formData.password.length>=8 && this.formData.password ===this.formData.checkPwd){
        let param = new URLSearchParams()
        param.append("username",this.formData.username)
        param.append("pwd",this.formData.password)
        param.append("checkPwd",this.formData.checkPwd)
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
        that.$message.error("密码不够8位或两次密码不相符！")
        that.formData = that.formData2
      }
    }
  }
}
module.exports = list
