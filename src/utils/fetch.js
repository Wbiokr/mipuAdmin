import store from '../redux/'
import { setTimeout } from 'timers';

const {
  message
} = antd

export default function(payload){
  const type=payload.type||'post';
  const url=payload.url||'';
  const data=payload.data||{};
  const contentType='application/x-www-form-urlencoded';
  const beforeSend=payload.beforeSend||function(){
    message.loading('数据请求中...',0)
  };
  const success=payload.success||function(){};
  const error=payload.error||function(){};
  const base=payload.base||config.api;
  const complete=payload.complete||function(){
    setTimeout(()=>{
      message.destroy()
    },500)
  }
  beforeSend();
  window.fetch(`${base}${url}`,{
    method:type,
    headers:{
      "Content-Type":contentType,
    },
    body:formatParams(Object.assign({},data,{
      authId:store.getState().information&&store.getState().information.infor&&store.getState().information.infor.token
    })),
  }).then(res=>res.json())
    .then(res=>{
      if(res.code=="900210004"){
        sessionStorage.removeItem('loginInfor');
        antd.message.error('登录过期或未登录，即将跳转至登录页...',2000)
        setTimeout(()=>{
          location.reload()
        },1200)
      }else{
        success(res)
      }
      complete()
    })
    .catch(res=>{
      error(res)
      complete()
    })
}

function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  arr.push(("v=" + Math.random()).replace(".", ""));
  return arr.join("&");
}
