let that;
let list = {
  data() {
    return {
      isShow: true,
      formData: {
        state: 0,
        roleName: '',
        sort: '',
        remarks: ''
      },
      formData2: {
        state: 0,
        roleName: '',
        sort: '',
        remarks: ''
      },
      loading: false
    }
  },
  mounted() {
    that = this;
    if (this.$route.query.id) {
      this.formData = this.$route.query
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      if (this.formData.roleName !='' && this.formData.sort != '' && this.formData.remarks != '') {
        let state = this.isShow ? 0 : 1
        let param = new URLSearchParams()
        param.append("state",state)
        param.append("roleName",this.formData.roleName)
        param.append("sort",this.formData.sort)
        param.append("remarks",this.formData.remarks)
        let url = 'add'
        if (this.$route.query.id) {
          url = 'update'
          // formData.id = this.formData.id
          param.append("id",this.formData.id)
        }
        this.axios.post('/api/role/' + url, param).then((res)=>{
          that.loading = false
          if (res.data.success) {
            that.$message.success("提交成功!")
            if (that.$route.query.id) {
              that.$router.go(-1)
            } else {
              that.formData = that.formData2
            }

          } else {
            that.$message.error(res.data.message)
          }
        })
      } else {
        that.$message.error('所有项都必填')
        that.loading = false
      }
    }
  }
}
module.exports = list
