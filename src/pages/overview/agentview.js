let that;
let G2 = require('@antv/g2');
let chart ;
let chart2 ;
let list = {
  props: {
    aid: {
      type: String,
      require: false
    }
  },
  watch: {
    aid() {
      this.getAnalysisData()
      this.sbchange()
      this.sbchange2()
    }
  },
  data() {
    return {
      sbdate: new Date(),
      sbtype: 'month',
      sbdate2: new Date(),
      sbtype2: 'month',
      totalData: [],
      newData: [],
      newData2: [],
      msg: {},
    }
  },
  mounted() {
    that = this
    chart = new G2.Chart({
      container: 'orderNode',
      forceFit: true,
      height: 500,
      padding: [100, 20, 30, 45] // 上右下左
    });
    // chart2 = new G2.Chart({
    //   container: 'mountNode',
    //   forceFit: true,
    //   height:500,
    //   padding: [100, 20, 30, 45]
    // });
    // this.pandu()
    this.getAnalysisData()
      this.sbchange()
      // this.sbchange2()
  },
  methods: {
    sbchange() {
      if (this.sbtype == 'year') {
        this.getorderStateData(this.sbdate.getFullYear())
      } else {
        let month = this.sbdate.getMonth() + 1
        let m = month < 10 ? "0" + month : month
        this.getorderStateData(this.sbdate.getFullYear() + '-' + m)
      }
    },
    getorderStateData(date) {
      let param = new URLSearchParams()
      param.append("createTime",date)
      param.append("sbtype",this.sbtype)
      this.axios.post('/api/index/get/order/state',param).then((res)=>{
        if (res.data.success) {
          that.orderNodeData(res.data.data)
        }
      })
    },
    orderNodeData(data) {
      
      chart.source(data);
      chart.tooltip({
        follow: false,
        crosshairs: 'y',
        htmlContent: function htmlContent(title, items) {
          let alias = {
            s0: '待付款',
            s1: '已付款',
            s2: '已接单',
            s3: '已完成',
            s4: '已取消'
          };
          let html = '<div class="custom-tooltip">';
          for (var i = 0; i < items.length; i++) {
            var domHead = '<div class="custom-tooltip-item" style="border-left-color:' + items[i].color + '">';
            var domName = '<div class="custom-tooltip-item-name">' + alias[items[i].name] + '</div>';
            var domValue = '<div class="custom-tooltip-item-value">' + items[i].value + '</div>';
            var domTail = '</div>';
            html += domHead + domName + domValue + domTail;
          }
          return html + '</div>';
        }
      });
      chart.axis('time', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        }
      });
      chart.axis('total', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        }
      });
      chart.legend(false);
      chart.line().position('time*total').color('state');
      chart.render();
      chart.showTooltip({
        x: 882 - 20,
        y: 100
      });
    },
    initTotalData() {
      this.totalData = [{
          label: '接单用户',
          value: this.msg.userPass || 0,
          icon: 'md-people',
          style: 'obg1',
          color: '#009933'
        },
        {
          label: '待审用户',
          value: this.msg.userWait || 0,
          icon: 'ios-book',
          style: 'obg2',
          color: '#0066CC'
        },
        {
          label: '驳回用户',
          value: this.msg.userBack || 0,
          icon: 'md-school',
          style: 'obg3',
          color: '#663399'
        },
        {
          label: '订单总数',
          value: this.msg.orderTotal,
          icon: 'ios-paper',
          style: 'obg4',
          color: '#ffffff'
        }
      ];

      this.newData = [{
          label: '营业总额(RMB)',
          value: this.msg.turnover,
          icon: 'logo-yen',
          color: '#0099CC'
        },
        {
          label: '今日营业额(RMB)',
          value: this.msg.turnoverDaily,
          icon: 'logo-yen',
          color: '#0099CC'
        },
        {
          label: '月度营业额(RMB)',
          value: this.msg.turnoverMonth,
          icon: 'logo-yen',
          color: '#0099CC'
        },
        {
          label: '年度营业额(RMB)',
          value: this.msg.turnoverYear,
          icon: 'logo-yen',
          color: '#0099CC'
        },
      ]


    },
    pandu() {
      if (global.analysis) {
        that.msg = global.analysis
        that.initTotalData()
      } else {
        this.getAnalysisData()
      }
    },
    getAnalysisData() {

      this.axios.post("/api/analysis/getData").then(res=>{
        if (res.data.success) {
          that.msg = res.data.data
          that.initTotalData()
        }
      })
    }
  },

}
module.exports = list
