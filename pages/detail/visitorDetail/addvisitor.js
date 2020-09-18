// pages/detail/visitorDetail/addvisitor.js
import { formatTime } from '../../../utils/util'
import { queryPersonnelPageInfo, submit } from '../../../service/addvisitorAPI'
import Toast from '@vant/weapp/toast/toast';
const enterpriseId = getApp().globalData.enterpriseId
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    company:'',
    visitDate:'',
    showVisitDate:false,//弹出拜访时间弹框
    personnelId:'',//拜访人员对应的id
    personnelName:'',//拜访人员对应的名字
    showPersonnel: false,//弹出拜访人员弹框
    pageInfo:[],//工作人员列表
    columns_name:[],//工作人员名字列表
    minDate: new Date((new Date().getFullYear() - 1), 10, 1).getTime(),
    maxDate: new Date((new Date().getFullYear() + 2), 10, 1).getTime(),
    currentDate: new Date().getTime(),
    formatter(type, val) {  //时间插件
      if (type === 'year') {
        return `${val}年`;
      }else if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查询人员列表
    this._queryPersonnelPageInfo();
  },
  //拜访时间显隐
  showVisitDateMethod(){
    this.setData({ showVisitDate: true });
  },
  // 确认选择拜访时间
  confirmVisitDateMethod(event) {
    // 转换为yyyy-MM-dd hh:mm:ss时间格式
    let timeValue = formatTime(new Date(event.detail), "yyyy-MM-dd hh:mm:ss");
    this.setData({ visitDate: timeValue, showVisitDate: false });
  },
  //关闭拜访时间popUp
  onClose() {
    this.setData({ showVisitDate: false,showPersonnel:false });
  },
  //拜访人员显隐
  showPersonnelMethod() {
    this.setData({ showPersonnel: true });
  },
  //查询工作人员列表
  _queryPersonnelPageInfo () {
    queryPersonnelPageInfo(enterpriseId).then(res => {
      if(res.data.rs === 1) {
        this.data.pageInfo = res.data.data;
        let columns_name = [];//工作人员name列表
        //  {"keyId":2,"text":"测试1"},
        this.data.pageInfo.map(item =>{
          let set =  {"keyId":'',"text":''}
          set.keyId = item.id;
          set.text = item.name;
          return columns_name.push(set)
        })
        //赋值
        this.setData({
          columns_name: columns_name
        })
        // console.log(this.data.columns_name)
      } else {
        
      }
    })
  },
  //确认拜访人员
  confirmPersonnelMethod(event){
    // console.log(event.detail)
    this.setData({ 
       personnelId: event.detail.value.keyId,
       personnelName:event.detail.value.text,
       showPersonnel: false 
      })
  },
  //确定提交
  formSubmit(e){
    console.log(e)
    let values = {};
    values = e.detail.value;
    //追加
    values.enterpriseId = enterpriseId
    values.personnelId = this.data.personnelId
    values.visitDate = this.data.visitDate
    submit(values).then( res => {
        console.log(res)
        if(res.data.rs === 1){
          Toast.success("您的预约已提交,请您耐心等待");
          setTimeout(()=>{
            //返回index页面
            wx.navigateTo({
              url: '/pages/index/index',
            })
          },3000)
        }else{
          Toast.fail(res.data.data.errorMsg);
        }
    }).catch(err =>{

    })
  }
})