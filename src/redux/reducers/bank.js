// const initState={
//   hasRecord:false,
//   data:[],
// }

// export default function(state=initState,action){
//   switch(action.type){
//     case 'get_bank':
//       return Object.assign({},state,action.payload,{hasRecord:true});
//     case 'del_bank':
//       return {
//         hasRecord:false,
//         data:[],
//       } ;
//     default:
//       return state;
//   }
// }

const initState={
  hasRecord:false,
  data:[],
}

export default function(state=initState,action){
  switch(action.type){
    case 'get_bank':
      return Object.assign({},state,action.payload,{hasRecord:true});
    case 'del_bank':
      return {
        hasRecord:false,
        data:[],
      } ;
    default:
      return state;
  }
}