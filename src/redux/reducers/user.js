const initState={
  // phone:'17601230520',
  phone:'',
  orderList:{},
  userData:{},
}

export default function(state=initState,action){
  switch(action.type){
    case 'user_search':
      return Object.assign({},state,action.payload);
    case 'user_clear':
      return {
        phone:state.phone,
        orderList:{},
        userData:{},
      }
    case 'change_phone':
      return {
        phone:action.phone,
        orderList:{},
        userData:{},
      };
    default:
      return state;
  }
}