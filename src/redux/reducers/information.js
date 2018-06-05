const initState={
  isLogin:false,
  infor:{

  } 
};

export default (state=initState,action)=>{
  switch(action.type){
    case 'login':
      return Object.assign({},state,{infor:action.payload},{isLogin:true});
      
    case 'logout':
      return {isLogin:false,infor:{}};

    default:
      return state;
  }
}