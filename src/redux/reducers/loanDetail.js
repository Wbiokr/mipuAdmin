const initState={
  getDetail:false,
  loan_in:{},
  loan_out:{},
  order:{},
}

export default function(state=initState,action){
  switch(action.type){
    case 'get_loanDetail':
      return Object.assign({},state,action.payload,{
        getDetail:true
      });
    case 'del_loanDetail':
      return {
        getDetail:false,
        loan_in:{},
        loan_out:{},
        order:{},
      };
    default :
      return state;
  }
}