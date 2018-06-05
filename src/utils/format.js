export const getParams = function () {
  var params = {};
  location.hash.split('?')[1].split('&').forEach(function (item) {
    params[item.split('=')[0]] = item.split('=')[1]
  })
  return params;
};

export const formatDate=function(stamp){
  // console
  // stamp==null?(return null):
  const  y=new Date(stamp).getFullYear()||'00';
  const m=new Date(stamp).getMonth()+1||'00';
  const d=new Date(stamp).getDate()||'00';
  const h=new Date(stamp).getHours();
  const mi=new Date(stamp).getMinutes();
  const s=new Date(stamp).getSeconds();
  return stamp?`${y}-${sltTwo(m)}-${sltTwo(d)} ${sltTwo(h)}:${sltTwo(mi)}:${sltTwo(s)}`:'';
}

function sltTwo(s){
  return `0${s}`.slice(-2)
}