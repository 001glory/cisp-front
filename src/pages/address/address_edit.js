let that;
let list = {
  data() {
    return {
      formData: {
        cateId:'',
        subName: '',
        name: '',
        sort: '',
        aId:''
      },
      formData2: {
        cateId:'',
        subName: '',
        name: '',
        sort: '',
        aId:''
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
      if (this.formData.cateId != '' && this.formData.subName !='' && this.formData.name != '' ) {
        let param = new URLSearchParams()
        param.append("cateId",this.formData.cateId)
        param.append("subName",this.formData.subName)
        param.append("name",this.formData.name)
        param.append("sort",this.formData.sort)
        param.append("aId",sessionStorage.getItem('a_id'))
        let url = 'add'
        if (this.$route.query.id) {
          url = 'update'
          param.append("id",this.formData.id)
        }
        this.axios.post('/api/address/info/' + url, param).then((res)=> {
          that.loading = false
          if (res.data.success) {
            that.$message.success("操作成功！")
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
        that.loading = false
        that.$message.error('所有项都必填')
      }
    }
  }
}
module.exports = list
