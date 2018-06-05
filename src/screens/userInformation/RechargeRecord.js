import cxs from 'cxs'

import { connect } from 'react-redux'

import { _getRecord } from '../../redux/actions/'

import Fetch from '../../utils/fetch'

// import { formatDate } from '../../utils/format';

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
        { title: '订单号', dataIndex: 'payOffOrderId', key: 'payOffOrderId' },
        { title: '金额', dataIndex: 'amount', key: 'amount' },
        { title: '状态', dataIndex: 'status', key: 'status' },
        {
          title: '来源', dataIndex: 'from', key: 'from', render() {
            return <span>银行卡</span>
          }
        },
        { title: '下单时间', dataIndex: 'createDateT', key: 'createDate' },
        {
          title: '支付', dataIndex: 'pay', key: 'pay', render() {
            return <span>连连</span>
          }
        },
      ]
    }
  }
  render() {
    return (
      <Layout>
        <header>
          <Row className={title}>
            <Col span={24}>
              <span>充值记录</span>
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
    this.props._getRecord(this.props.match.params.userId)
  }
}

const mapStateToProps = (state) => (
  {
    record: state.record
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    _getRecord(id) {
      _getRecord(dispatch, id)
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