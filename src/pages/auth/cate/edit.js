let that;
let list = {
  data() {
    return {
      isShow: true,
      formData: {
        isShow: 1,
        cateName: '',
        sort: '',
        remarks: ''
      },
      formData2: {
        isShow: 1,
        cateName: '',
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
      // let formData = {
      //   isShow: this.is_show ? 1 : 0,
      //   cateName: this.formData.cateName,
      //   sort: this.formData.sort,
      //   remarks: this.formData.remarks
      // }
      let url = 'add'
      let params = new URLSearchParams()
      params.append("cateName",this.formData.cateName)
      params.append("isShow",this.is_show ? 1 : 0)
      params.append("sort",this.formData.sort)
      params.append("remarks",this.formData.remarks)
      if (this.$route.query.id) {
        url = 'update'
        params.append("id",this.formData.id)
        // formData.id = this.formData.id
      }
      this.axios.post('/api/cate/' + url, params).then((res)=> {
        that.loading = false
        if (res.data.success) {
          that.$message.success("提交成功！")
          if (that.$route.query.id) {
            that.$router.go(-1)
          } else {
            that.formData = that.formData2
          }

        } else {
          that.$message.error(res.data.message)
        }
      })
    }
  }
}
module.exports = list
