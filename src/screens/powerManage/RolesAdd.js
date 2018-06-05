
import cxs from 'cxs'

import { connect } from 'react-redux'

import { _getRoleGroup } from '../../redux/actions/'

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
          url:'/account/accountAdd',
          data:values,
          success(res){
            if(res.code==0){
              notification.success({
                message:'success',
                description:'账户添加成功！'
              })
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>

        <input type="password" style={{height:0,opacity:0}}/>
        
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator('loginName', {
            rules: [{
              required: true,
              message: '请输入用户名！',
            }],
          })(
            <Input placeholder=""  value='fsfsd'/>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入正确的密码!',
            }],
          })(
            <Input type='password' placeholder="" defaultValue={''}/>
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
            <Select placeholder="">
              {
                this.props.data.map((item,index)=>(
                  <Option value={item.id}>{item.name}</Option>
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
              <span>添加后台角色</span>
              &nbsp;&nbsp;&nbsp;
              <a href="#/power/roleList/list">返回</a>
            </Col>
          </Row>
          <Row style={{ height: '30px' }}></Row>
        </header>
        <Row>
          <Col span={3}></Col>
          <Col span={16}>
            <Add data={this.props.group.data} />
          </Col>
          <Col span={5}></Col>
        </Row>
      </Layout>
    )
  }
  componentDidMount(){
    this.props._getRoleGroup()
  }
  
}

const mapStateToProps = (state) => (
  {
    group: state.powerGroup
  }
)
const mapDispatchToProps=(dispatch)=>({
  _getRoleGroup(){
    _getRoleGroup(dispatch)
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

const wrapper = cxs({
  padding: '0 20px'
})

const btn = cxs({
  width: '100%'
})

const content=cxs({
  margin: '20px 20px',  
  border:'1px solid #ccc'
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