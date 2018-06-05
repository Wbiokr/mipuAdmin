const initState={
  hasRecord:false,
  data:[],
}

export default function(state=initState,action){
  switch(action.type){
    case 'get_record':
      return Object.assign({},state,action.payload,{hasRecord:true});
    case 'del_record':
      return {
        hasRecord:false,
        data:[],
      } ;
    default:
      return state;
  }
}