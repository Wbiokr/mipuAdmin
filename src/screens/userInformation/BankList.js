import cxs from 'cxs'

import { connect } from 'react-redux'

import { _getBank } from '../../redux/actions/'


const {
  Layout, Col, Row, Input, Button, Table, notification
} = antd

const Item = (props) => <p className={props.name + ' ' + item}>{props.children}</p>

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: '手机号码', dataIndex: 'mobile', key: 'mobile' },
        { title: '账号姓名', dataIndex: 'name', key: 'name' },
        { title: '银行名称', dataIndex: 'bankName', key: 'bankName' },
        {
          title: '证件号码', dataIndex: 'idCard', key: 'idCard', 
        },
        { title: '银行编号', dataIndex: 'bankType', key: 'bankType' },
        { title: '银行卡号', dataIndex: 'accountNumber', key: 'accountNumber' },
        {
          title: '是否支付', dataIndex: 'pay', key: 'pay', render() {
            return <span>是</span>
          }
        },
        { title: '绑卡时间', dataIndex: 'createDateF', key: 'createDateF' },
        { title: '最后支付', dataIndex: 'lastPayTimeF', key: 'lastPayTimeF' },
        { title: '是否解绑', dataIndex: 'unbindS', key: 'unbindS' },
        
      ]
    }
  }
  render() {
    return (
      <Layout>
        <header>
          <Row className={title}>
            <Col span={24}>
              <span>用户银行卡信息列表</span>
              &nbsp;&nbsp;&nbsp;
              <a href="#/user">返回</a>
            </Col>
          </Row>
          <Row style={{ height: '30px' }}></Row>

        </header>
        <main className={table}>
          {
            this.props.record.hasRecord ? <Table
              columns={this.state.columns}
              dataSource={this.props.record.data}
            /> : null
          }
        </main>
      </Layout>
    )
  }
  componentDidMount() {
    this.props._getBank(this.props.match.params.userId)
  }
}

const mapStateToProps = (state) => (
  {
    record: state.bank
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    _getBank(id) {
      _getBank(dispatch, id)
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Search)

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

const table = cxs({
  paddingTop: '15px'
})