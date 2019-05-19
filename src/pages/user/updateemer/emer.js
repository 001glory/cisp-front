let that ;
let list = {
  data(){
    return {
      formData:{
        emerTitle:'',
        emerContent:'',
        openEmer:0
      },
      isShow:false,
      loading:false
    }
  },
  mounted(){
    that = this;
    that.getMsg();
  },
  methods:{
    getMsg(){
      let param = new URLSearchParams()
      param.append("uid",sessionStorage.getItem("uid"))
      this.axios.post('/api/user/getEmer',param).then((res)=>{
        if(res.data.success){
          that.formData = res.data.data
          that.isShow = res.data.data.openEmer ==1 ? true:false
        }else{
          that.$message.error(res.data.message)
        }
      })
    },
    // getMsg(){
    //     this.yzy.post('user/get/emer',{},function(res){
    //         if(res.code == 1){
    //             that.formData = res.data
    //             that.is_show = res.data.open_emer ==1 ? true:false
    //         }else{
    //             that.$message.error(res.msg)
    //         }
    //     })
    // },
    onSubmit(){
      this.loading = true;
      let params = new URLSearchParams()
      this.formData.openEmer = this.isShow  ? 1:0
      params.append("uid",sessionStorage.getItem("uid"))
      params.append("openEmer",this.formData.openEmer)
      params.append("emerTitle",this.formData.emerTitle)
      params.append("emerContent",this.formData.emerContent)
      // let formData = this.formData;
      // formData.openEmer = this.isShow  ? 1:0
      this.axios.post('/api/user/updateEmer',params).then((res)=>{
        that.loading = false
        if(res.data.success){
          that.$message.success("提交成功！")
          // that.formData = that.formData2
        }else{
          that.$message.error(res.data.message)
        }
      })
    }
  }
}
module.exports = list
