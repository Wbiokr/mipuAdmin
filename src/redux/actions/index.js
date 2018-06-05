import Fetch from '../../utils/fetch'

import {formatDate} from '../../utils/format'

const {
  notification
} = antd;

export const _login=(dispatch,payload)=>{
  sessionStorage.loginInfor=JSON.stringify({
    isLogin:true,
    infor:payload
  })
  dispatch({
    type:'login',
    payload,
  })
}

export const _logout=(dispatch)=>{
  Fetch({
    url:'/user/loginout',
    type:'post',
    success:(res)=>{
      sessionStorage.removeItem('loginInfor');
      dispatch({
        type:'logout'
      })
      notification.success({
        message:'success',
        description:'成功退出登录，页面跳转中...'
      })
      setTimeout(()=>{
        location.reload()
      },800)
    }
  })
  
}

export const _editPass=(dispatch,oldPwd,newPwd)=>{
  Fetch({
    type:'post',
    url:'/user/updatePwd',
    data:{
      oldPwd,newPwd
    },
    success:(res)=>{
    },
    error:(err)=>{
      layer.alert(err)
    }
  })
}

// 获取首页数据
export const _getIndex=(dispatch)=>{
  
  Fetch({
    type:'post',
    url:'/system/index',
    success:(res)=>{
      if(res.code==0){
        dispatch({
          type:'home_update',
          payload:res.dataModel
        })
      }
    },
  })
} 

// 搜索资料
export const _searchUser=(dispatch,phone)=>{
  Fetch({
    type:'post',
    url:'/user/info',
    data:{
      phone
    },
    success:(res)=>{
      if(res.code==0){
        if(!res.dataModel.orderList&&!res.dataModel.userData){
          notification.info({
            message:'info',
            description:'账号没有相关信息'
          })
          dispatch({
            type:'user_clear',
            payload:Object.assign({},{phone})
          })
        }else{
          let newData=format(res.dataModel)
          dispatch({
            type:'user_search',
            payload:Object.assign({},newData,{phone})
          })
        }
      }else{
        notification.error({
          message:'error',
          description:res.message
        })
        dispatch({
          type:'user_clear',
          payload:Object.assign({},{phone})
        })
      }
    }
  })
}

// 充值记录
export const _getRecord=(dispatch,userId)=>{
  Fetch({
    url:'/user/rechargeLog',
    type:'post',
    data:{
      userId
    },
    success(res){
      if(res.code==0){
        if(res.dataModel){
          dispatch({
            type:'get_record',
            payload:{data:formatRecord(res.dataModel)}
          })
        }else{
          notification.info({
            message:'info',
            description:'没有充值记录'
          })
          dispatch({
            type:'del_record',
            
          })
          
        }
      }else{
        notification.error({
          message:'error',
          description:res.message
        })
        dispatch({
          type:'del_record',
          
        })
      }
    }
  })
} 


// 银行卡列表
export const _getBank=(dispatch,userId)=>{
  Fetch({
    url:'/user/bankCard',
    type:'post',
    data:{
      userId
    },
    success(res){
      if(res.code==0){
        if(res.dataModel){
          dispatch({
            type:'get_bank',
            payload:{data:formatBank(res.dataModel)}
          })
        }else{
          notification.info({
            message:'info',
            description:'没有银行卡信息'
          })
          dispatch({
            type:'del_bank',
            
          })
          
        }
      }else{
        notification.error({
          message:'error',
          description:res.message
        })
        dispatch({
          type:'del_bank',
          
        })
      }
    }
  })
} 


// 借条详情
export const _getLoanDetail=(dispatch,orderNo)=>{
  Fetch({
    url:'/order/info',
    type:'post',
    data:{
      orderNo
    },
    success(res){
      if(res.code==0){
        if(res.dataModel){
          dispatch({
            type:'get_loanDetail',
            payload:formatDetail(res.dataModel)
          })
        }else{
          notification.info({
            message:'info',
            description:'请求出错，请联系相关人员。。。'
          })
          dispatch({
            type:'del_loanDetail',
            
          })
          
        }
      }else{
        notification.error({
          message:'error',
          description:res.message
        })
        dispatch({
          type:'del_loanDetail',
          
        })
      }
    }
  })
} 

// 借款列表
export const _getLoanList=(dispatch,mobile)=>{
  Fetch({
    url:'/order/list',
    type:'post',
    data:{
      mobile
    },
    success(res){
      if(res.code==0){
        if(res.dataModel){
          dispatch({
            type:'get_loanList',
            payload:{
              mobile,
              data:formatLoanList(res.dataModel)
            }
          })
        }else{
          notification.info({
            message:'info',
            description:'请求出错，请联系相关人员。。。'
          })
          dispatch({
            type:'del_loanList',
            
          })
          
        }
      }else{
        notification.error({
          message:'error',
          description:res.message
        })
        dispatch({
          type:'del_loanList',
          
        })
      }
    }
  })
} 

