import cxs from 'cxs'

import { connect } from 'react-redux'

import { _getLoanDetail } from '../../redux/actions/'

import Fetch from '../../utils/fetch'

import {formatDate} from '../../utils/format';

const {
  Layout, Col, Row, Input, Button,Table,notification
} = antd

const Item=(props)=><p className={props.name+' '+item}>{props.children}</p>

class Search extends React.Component {

  render() {
    const {loanDetail}=this.props;
    return (
      <Layout>
        <header>
          <Row className={title}>
            <Col span={24}>
              <span>用户查询</span>
              &nbsp;&nbsp;&nbsp;
              <a href="javascript:void(0);" onClick={()=>{
                history.back()
              }}>返回</a>
            </Col>
          </Row>
          <Row style={{ height: '30px' }}></Row>
        </header>
        <main className={[content]} >
          <header>
            <Row>
              <Col span={12}>
                <Item name='label space'>出借人信息 <a onClick={()=>{this.props._toUser(loanDetail.loan_out.mobile)}}>查看</a></Item>
              </Col>
              <Col span={12}>
                <Item name='label space'>借款人信息<a onClick={()=>{this.props._toUser(loanDetail.loan_in.mobile)}}>查看</a></Item>
              </Col>
              
            </Row>
            <Row >
              <Col span={12}>
                <Item name='plus vertical'>
                  <Row>
                    <Col span={24}>
                      <Item name='label nb'>{loanDetail.loan_out.realName}</Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Item name='nb'>{loanDetail.loan_out.mobile}</Item>
                    </Col>
                  </Row>
                </Item>
              </Col>

              <Col span={12}>
                <Item name='plus vertical'>
                  <Row>
                    <Col span={24}>
                      <Item name='label nb'>{loanDetail.loan_in.realName}</Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Item name='nb'>{loanDetail.loan_in.mobile}</Item>
                    </Col>
                  </Row>
                </Item>
              </Col>
            </Row>

            <Row >
              <Col span={4}>
                <Item name='label'>第一联系人</Item>
              </Col>
              <Col span={8}>
                <Item>{loanDetail.loan_out.contactList&&loanDetail.loan_out.contactList[0].userName}&nbsp;&nbsp;{loanDetail.loan_out.contactList&&loanDetail.loan_out.contactList[0].mobile}</Item>
              </Col>
              <Col span={4}>
                <Item name='label'>第一联系人</Item>
              </Col>
              <Col span={8}>
                <Item>{loanDetail.loan_out.contactList&&loanDetail.loan_in.contactList[0].userName}&nbsp;&nbsp;{loanDetail.loan_out.contactList&&loanDetail.loan_in.contactList[0].mobile}</Item>
              </Col>
            </Row>
            <Row >
              <Col span={4}>
                <Item name='label'>第二联系人</Item>
              </Col>
              <Col span={8}>
                <Item>{loanDetail.loan_out.contactList&&loanDetail.loan_out.contactList[1].userName}&nbsp;&nbsp;{loanDetail.loan_out.contactList&&loanDetail.loan_out.contactList[1].mobile}</Item>
              </Col>
              <Col span={4}>
                <Item name='label'>第二联系人</Item>
              </Col>
              <Col span={8}>
                <Item>{loanDetail.loan_out.contactList&&loanDetail.loan_in.contactList[1].userName}&nbsp;&nbsp;{loanDetail.loan_out.contactList&&loanDetail.loan_in.contactList[1].mobile}</Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Item name='label'>借条详情</Item>
              </Col>
            </Row>

            <Row >
              <Col span={5}>
                <Item name='label'>借条编号</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.orderNo}</Item>
              </Col>
              <Col span={5}>
                <Item name='label'>借款金额</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.amount}</Item>
              </Col>
            </Row>
            
            <Row >
              <Col span={5}>
                <Item name='label'>状态</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.orderStatusS}</Item>
              </Col>
              <Col span={5}>
                <Item name='label'>年化利率</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.interestRate||0}</Item>
              </Col>
            </Row>

            
            <Row >
              <Col span={5}>
                <Item name='label'>借条类型</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.businessChildTypeT}</Item>
              </Col>
              <Col span={5}>
                <Item name='label'>借款时长</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.loanDays}</Item>
              </Col>
            </Row>
            
            <Row >
              <Col span={5}>
                <Item name='label'>借款类型</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.businessChildTypeS}</Item>
              </Col>
              <Col span={5}>
                <Item name='label'>借款日期</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.loanDateStartT}</Item>
              </Col>
            </Row>
            
            <Row >
              <Col span={5}>
                <Item name='label'>距还款日天数</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.repayDay }</Item>
              </Col>
              <Col span={5}>
                <Item name='label'>生成日期</Item>
              </Col>
              <Col span={7}>
                <Item>{loanDetail.order.createDateT}</Item>
              </Col>
            </Row>
            
            <Row >
              <Col span={12}>
                <Item name='plus'></Item>
              </Col>
              
              <Col span={12}>
                <Row>
                  <Col span={10}><Item name='label'>约定还款日期</Item></Col>
                  <Col span={14}><Item>{loanDetail.order.loanDateEndT||''}</Item></Col>
                </Row>
                <Row>
                  <Col span={10}><Item name='label'>实际还款日期</Item></Col>
                  <Col span={14}><Item>{loanDetail.order.confirmDateT||''}</Item></Col>
                </Row>
              </Col>
            </Row>
          </header>
        </main>
        }
      </Layout>
    )
  }
  componentDidMount(){
    this.props._getLoanDetail(this.props.match.params.orderNo)
  }
}

const mapStateToProps = (state) => (
  {
    loanDetail: state.loanDetail
  }
)

const mapDispatchToProps=(dispatch)=>(
  {
    _getLoanDetail(orderNo){
      
        _getLoanDetail(dispatch,orderNo)
    },
    _toUser(phone){
      dispatch({
        type:'change_phone',
        phone
      })
      location.href='#/user'
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
  paddingRight:'15px',
  display:'flex',
  alignItems:'center',
  fontSize:'14px',
  color:'#009688',
  height:'38px',
  margin:0,
  border:'0.5px solid #dedede',
  '.label':{
    color:'#333'
  },
  '.plus':{
    height:'76px'
  },
  '.space':{
    justifyContent:'space-between'
  },
  '.nb':{
    border:'none'
  },
  '.vertical':{
    flexDirection:'column',
    alignItems:'flex-start',
  }
})

const table=cxs({
  paddingTop:'15px'
})