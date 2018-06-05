import cxs from 'cxs'

import { connect } from 'react-redux'

import { _getLoanList } from '../../redux/actions/'


const {
  Layout, Col, Row, Input, Button, Table
} = antd

const Item = (props) => <p className={props.name + ' ' + item}>{props.children}</p>

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: this.props.loan.mobile,
      columns: [
        { title: '借条编号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '借条类型', dataIndex: 'businessChildTypeT', key: 'businessChildType' },
        { title: '借条状态', dataIndex: 'orderStatusS', key: 'orderStatus' },
        { title: '创建时间', dataIndex: 'createDateT', key: 'orderRole' },
        { title: '借款人姓名', dataIndex: 'name' },
        { title: '借款人手机号', dataIndex: 'mobile' },
        { title: '借款金额(元)', dataIndex: 'amount' },
        { title: '借款时长(天)', dataIndex: 'loanDays' },
        { title: '借款日期', dataIndex: 'loanDateStartT' },
        { title: '操作', dataIndex: 'handle', key: 'hanlde', render: (text, record, index) => { return <a href={"#/loan/loanDetail/" + record.orderNo}>查看</a> }, },
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
              <Input defaultValue={this.props.loan.mobile} maxLength={11} placeholder='请输入手机号' onKeyup='value=value.replace(/[^\d]/g,"")' onChange={(e) => {
                e.target.value = e.target.value.replace(/[^\d]/g, '');
                this.setState({
                  mobile: e.target.value
                })
              }}
                onPressEnter={() => { this.props._search(this.state.mobile) }}
              />
            </Col>
            <Col span={1}>
            </Col>
            <Col span={4}>
              <Button type='primary' className={btn} onClick={() => { this.props._search(this.state.mobile) }}>查  询</Button>
            </Col>
          </Row>
        </header>
        <main className={[content]} >
          {
            this.props.loan.data.length > 0 ?
              <main className={table}>
                <Table
                  columns={this.state.columns}
                  dataSource={this.props.loan.data}
                />
              </main> :
              null
          }
        </main>
      </Layout>
    )
  }
  componentDidMount() {
    if (this.props.loan.mobile.length == 11) {
      this.props._search(this.props.loan.mobile)
    }
  }

}

const mapStateToProps = (state) => (
  {
    loan: state.loanList
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    _search(mobile) {
      if (mobile.length < 11) {
        antd.notification.warning({
          message: 'error',
          description: '请输入正确的手机号'
        })
      } else {
        _getLoanList(dispatch, mobile)
      }
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

const wrapper = cxs({
  padding: '0 20px'
})

const btn = cxs({
  width: '100%'
})

const content = cxs({
  margin: '20px 20px',
  // border:'1px solid #ccc'
})

const item = cxs({
  paddingLeft: '15px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  color: '#009688',
  height: '30px',
  margin: 0,
  border: '0.5px solid #dedede',
  '.label': {
    color: '#333'
  }
})

const table = cxs({
  paddingTop: '15px'
})