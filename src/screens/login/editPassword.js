import Fetch from '../../utils/fetch.js'
import cxs from 'cxs'
import {connect} from 'react-redux'
import {_logout} from '../../redux/actions/'
import {getParams} from '../../utils/format'
const {
  Form, Icon, Input, Button
} = antd;

const FormItem=Form.Item;

class Login extends React.Component {
  constructor(props){
    super(props)
   
    this.state={
      oldPwd:'',
      newPwd:'',
      repPwd:'',
    }
    // this.logout=this.logout.bind(this)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={`login-page ${rule}`} >
        <Form onSubmit={this.handleSubmit} className={form}>
          <FormItem>
            {getFieldDecorator('oldPwd', {
              rules: [{ required: true, message: '请输入老密码' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder="老密码" defaultValue={this.state.oldPwd}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('newPwd', {
              rules: [{ required: true, message: '请输入正确的密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" defaultValue={this.state.newPwd} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('repPwd', {
              rules: [{ required: true, message: '请输入一致密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" defaultValue={this.state.repPwd} />
            )}
          </FormItem>
          
          <FormItem >
          
            <Button type="primary" htmlType="submit" style={{width:'40%','marginTop':'10px'}}>
              确&nbsp;&nbsp;&nbsp;&nbsp;定
            </Button>
            <Button type="normal" htmlType="button" style={{width:'40%','marginTop':'10px',float:'right'}} onClick={this.props.cancel}>
              取&nbsp;&nbsp;&nbsp;&nbsp;消
            </Button>
            
          </FormItem>
        </Form>

      </div>
    )
  }
  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(values.newPwd!==values.repPwd){
          antd.notification.warning({
            message:'提示',
            description:'两次密码输入不一致！'
          })
        }else{
          this.update.bind(this)(values)

        }
      }
    });

  }
  update=(params)=>{
    Fetch({
      type:'post',
      url:'/user/updatePwd',
      data:params,
      success:(res)=>{
        if(res.code==0){
          antd.notification.success({
            message:'success',
            description:res.message+'\n即将跳转，重新登录...'
          })
          setTimeout(()=>{
            this.props._logout(res.dataModel)
            location.reload()
          },500)
        }else{
          antd.notification.error({
            message:'error',
            description:res.message
          })
        }
      }
    })
  }
  
}

const LoginIndex=Form.create()(Login)


const mapStateToProps=(state)=>({
  informatin:state.information
})
const mapDispatchToProps=(dispatch)=>{
  return {
    _logout:(payload)=>{
      _logout(dispatch,payload)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginIndex)

const rule=cxs({
  position:'fixed',
  top:0,
  left:0,
  height:'100%',
  width:'100%',
  'background':'#dedede',
  display:'flex',
  'justify-content':'center',
  'align-items':'center',
  animation:'login linear 10s infinite forwards alternate',
  padding:'0px 0 100px ',
  'z-index':'1000'
})
const form=cxs({
  padding:'50px 30px',
  background:'rgba(0,0,0,.85)',
  'margin-top':'-80px',
  width:'410px',
  'box-shadow':'0 0 20px 2px rgba(0,0,0,.3)',
  'border-radius':'8px',
  button:{
    width:'100%'
  }
})