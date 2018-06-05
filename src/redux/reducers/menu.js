const initState={
  data:[]
}

export default function(state=initState,action){
  switch(action.type){
    case 'get_allEnable':
      return Object.assign({},state,action.payload)
    default:
      return state;
  }
}