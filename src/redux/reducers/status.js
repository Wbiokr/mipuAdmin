export const initState={
  roleStatus:[
    {value:0,name:'正常'},
    {value:1,name:'冻结'},
    {value:2,name:'注销'},
  ]
}

export default function(state=initState,action){
  return state
}