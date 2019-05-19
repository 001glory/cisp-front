let that ;
let list = {
  data(){
    return {
      formData:{
        oldPwd:'',
        newPwd:'',
        confirmPwd:''
      },
      formData2:{
        oldPwd:'',
        newPwd:'',
        confirmPwd:''
      },
      loading:false
    }
  },
  mounted(){
    that = this;

  },
  methods:{
    onSubmit(){
      this.loading = true
      if(this.formData.newPwd===this.formData.confirmPwd&&this.formData.newPwd!=""&&this.formData.oldPwd!=""){
        let param = new URLSearchParams()
        param.append("username",sessionStorage.getItem("username"))
        param.append("oldPwd",this.formData.oldPwd)
        param.append("newPwd",this.formData.newPwd)
        // let formData = {
        //   oldPwd:this.yzy.encrypt(this.formData.oldPwd),
        //   newPwd:this.yzy.encrypt(this.formData.newPwd),
        //   confirmPwd:this.yzy.encrypt(this.formData.confirmPwd),
        //
        this.axios.post('/api/user/updatePwd',param).then((res)=>{
          that.loading = false
          if(res.data.success){
            that.$message.success("密码修改成功！")
            that.formData = that.formData2

          }else{
            that.$message.error(res.data.message)
          }
        })
      }else {
        that.loading = false
        that.$message.error("两次输入不一致")
      }
    }
  }
}
module.exports = list
