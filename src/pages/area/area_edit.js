let that;
let list = {
  data() {
    return {
      formData: {
        atype: 2,
        name: '',
        sort: ''
      },
      formData2: {
        atype: 2,
        name: '',
        sort: ''
      },
      loading: false
    }
  },
  mounted() {
    that = this;
    if (this.$route.query.pkId) {
      this.formData = this.$route.query
    }
  },
  methods: {
    onSubmit() {
      this.loading = true

      if (this.formData.atype != ''&& this.formData.name !=''&&this.formData.sort !='') {
        let param = new URLSearchParams()
        param.append("atype",this.formData.atype)
        param.append("name",this.formData.name)
        param.append("sort",this.formData.sort)
        let url = 'add'
        if (this.$route.query.pkId) {
          url = 'update'
          // formData.pkId = this.formData.pkId
          param.append("pkId",this.$route.query.pkId)
        }
        this.axios.post('/api/area/' + url, param).then((res)=> {
          that.loading = false
          if (res.data.success) {
            that.$message.success("提交成功！")
            if (that.$route.query.pkId) {
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
