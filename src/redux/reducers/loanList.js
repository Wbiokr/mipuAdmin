const initState={
  // mobile:'17601230520',
  mobile:'',
  data:[]
}

export default function(state=initState,action){
  switch(action.type){
    case 'get_loanList':
      return Object.assign({},state,action.payload);
    case 'del_loanList':
      return initState;
    default:
      return state;
  }
}