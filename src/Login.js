import Fetch from './utils/fetch.js'
import cxs from 'cxs'
import {connect} from 'react-redux'
import {_login} from './redux/actions/'
const {
  Form, Icon, Input, Button, Checkbox
} = antd;

const FormItem=Form.Item;

class Login extends React.Component {
  constructor(props){
    super(props)
   
    this.state={
      dis:'none',
    }

    this.login=this.login.bind(this)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={`login-page ${rule}`} >
        <Form onSubmit={this.handleSubmit} className={form}>


          <FormItem>
            {getFieldDecorator('loginName', {
              rules: [{ required: true, message: 'ds45请输入正确的用户名fsf！' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" defaultValue={'dsd'}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入正确的密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" defaultValue={this.state.password} />
            )}
          </FormItem>
          {
            // <Checkbox defaultValue={this.state.checked} onChange={this.changeCheckbox} style={{color:'#eee'}}>记住密码</Checkbox>  
          }
          <Button type="primary" htmlType="submit" style={{width:'100%','marginTop':'10px'}}>
            登&nbsp;&nbsp;&nbsp;&nbsp;录
          </Button>
        </Form>

      </div>
    )
  }
  
  
  changeCheckbox=(e)=>{
    this.setState({checked:e.target.checked});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.login.bind(this)(values)
      }
    });

  }
  login=(params)=>{
    Fetch({
      type:'post',
      url:'/user/login',
      data:params,
      success:(res)=>{
        if(res.code==0){
          this.props._login(res.dataModel)
          antd.notification.success({
            message:'恭喜',
            description:res.message||'登录成功'
          })
          setTimeout(()=>{
            location.reload()
          },500)
        }else{
          antd.notification.error({
            message:'提示',
            description:res.message||'登录失败'
          })
        }
      },
      error(){
        antd.notification.error({
          message:'提示',
          description:'请求出错'
        })
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
    _login:(payload)=>{
      _login(dispatch,payload)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginIndex)

const rule=cxs({
  position:'fixed',
  height:'100%',
  width:'100%',
  'background':'#64c0d4',
  display:'flex',
  'justify-content':'center',
  'align-items':'center',
  animation:'login linear 10s infinite forwards alternate',
  padding:'10px 50px',
})
const form=cxs({
  padding:'50px 30px',
  background:'rgba(0,0,0,.65)',
  'margin-top':'-80px',
  width:'360px',
  'box-shadow':'0 0 20px 2px rgba(250,250,250,.3)',
  'border-radius':'8px',
  button:{
    width:'100%'
  }
})