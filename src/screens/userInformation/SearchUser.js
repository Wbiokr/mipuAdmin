import cxs from 'cxs'

import { connect } from 'react-redux'

import { _searchUser } from '../../redux/actions/'

import Fetch from '../../utils/fetch'

import {formatDate} from '../../utils/format';

const {
  Layout, Col, Row, Input, Button,Table,notification
} = antd

const Item=(props)=><p className={props.name+' '+item}>{props.children}</p>

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state={
      phone:this.props.user.phone,
      columns:[
        {title:'订单编号',dataIndex:'orderNo',key:'orderNo'},
        {title:'借条类型',dataIndex:'businessChildType',key:'businessChildType'},
        {title:'借条状态',dataIndex:'orderStatus',key:'orderStatus'},
        {title:'角色',dataIndex:'orderRole',key:'orderRole'},
        {title:'借款金额',dataIndex:'amount',key:'amount'},
        {title:'借款时长',dataIndex:'loanDays',key:'loanDays'},
        {title:'创建时间',dataIndex:'createDate',key:'createDate'},
        {title:'操作',dataIndex:'handle',key:'hanlde',render: (text,record,index) => {return <a href={"#/loan/loanDetail/"+record.orderNo}>查看</a>},},
      ]
    }
  }
  render() {
    return (
      <Layout>
        <header>
          <Row className={title}>
            <Col span={24}>
              <span>用户查询</span>
            </Col>
          </Row>
          <Row style={{ height: '30px' }}></Row>
          <Row className={wrapper} style={{ width: '100%' }}>
            <Col span={12}>
              <Input defaultValue={this.props.user.phone} maxLength={11} placeholder='请输入手机号'   onKeyup='value=value.replace(/[^\d]/g,"")' onChange={(e)=>{
                  e.target.value=e.target.value.replace(/[^\d]/g,'');
                  this.setState({
                    phone:e.target.value
                  }) 
                }}
                onPressEnter={()=>{this.props._search(this.state.phone)}}
              />
            </Col>
            <Col span={1}>
            </Col>
            <Col span={4}>
              <Button type='primary' className={btn} onClick={()=>{this.props._search(this.state.phone)}}>查  询</Button>
            </Col>
          </Row>
        </header>
        {
          (JSON.stringify(this.props.user.orderList).length>10||JSON.stringify(this.props.user.userData).length>10)?<main className={[content]} >
          <header>
            <Row >
              <Col span={4}>
                <Item name='label'>真实姓名</Item>
              </Col>
              <Col span={8}>
                <Item>{`${this.props.user.userData.userName}[已实名]`||'未实名'}</Item>
              </Col>
              <Col span={4}>
                <Item name='label'>来源渠道</Item>
              </Col>
              <Col span={8}>
                <Item></Item>
              </Col>
            </Row>
            <Row >
              <Col span={4}>
                <Item name='label'>手机号码</Item>
              </Col>
              <Col span={8}>
                <Item>{this.props.user.userData.mobile}</Item>
              </Col>
              <Col span={4}>
                <Item name='label'>App版本号</Item>
              </Col>
              <Col span={8}>
                <Item>{this.props.user.userData.appVersion}</Item>
              </Col>
            </Row>
            <Row >
              <Col span={4}>
                <Item name='label'>身份证号</Item>
              </Col>
              <Col span={8}>
                <Item>{this.props.user.userData.idCard}</Item>
              </Col>
              <Col span={4}>
                <Item name='label'>米币</Item>
              </Col>
              <Col span={8}>
                <Item>{this.props.user.userData.balance}</Item>
              </Col>
            </Row>
            <Row >
              <Col span={4}>
                <Item name='label'>注册时间</Item>
              </Col>
              <Col span={8}>
                <Item>{formatDate(this.props.user.userData.createDate)}</Item>
              </Col>
              <Col span={12}>
                <Item>
                  <a href={'#/user/rechargeRecord/'+this.props.user.userData.id} >充值记录</a>
                  &nbsp;&nbsp;
                  <a href={'#/user/bankList/'+this.props.user.userData.id}>用户银行卡信息</a>
                </Item>
              </Col>
              
            </Row>
          </header>
          <main className={table}>
            <Table 
              columns={this.state.columns}
              dataSource={this.props.user.orderList}
            />
          </main>
        </main>:null
        }
      </Layout>
    )
  }
  componentDidMount(){
    if(this.props.user.phone.length==11){
      this.props._search(this.props.user.phone) 
    }
  }
  
}

const mapStateToProps = (state) => (
  {
    user: state.user
  }
)

const mapDispatchToProps=(dispatch)=>(
  {
    _search(phone){
      // const
      if(phone.length<11){
        notification.error({
          message:'error',
          description:'请输入正确的手机号'
        })
      }else{
        _searchUser(dispatch,phone)
      }
    }
  }
)

export default connect(mapStateToProps,mapDispatchToProps)(Search)

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