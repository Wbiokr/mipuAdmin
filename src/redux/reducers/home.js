const STATE={
  "totalUser": '', 
  "rechargeAmount": '',
  "accountAmount": '',
  "orderList": [ //'订单状态。0-未生效。1-生效中。2-已完成。3-逾期中。4-手动关闭。5-已驳回。5-逾期结清。7-系统关闭。',
  
  ]
}

export default function(state=STATE,action){
  switch(action.type){
    case 'home_update':
      return Object.assign({},state,action.payload);
    default:
      return state;
  }
}