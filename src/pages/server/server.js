let that;
let list = {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      dialogVisible: false,
      jdr: [],
      dtype: sessionStorage.getItem('dtype'),
      price: ['', '', ''],
      formData: {
        jdr: '',
        dlId: '',
        serverName: '',
        dlSy: '',
        userSy: '',
        psy: '',
        isShow: 1,
        des: '',
        tags: ''
      },
      formData2: {
        jdr: '',
        dlId: '',
        serverName: '',
        dlSy: '',
        userSy: '',
        psy: '',
        isShow: 1,
        des: '',
        tags: ''
      },
      utype: [{
        label: '快递代取'
      }, {
        label: '打印服务'
      }, {
        label: '二手服务'
      }, {
        label: '上门服务'
      }, {
        label: '解忧服务 '
      }, {
        label: '其他帮助'
      }, ],
      icons: [{
        label: '快递代取',
        value:'../../img/s2.png'
      }, {
        label: '打印服务',
        value:'../../img/s3.png'
      }, {
        label: '二手服务',
        value:'../../img/s1.png'
      }, {
        label: '上门服务',
        value:'../../img/s4.png'
      }, {
        label: '解忧服务 ',
        value:'../../img/s5.png'
      }, {
        label: '其他帮助',
        value:'../../img/s6.png'
      }, ],
      loading: false
    }
  },
  mounted() {
    that = this
    if (this.$route.query.id) {
      this.getMsg()
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    getJd() {
      this.jdr = [global.tempJd.avatar_url, global.tempJd.name, global.tempJd.openid, global.tempJd.id]
    },
    getMsg() {
      let param = new URLSearchParams()
      param.append("id",this.$route.query.id,)
      this.axios.post('/api/server/get/detail/id', param).then((res)=> {
        if (res.data.success) {
          that.formData = res.data.data
          if (res.data.data.serverName == '快递代取' || res.data.data.serverName == '打印服务') {
            that.price = res.data[0].priceGui.split(',')
          }
          // that.dynamicTags = res.data[0].tags.split(',') || []
        }
      })
    },

    onSubmit() {

      if (this.formData.dlId != '' && this.formData.serverName != ''  && this.formData.pSy != '') {
        this.loading = true
        if (this.formData.serverName == '快递代取' || this.formData.serverName == '打印服务') {
          this.formData.priceGui = this.price.toString()
        } else {
          this.formData.priceGui = false
        }
        this.formData.jdr = this.jdr.toString()
        this.formData.tags = this.dynamicTags.toString()
        let param = new URLSearchParams()
        param.append("serverName",this.formData.serverName)
        param.append("dlId",this.formData.dlId)
        param.append("priceGui",this.formData.priceGui)
        param.append("userSy",this.formData.userSy)
        param.append("dlSy",this.formData.dlSy)
        param.append("pSy",this.formData.psy)
        param.append("des",this.formData.des)
        param.append("isShow",this.formData.isShow)
        param.append("jdr",this.formData.jdr)
        param.append("icon",this.formData.icon)
        param.append("tags",this.formData.tags)
        let url = 'add'
        if (this.$route.query.id) {
          url = 'update'
        }
        this.axios.post('/api/server/' + url, param).then((res)=>{
          that.loading = false
          if (res.data.success) {
            that.$message.success("添加成功！")
            if (that.$route.query.id) {
              that.$router.go(-1)
            } else {
              that.formData = that.formData2
              that.price = {
                p1: '',
                p2: '',
                p3: ''
              }
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
