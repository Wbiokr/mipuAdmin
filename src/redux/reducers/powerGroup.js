const initState={
  data:[]
}

export default function(state=initState,action){
  switch(action.type){
    case 'get_powerGroup':
      return Object.assign({},state,action.payload);
    case 'del_powerGroup':
      return {data:[]};
    default :
      return state;
  }
}