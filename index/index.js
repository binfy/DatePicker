
const dateUtils = require('../utils/dateutils.js');
const app = getApp()

Page({
  data: {
    isShowPicker: false,
    mode: "YMDhms",
    data: {},
    date: new Date().getTime(),

    yMDhms: "",
    yMD: "",
    mD: "",
    hm: "",
  },
  onLoad: function() {

  },

  showPicker: function(e) {

    this.setData({
      isShowPicker: true
    })
  },

  datePickerCancellEvent: function(e) {
    this.setData({
      isShowPicker: false
    })
    console.log(e)
  },
  datePickerOkEvent: function(e) {
    this.setData({
      isShowPicker: false
    })
    let mode = e.detail.data.type;
    let date = e.detail.date;

    switch (mode){

      case "YMDhms":
      {
        this.setData({

          yMDhms: dateUtils.formatLongTime(date, "Y-M-D h:m:s")
        })

        break;
      }
      case "YMD":
        {
          this.setData({

            yMD: dateUtils.formatLongTime(date, "Y-M-D")
          })
          break;
        }
      case "MD":
        {
          this.setData({

            mD: dateUtils.formatLongTime(date, "M-D")
          })
          break;
        }
      case "hm":
        {
          this.setData({

            hm: dateUtils.formatLongTime(date, "h:m")
          })
          break;
        }
    }


  },
  onYMDhms:function(e){

    this.setData({
      isShowPicker: true,
      mode:"YMDhms",
      data: { type: "YMDhms"}
    })
  },
  onYMD: function (e) {
    
    this.setData({
      isShowPicker: true,
      mode: "YMD",
      data: { type: "YMD" }
    })

  },
  onMD: function (e) {

    this.setData({
      isShowPicker: true,
      mode: "MD",
      data: { type: "MD" }
    })
  },
  onHm: function (e) {

    this.setData({
      isShowPicker: true,
      mode: "hm",
      data: { type: "hm" }
    })
  }
})