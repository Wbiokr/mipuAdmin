const initState={
  key:'',
  data:[],
}

export default function(state=initState,action){
  switch(action.type){
    case 'get_roleList':
      return Object.assign({},state,action.payload);
    case 'del_roleList':
      return initState;
    default :
      return state;
  }
}