let that;
let list = {
  data() {
    return {
      centerDialogVisible: false,
      isShow: false,
      zs: false,
      // api: this.yzy.NODE_API,
      file:'',
      fileUrl:'',
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // },
        // {
        //   name: 'food2.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
        ],
      urls: [{
        label: '文章详情页',
        path: '/pages/richtext/richtext'
      },{
          label: '关于我们',
          path: '/pages/mine/about/about'
        },
        {
          label: '提现',
          path: '/pages/mine/cash/cash'
        },
        {
          label: '选择学校页',
          path: '/pages/area/area'
        },
        {
          label: '申请接单页',
          path: '/pages/register/register'
        },
        {
          label: '我的信息页',
          path: '/pages/mine/info/info'
        },
        {
          label: '我的地址页',
          path: '/pages/mine/address/address'
        },
        {
          label: '订单详情页',
          path: '/pages/order/detail/detail'
        },
        {
          label: '打印服务页',
          path: '/pages/dayin/dayin?index=0'
        },
        {
          label: '快递代取',
          path: '/pages/daiqu/daiqu?index=1'
        },
        // {
        //   label: '快递代取',
        //   path: '/pages/daiqu/daiqu?index=1'
        // },
        {
          label: '校园跑腿',
          path: '/pages/other/other?label=校园跑腿&index=2'
        },
        {
          label: '上门维修',
          path: '/pages/other/other?label=上门维修&index=3'
        },
        {
          label: '代替服务',
          path: '/pages/other/other?label=代替服务&index=4'
        },
        {
          label: '其他帮助',
          path: '/pages/other/other?label=其他帮助&index=5'
        },

      ],
      formData: {
        isShow: 0,
        cover: '',
        sort: '',
        adminId: '',
        remark: '',
        path: '',
        company: '',
        endTime: '',
        // params: '',
        aId:''
      },
      clear: false,
      formData2: {
        is_show: 0,
        cover: '',
        sort: '',
        admin_id: '',
        remark: '',
        path: '',
        company: '',
        end_time: '',
        a_id:''
      },
      loading: false
    }
  },
  mounted() {
    that = this;
    if (this.$route.query.id) {
      this.formData = this.$route.query
      this.isShow = this.$route.query.isShow == 1 ? true:false
    }
  },
  methods: {
    chooseIt() {
      this.formData.cover = global.cimgs[0].fileUrl;
      this.clear = !this.clear;
      // this.centerDialogVisible = false;
    },
    handleSuccess(res,files,fileList){
      if (files.response.data != '') {
        let params = new URLSearchParams()
        this.fileUrl = files.response.data
        params.append("fileUrl",this.fileUrl)
        params.append("adminId",sessionStorage.getItem("uid"))
        params.append("fileName",files.name)
        params.append("fileSize",files.size)
        params.append("mimetype",files.raw.type)
        this.axios.post("/api/file/upload",params).then((response)=>{

          if (response.data.success) {
            that.$message.success("上传成功！")
          } else {
            that.zs = true;
          }
        }).catch((error)=>{
          console.log("sdsd")
        })
      } else {
        that.$message.error('文件没有上传！')
      }

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSubmit() {
      this.loading = true
      let formData = this.formData
      this.formData.adminId = sessionStorage.getItem("uid")
      formData.isShow = this.isShow ? 1 : 0
      if (this.formData.params) {
        formData.path += '?' + formData.params
      }
      if (this.formData.path != ''&& this.formData.company != '' && this.formData.remark != '' && this.formData.aId != '' && this.formData.sort !=''){
        let url = 'add'
        let param = new URLSearchParams()
        param.append("cover",this.fileUrl)
        param.append("adminId",sessionStorage.getItem("uid"))
        param.append("isShow",this.formData.isShow)
        param.append("path",this.formData.path)
        param.append("company",this.formData.company)
        param.append("remark",this.formData.remark)
        param.append("aId",this.formData.aId)
        param.append("sort",this.formData.sort)
        if (this.$route.query.id) {
          url = 'update'
          formData.id = this.formData.id
        }
        this.axios.post('/api/calousels/' + url, param).then((res)=>{
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
      } else {
        that.$message.error('所有项都必填')
        that.loading = false
      }
    }

  }
}
module.exports = list
