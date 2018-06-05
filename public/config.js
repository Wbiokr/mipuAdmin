let agree=(function(){
  return location.href.includes('localhost:')||location.href.includes('//192.168')||location.href.includes('//t')||location.href.includes('file:/')?'http://t':'http://'
})()

window.config={
  agree,
  api:`${agree}back.51woncai.com`
}
