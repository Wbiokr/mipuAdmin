
import {
  connect
} from 'react-redux';
import cxs from 'cxs';

import {_getIndex} from '../../redux/actions/index'

const {
  Col,Row,Span
} = antd


const Item=props=><p style={{height:props.h}} className={item}>{props.children}</p>
const Data=props=><span style={{color:'#009688'}}>&nbsp;&nbsp;{props.num}</span>

class Home extends React.Component{
  render(){
    let orders={};
    let all=0;
    const {orderList}=this.props.home;
    orderList.forEach((item,i)=>{
      const key = `stu_${item['status']}`;
      const value=`${item['number']}`;
      orders[key]=value;
      all+=Number(value)
    })
    return(
      <Row className={wrapper}>
        <Row>
          <Col span={24}>
            <Item>
              数据统计
              &nbsp;&nbsp;
              <a href="javascript:void(0);" onClick={this.props._getIndex}>刷新</a>
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Item>
              注册用户数:<Data num={this.props.home.totalUser} />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Item h='80px'>
              充值，余额<br />
              (1元=1米币)
            </Item>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={24}>
                  <Item>
                    充值金额:<Data num={this.props.home.rechargeAmount+'米币'}/>
                  </Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Item>
                  账户余额:<Data num={this.props.home.accountAmount+'米币'} />
                </Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Item h='200px'>借条数据</Item>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={24}><Item>全部:<Data num={all}/></Item></Col>
            </Row>
            <Row>
              <Col span={12}><Item>未生效:<Data num={orders['stu_0']||0}/></Item></Col>
              <Col span={12}><Item>生效中:<Data num={orders['stu_1']||0}/></Item></Col>
            </Row>
            <Row>
              <Col span={12}><Item>已完成:<Data num={orders['stu_2']||0}/></Item></Col>
              <Col span={12}><Item>逾期中:<Data num={orders['stu_3']||0} /></Item></Col>
            </Row>
            <Row>
              <Col span={12}><Item>手动关闭:<Data num={orders['stu_4']||0} /></Item></Col>
              <Col span={12}><Item>已驳回:<Data num={orders['stu_5']||0}/></Item></Col>
            </Row>
            <Row>
              <Col span={12}><Item>逾期结清:<Data num={orders['stu_6']||0} /></Item></Col>
              <Col span={12}><Item>系统关闭:<Data num={orders['stu_7']||0} /></Item></Col>
            </Row>
          </Col>
        </Row>
      </Row>
    )
  }
  componentDidMount(){
    this.props._getIndex()
  }
}

const mapStateToProps=(state)=>{
  return {
    home:state.home
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    _getIndex:()=>{
      _getIndex(dispatch)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

const wrapper=cxs({
  // background:'#fff',
  border:'2px solid #ccc',
  // 'box-shadow':'0 0 10px -2px rgba(0,0,0,.7)',
  margin:'80px auto',
  width:'80%',

  // ' .ant-row':{
  //   borderTop:'1px solid #dedede',
  //   ' >div':{
  //     borderRight:'1px solid #dedede',
  //     // padding:'10px 0',
  //     // height:'100%'
  //   }
  // }
})

const item=cxs({
  height:'40px',
  margin:0,
  borderRight:'1px solid #dedede',
  borderTop:'1px solid #dedede',
  display:'flex',
  alignItems:'center',
  paddingLeft:'20px',
  fontSize:'16px',
  transition:'all ease 0.3s',
  ':hover':{
    background:'#eee',
    color:'#333',
  }
})