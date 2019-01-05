// pages/canlendar/canlendar.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      hasEmptyGrid: false,
      cur_year: '',
      cur_month: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.setNowDate();
   },
   dateSelectAction: function (e) {
      var cur_day = e.currentTarget.dataset.idx;
      this.setData({
         todayIndex: cur_day
      })
      console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}日`);
   },

   setNowDate: function () {
      const date = new Date();
      const cur_year = date.getFullYear();
      const cur_month = date.getMonth() + 1;
      const todayIndex = date.getDate() - 1;
      console.log(`日期：${todayIndex}`)
      const weeks_ch1 = ['日', '一', '二', '三', '四', '五', '六'];
      const weeks_ch2 = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const weeks_ch3 = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      const weeks_ch4 = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const weeks_ch5 = ['SUN日', 'MON一', 'TUE二', 'WED三', 'THU四', 'FRI五', 'SAT六'];
      const weeks_ch = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      this.calculateEmptyGrids(cur_year, cur_month);
      this.calculateDays(cur_year, cur_month);
      this.setData({
         cur_year: cur_year,
         cur_month: cur_month,
         weeks_ch,
         todayIndex,
      })
   },

   getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
   },
   getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
   },
   calculateEmptyGrids(year, month) {
      const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
      let empytGrids = [];
      if (firstDayOfWeek > 0) {
         for (let i = 0; i < firstDayOfWeek; i++) {
            empytGrids.push(i);
         }
         this.setData({
            hasEmptyGrid: true,
            empytGrids
         });
      } else {
         this.setData({
            hasEmptyGrid: false,
            empytGrids: []
         });
      }
   },
   calculateDays(year, month) {
      let days = [];

      const thisMonthDays = this.getThisMonthDays(year, month);

      for (let i = 1; i <= thisMonthDays; i++) {
         days.push(i);
      }

      this.setData({
         days
      });
   },
   handleCalendar(e) {
      const handle = e.currentTarget.dataset.handle;
      const cur_year = this.data.cur_year;
      const cur_month = this.data.cur_month;
      if (handle === 'prev') {
         let newMonth = cur_month - 1;
         let newYear = cur_year;
         if (newMonth < 1) {
            newYear = cur_year - 1;
            newMonth = 12;
         }

         this.calculateDays(newYear, newMonth);
         this.calculateEmptyGrids(newYear, newMonth);

         this.setData({
            cur_year: newYear,
            cur_month: newMonth
         })

      } else {
         let newMonth = cur_month + 1;
         let newYear = cur_year;
         if (newMonth > 12) {
            newYear = cur_year + 1;
            newMonth = 1;
         }

         this.calculateDays(newYear, newMonth);
         this.calculateEmptyGrids(newYear, newMonth);

         this.setData({
            cur_year: newYear,
            cur_month: newMonth
         })
      }
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})