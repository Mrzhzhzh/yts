// pages/teacher/classlist.js
import {Api} from '../../../utils/api.js';
var api = new Api();
// let animationShowHeight =100;
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     animation: ''
   
//   },
    

//   onLoad(){
//     const self= this;
   

//   },



//   intoPath(e){
//     const self = this;
//     api.pathTo(api.getDataSet(e,'path'),'nav');

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   *
//    * 用户点击右上角分享
   
//   onShareAppMessage: function () {
  
//   },

  
//   btnClick: function () {
//     const self = this;
//     const animation = wx.createAnimation({
//       transformOrigin: "50% 50%",
//       duration: 1000,
//       timingFunction: "ease",
//       delay: 0
//     });
//     self.data.animation = animation
//     animation.translateX(animationShowHeight).step()
//     self.setData({
//       animation: animation.export(),
//     });
   
//   },
  
//   btnClickTo: function () {
//     const self =this;
//     const animation = wx.createAnimation({
//       transformOrigin: "50% 50%",
//       duration: 1000,
//       timingFunction: "ease",
//       delay: 0
//     })
//     self.data.animation = animation
//     animation.translateX(0).step()
//     this.setData({
//       animation: animation.export(),
//     })
//   }  
// })

let animationShowHeight = -920;
 
Page({
  data:{
        num:1,
        animationData:"",
        showModalStatus:false,
        imageHeight:0,
        imageWidth:0
  },

  menuClick: function (e) {
    const self = this;
    const num = api.getDataSet(e,'num');
    self.setData({
      num: num
    });
  },

  intoPath(e){
     const self = this;
     api.pathTo(api.getDataSet(e,'path'),'nav');

  },
  
  imageLoad: function (e) {  
        this.setData({imageHeight:e.detail.height,imageWidth:e.detail.width});  
  },
  showModal: function () {
        const self = this;
        const animation = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        })
        self.animation = animation
        animation.translateY(animationShowHeight).step()
        self.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            self.setData({
                animationData: animation.export()
            })
        }.bind(self), 300)
    },
    hideModal: function () {
        const self = this;
        const animation = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        })
        self.animation = animation;
        animation.translateY(animationShowHeight).step()
        self.setData({
            animationData: animation.export(),
        })
        setTimeout(function () {
        animation.translateY(0).step()
        self.setData({
            animationData: animation.export(),
            showModalStatus: false
        })
        }.bind(self), 300)
    },
     onShow:function(){
      const self  = this;
         let that = self;
         wx.getSystemInfo({
            success: function(res) {
                animationShowHeight = res.windowHeight;
            }
        })

},

})