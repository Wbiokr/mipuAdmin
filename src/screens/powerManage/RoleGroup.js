import cxs from 'cxs'

import { connect } from 'react-redux'

import { _getRoleGroup } from '../../redux/actions/'


const {
  Layout, Col, Row, Input, Button,Table
} = antd

const Item=(props)=><p className={props.name+' '+item}>{props.children}</p>

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state={
      columns:[
        {title:'编号',dataIndex:'id'},
        {title:'权限组名称',dataIndex:'name'},
        {title:'权限组描述',dataIndex:'name'},
        {title:'状态',dataIndex:'statusS'},
        {title:'操作',dataIndex:'handle',key:'hanlde',render: (text,record,index) => {return <a href={`#/power/roleGroup/edit/${record.id}/${record.loginName}/${record.status}`}>编辑</a>},},
      ]
    }
  }
  render() {
    return (
      <Layout>
        <header>
          <Row className={title}>
            <Col span={24}>
              <span>权限组管理</span>
            </Col>
          </Row>
          <Row style={{ height: '30px' }}></Row>
          <Row className={wrapper} style={{ width: '100%' }}>
            
            <Col span={3}>
              <Button type='primary' className={btn} onClick={()=>{this.props.history.push('/power/roleGroup/add')}}>新 增</Button>
            </Col>
          </Row>
        </header>
        <main className={[content]} >
          <main className={table}>
            <Table 
              columns={this.state.columns}
              dataSource={this.props.group.data}
            />
          </main>
        </main>
      </Layout>
    )
  }
  componentDidMount(){
    this.props._search()
  }
  
}

const mapStateToProps = (state) => (
  {
    group: state.powerGroup
  }
)

const mapDispatchToProps=(dispatch)=>(
  {
    _search(){
      _getRoleGroup(dispatch)
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
  // border:'1px solid #ccc'
})


const table=cxs({
  paddingTop:'15px'
})