// 角色列表
export const _getRoleList=(dispatch,search)=>{
  Fetch({
    url:'/account/accountList',
    type:'post',
    data:{
      search
    },
    success(res){
      if(res.code==0){
        if(res.dataModel){
          dispatch({
            type:'get_roleList',
            payload:{
              key:search,
              data:formatRoleList(res.dataModel)
            }
          })
        }else{
          notification.info({
            message:'info',
            description:'请求出错，请联系相关人员。。。'
          })
          dispatch({
            type:'del_roleList',
          })
          
        }
      }else{
        notification.error({
          message:'error',
          description:res.message
        })
        dispatch({
          type:'del_roleList',
        })
      }
    }
  })
}

// 權限組列表
export const _getRoleGroup=(dispatch,search)=>{
  Fetch({
    url:'/role/getRolesByParam',
    type:'post',
    success(res){
      if(res.code==0){
        if(res.dataModel){
          dispatch({
            type:'get_powerGroup',
            payload:{
              data:formatGroup(res.dataModel)
            }
          })
        }else{
          notification.info({
            message:'info',
            description:'请求出错，请联系相关人员。。。'
          })
          dispatch({
            type:'del_powerGroup',
          })
          
        }
      }else{
        notification.error({
          message:'error',
          description:res.message
        })
        dispatch({
          type:'del_powerGroup',
        })
      }
    }
  })
}

// 获取所有权限项
export const _getAllEnable=(dispatch,pId)=>{
  Fetch({
    url:'/menu/getAllEnable',
    data:{
      pId
    },
    success(res){
      if(res.code==0){
        dispatch({
          type:'get_allEnable',
          payload:{data:res.dataModel},
        })
      }else{
        notification.info({
          message:'info',
          description:res.message
        })
      }
    },
    beforeSend(){},
    complete(){},
  })
}

function formatGroup(data){
  let newData=[];
  Array.from(data,(item,i)=>{
    const newItem=item;
    newItem.statusS=item.status==0?'正常':(item.status==1?'冻结':'取消')
    newData.push(newItem)
  })
  return newData;
}

function formatRoleList(data){
  let newData=[];
  Array.from(data,(item,index)=>{
    const newItem=item;
    newItem.statusS=item.status==0?'正常':(item.status=='1'?'冻结':'注销');
    newItem.createDateT=formatDate(item.createDate)
    newData.push(newItem)
  })
  return newData;
}


function formatLoanList(data){
  let newData=[];
  data.forEach((item,i)=>{
    let newItem=item;
    newItem.businessChildTypeT=item.businessChildType==2?'自动借条':'补借条';
    newItem.orderStatusS=convertOrderStatus(item.orderStatus);
    newItem.loanDateStartT=formatDate(item.loanDateStart);
    newItem.createDateT=formatDate(item.createDate);
    newData.push(newItem)
  })

  return newData;
}

function formatDetail(data){
  let newData=data;
  newData.order.businessChildTypeT=data.order.businessChildType==2?'自动借条':'补借条';
  newData.order.loanDateStartT=formatDate(data.order.loanDateStart);
  newData.order.loanDateEndT=formatDate(data.order.loanDateEnd);
  newData.order.confirmDateT=formatDate(data.order.payClearDate);
  newData.order.createDateT=formatDate(data.order.createDate);
  newData.order.orderStatusS=convertOrderStatus(data.order.orderStatus);
  newData.order.businessChildTypeS=data.order.businessChildType==2?'线上':'线下'
  return newData
}

function formatBank(data){
  let newRecorrd=[];
  data.forEach((item,index)=>{
    let newItem=item;
    newItem.lastPayTimeF=formatDate(item.lastPayTime);
    newItem.createDateF=formatDate(item.createDate);
    newItem.unbindS=item.unbind?'绑定':'解绑';
    newRecorrd.push(newItem)
  })
  return newRecorrd;
}

function formatRecord(data){
  let newRecorrd=[];
  data.forEach((item,index)=>{
    let newItem=item;
    newItem.status=convertPayStatus(item.statusCode)
    newItem.createDateT=formatDate(item.createDate)
    newRecorrd.push(newItem)
  })
  return newRecorrd;
}


function format(data){
  let newOrderList=[];
  let newData={};
  data.orderList.forEach((item,index)=>{
    let newItem={};
    newItem.businessChildType=item.businessChildType==2?'自动借条':'补借条';
    newItem.createDate=formatDate(item.createDate);
    newItem.orderStatus=convertOrderStatus(item.orderStatus);
    newItem.orderRole=item.orderRole?'出借人':'借款人';
    newOrderList.push(Object.assign({},item,newItem))
  })
  newData.orderList=newOrderList;
  return Object.assign({},data,newData);
}

function convertOrderStatus(status){
  switch(status){
    case 0:
      return '未生效';
      break ;
    case 1:
      return '生效中';
      break ;
    case 2:
      return '已完成';
      break ;
    case 3:
      return '逾期中';
      break ;
    case 4:
      return '手动关闭';
      break ;
    case 5:
      return '已驳回';
      break ;
    case 6:
      return '逾期结清';
      break ;
    case 7:
      return '系统关闭'
    default:
      return '未知';
      break ;
  }
}

function convertPayStatus(statusCode){
  switch(statusCode){
    case 0:
      return '等待支付';
      break;
    case 1:
      return '支付中';
      break ;
    case 2:
      return '成功';
      break ;
    case 3:
      return '失败';
      break ;
    case 4:
      return '取消';
      break ;
    case 5:
      return '超时关闭';
      break ;
    default :
      return '不知道';
      break ;
  }
}