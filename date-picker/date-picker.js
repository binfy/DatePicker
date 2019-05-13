// DatePicker/DatePicker.js
const dateUtil = require('../utils/dateutils.js')

const years = []
const months = []
const days = []
const hours = []
const minutes = []
const seconds = []

for (let i = 1970; i <= 2100; i++) {

  years.push(i);
}

for (let i = 1; i <= 12; i++) {

  months.push(i);
}

for (let i = 1; i <= 31; i++) {

  days.push(i);
}
for (let i = 0; i < 24; i++) {

  hours.push(i);
}

for (let i = 0; i < 60; i++) {

  minutes.push(i);
}
for (let i = 0; i < 60; i++) {

  seconds.push(i);
}
const modes = ["YMDhms", "YMD", "MD", "hm"]

let beforeYear;
let beforeMonth;
let resultValue;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: ""
    },
    date: {
      type: Number,
      value: new Date().getTime(),
    },
    mode: {
      type: String,
      value: 'MD',
      observer: function (newVal, oldVal, changedPath) {
        debugger
        this.setDateByMode();
      }
    },
    isShowDatePicker: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    cMode: "",
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    value: [],


    isShowYear: false,
    isShowMonth: false,
    isShowDay: false,
    isShowHour: false,
    isShoMinutes: false,
    isShowSeconds: false,

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {

      this.setDateByMode();

    },
    moved() { },
    detached() { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached() { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() { },
    hide() { },
    resize() { },
  },

  /**
   * 组件的方法列表
   */
  methods: {

    setDateByMode() {


      let year = dateUtil.getYear(this.data.date);
      let month = dateUtil.getMonth(this.data.date);
      this.setDays(year, month);
      let days = dateUtil.getDay(this.data.date);
      let hours = dateUtil.getHour(this.data.date);
      let minutes = dateUtil.getMinute(this.data.date);
      let seconds = dateUtil.getSecond(this.data.date);
      beforeYear = year;
      beforeMonth = month;

      this.setData({

        value: [year - 1970, month - 1, days - 1, hours, minutes, seconds],
      })

      resultValue = this.data.value;
      this.setColumns();

    },
    setColumns() {

      let mode = this.data.mode;

      this.setData({

        isShowYear: mode == 'YMDhms' || mode == 'YMD',
        isShowMonth: mode == 'YMDhms' || mode == 'YMD' || mode == 'MD',
        isShowDay: mode == 'YMDhms' || mode == 'YMD' || mode == 'MD',
        isShowHour: mode == 'YMDhms' || mode == 'hm',
        isShoMinutes: mode == 'YMDhms' || mode == 'hm',
        isShowSeconds: mode == 'YMDhms',
      })
    },

    setDays(year, month) {


      if (year != beforeYear || beforeMonth != month) {
        beforeYear = year;
        beforeMonth = month;
        let dayCount = dateUtil.getDaysOfMonth(year, month);

        let days = [];

        for (let i = 1; i <= dayCount; i++) {

          days.push(i)
        }

        this.setData({

          days: days,
        })

      }


    },
    bindChange: function (e) {

      const val = e.detail.value
      resultValue = val;
      let year = this.data.years[val[0]];
      let month = this.data.months[val[1]];
      this.setDays(year, month);


    },
    onCancellClick() {

      this.triggerEvent('datePickerCancellEvent')
    },
    onOkClick() {

      const myEventDetail = {};

      myEventDetail.data = this.data.data;
      myEventDetail.date = this.getResultDate();
      this.triggerEvent('datePickerOkEvent', myEventDetail)

    }

    ,
    getResultDate() {

      let result = 0;
      let year = this.data.years[resultValue[0]];
      let month = this.data.months[resultValue[1]] - 1;
      let day = this.data.days[resultValue[2]];
      let hour = this.data.hours[resultValue[3]];
      let minutes = this.data.minutes[resultValue[4]];
      let seconds = this.data.seconds[resultValue[5]];
      result = new Date(year, month, day, hour, minutes, seconds).getTime();

      return result;
    }
  }
})