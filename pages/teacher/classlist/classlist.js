// pages/teacher/classlist.js
import {Api} from '../../../utils/api.js';
var api = new Api();

Page({


  data: {
    mainData:[],
    num:1,
    searchItem:{},
    join:{},
 
   open:false,
   date:'2018-01-01',
   startTime:'00.00',
   endTime:'24.00',
  },
   
  

  onLoad(){
    const self = this;
    wx.showLoading();
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getlabelList();

  },

  getlabelList(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:['=','70'],
      type:['=','7'],
    };
    const callback = (res)=>{
      self.data.labelData = res
      wx.hideLoading();
      self.setData({
        web_labelData:self.data.labelData,
      });
      console.log(self.data.labelData)
      
    };
    api.labelGet(postData,callback);
  },

  getMainData(isNew){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:['=','70']
    };

    postData.join = {
      relation:{
        searchItem:{
          relation_two:['in','352']
        },
        s_key:'relation_one',
        key:'product_no',
        condition:'in'
      },  
    };      
    const callback = (res)=>{
      self.data.mainData = res
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });
      console.log(self.data.mainData)
      
    };
    api.productGet(postData,callback);
  },

  menuClick: function (e) {
    const self = this;
    const num = e.currentTarget.dataset.num;
    self.changeSearch(num);
  },


  changeSearch(num){
    const self = this;
    this.setData({
      num: num
    });
    
    if(num=='1'){

    }else if(num=='2'){

    }else if(num=='3'){
    
      
    }else if(num=='4'){

    }

    self.setData({
      web_mainData:[],
    });
    self.getMainData(true);

  },


  tap_ch: function(e){
    const self = this;
    if(!self.data.open){
      self.setData({
        open : true
      });
    }else{
      self.setData({
        open : false
      });
    }
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChangeStart: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  bindTimeChangeEnd: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },

})
//   onLoad(){
//     const self= this;
   

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
// let animationShowHeight = -920;
 
// Page({
//   data:{
//         num:1,
//         animationData:"",
//         showModalStatus:false,
//         imageHeight:0,
//         imageWidth:0
//   },

//   menuClick: function (e) {
//     const self = this;
//     const num = api.getDataSet(e,'num');
//     self.setData({
//       num: num
//     });
//   },

//   intoPath(e){
//      const self = this;
//      api.pathTo(api.getDataSet(e,'path'),'nav');

//   },
  
//   imageLoad: function (e) {  
//         this.setData({imageHeight:e.detail.height,imageWidth:e.detail.width});  
//   },
//   showModal: function () {
//         const self = this;
//         const animation = wx.createAnimation({
//             duration: 300,
//             timingFunction: "linear",
//             delay: 0
//         })
//         self.animation = animation
//         animation.translateY(animationShowHeight).step()
//         self.setData({
//             animationData: animation.export(),
//             showModalStatus: true
//         })
//         setTimeout(function () {
//             animation.translateY(0).step()
//             self.setData({
//                 animationData: animation.export()
//             })
//         }.bind(self), 300)
//     },
//     hideModal: function () {
//         const self = this;
//         const animation = wx.createAnimation({
//             duration: 300,
//             timingFunction: "linear",
//             delay: 0
//         })
//         self.animation = animation;
//         animation.translateY(animationShowHeight).step()
//         self.setData({
//             animationData: animation.export(),
//         })
//         setTimeout(function () {
//         animation.translateY(0).step()
//         self.setData({
//             animationData: animation.export(),
//             showModalStatus: false
//         })
//         }.bind(self), 300)
//     },
//      onShow:function(){
//       const self  = this;
//          let that = self;
//          wx.getSystemInfo({
//             success: function(res) {
//                 animationShowHeight = res.windowHeight;
//             }
//         })






