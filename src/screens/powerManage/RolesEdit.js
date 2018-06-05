
import cxs from 'cxs'

import { connect } from 'react-redux'

import { _getRoleGroup,_logout, _login } from '../../redux/actions/'

import Fetch from '../../utils/fetch'


const {
  Layout, Col, Row, Input, Button,Table,notification,
  Form, Select, 

} = antd;
const FormItem = Form.Item;
const Option = Select.Option;

class AddConstructor extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        Fetch({
          url:'/account/accountEdit',
          data:Object.assign({},values,{
            id:this.props.match.params.id
          }),
          success:(res)=>{
            if(res.code==0){
              if(this.props.match.params.id==this.props.id){
                notification.success({
                  message:'success',
                  description:'成功修改当前账号，即将退出登录...'
                })  
                // setTimeout(()=>)
                this.props._logout()
              }else{
                notification.success({
                  message:'success',
                  description:'编辑成功'
                })
              }
            }else{
              notification.error({
                message:'error',
                description:res.message
              })
            }
          }
        })
      }
    });
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  constructor(props){
    super(props)
    this.state={
      nnn:'dsfsaafsdafas'
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const {name}=this.props.match.params;
    return (
      <Form onSubmit={this.handleSubmit}>

        <input type="password" style={{height:0,opacity:0}}/>

        
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator('loginName', {
            initialValue:name,
            rules: [{
              required: true,
              message: '请输入用户名！',
            }],
          })(
            <Input defaultValue={this.props.match.params.name} disabled/>
          )}
        </FormItem>


        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('password', {

            rules: [{
              required: true,
              message: '请输入正确的密码!',
            }],
          })(
            <Input type='password' placeholder="" defaultValue={'123'} autocomplete='off'/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="权限组"
          hasFeedback
        >
          {getFieldDecorator('roleId', {
            rules: [
              { required: true, message: '请选择权限组!' },
            ],
          })(
            <Select placeholder="" >
              {
                this.props.data.map((item,index)=>(
                  <Option value={item.id} >{item.name}</Option>
                ))
              }
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="状态"
          hasFeedback
        >
          {getFieldDecorator('status', {
            // initialValue:this.props.match.params.status,
            rules: [
              { required: true, message: '请选择状态值!' },
            ],
          })(
            <Select placeholder="" >
              {
                this.props.status.map((item,index)=>(
                  <Option value={item.value}>{item.name}</Option>
                ))
              }
            </Select>
          )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">保 存</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="default" htmlType="reset" onClick={()=>{this.props.form.resetFields()}}>重 置</Button>
        </FormItem>
      </Form>
    );
  }
  
}

const Add = Form.create()(AddConstructor);



const Item=(props)=><p className={props.name+' '+item}>{props.children}</p>

class RoleAdd extends React.Component {
  render() {
    return (
      <Layout>
        <header>
          <Row className={title}>
            <Col span={24}>
              <span>编辑后台角色</span>
              &nbsp;&nbsp;&nbsp;
              <a href="#/power/roleList/list">返回</a>
            </Col>
          </Row>
          <Row style={{ height: '30px' }}></Row>
        </header>
        <Row>
          <Col span={3}></Col>
          <Col span={16}>
            <Add data={this.props.group.data} status={this.props.status} match={this.props.match} id={this.props.info.infor.id} _logout={this.props._logout}/>
          </Col>
          <Col span={5}></Col>
        </Row>
      </Layout>
    )
  }
  componentDidMount(){
    this.props._getRoleGroup()
    // console.log(this.props.info)
  }
  
}

const mapStateToProps = (state) => (
  {
    group: state.powerGroup,
    status:state.status.roleStatus,
    info:state.information,
  }
)
const mapDispatchToProps=(dispatch)=>({
  _getRoleGroup(){
    _getRoleGroup(dispatch)
  },
  _logout(){
    _logout(dispatch)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(RoleAdd)

const title = cxs({
  borderBottom: '2px solid #009688',
  ' >div': {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '50px',
    paddingTop: '20px',
    paddingLeft: '20px',
  }
})

const item=cxs({
  paddingLeft:'15px',
  display:'flex',
  alignItems:'center',
  fontSize:'14px',
  color:'#009688',
  height:'30px',
  margin:0,
  border:'0.5px solid #dedede',
  '.label':{
    color:'#333'
  }
})

const table=cxs({
  paddingTop:'15px'
})