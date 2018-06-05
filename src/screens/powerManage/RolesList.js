import cxs from 'cxs'

import { connect } from 'react-redux'

import { _getRoleList } from '../../redux/actions/'


const {
  Layout, Col, Row, Input, Button,Table
} = antd

const Item=(props)=><p className={props.name+' '+item}>{props.children}</p>

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state={
      key:this.props.role.key,
      columns:[
        {title:'编号',dataIndex:'id'},
        {title:'用户名',dataIndex:'loginName'},
        {title:'权限组',dataIndex:'name'},
        {title:'状态',dataIndex:'statusS'},
        {title:'添加时间',dataIndex:'createDateT'},
        {title:'操作',dataIndex:'handle',key:'hanlde',render: (text,record,index) => {return <a href={`#/power/roleList/edit/${record.id}/${record.loginName}/${record.status}`}>编辑</a>},},
      ]
    }
  }
  render() {
    return (
      <Layout>
        <header>
          <Row className={title}>
            <Col span={24}>
              <span>后台角色</span>
            </Col>
          </Row>
          <Row style={{ height: '30px' }}></Row>
          <Row className={wrapper} style={{ width: '100%' }}>
            <Col span={12}>
            <Input defaultValue={this.state.key} maxLength={11}  placeholder='请输入关键字' onChange={(e)=>{
              this.setState({
                key:e.target.value
              }) 
            }}
            onPressEnter={()=>{this.props._search(this.state.key)}}/>
            </Col>
            <Col span={2}>
            </Col>
            <Col span={4}>
              <Button type='primary' className={btn} onClick={()=>{this.props._search(this.state.key)}}>查 询</Button>
            </Col>
            <Col span={1}>
            </Col>
            <Col span={4}>
              <Button type='default' className={btn} onClick={()=>{this.props.history.push('/power/roleList/add')}}>新 增</Button>
            </Col>
          </Row>
        </header>
        <main className={[content]} >
          <main className={table}>
            <Table 
              columns={this.state.columns}
              dataSource={this.props.role.data}
            />
          </main>
        </main>
      </Layout>
    )
  }
  componentDidMount(){
    this.props._search(this.state.key)
  }
  
}

const mapStateToProps = (state) => (
  {
    role: state.roleList
  }
)

const mapDispatchToProps=(dispatch)=>(
  {
    _search(key){
      _getRoleList(dispatch,key)
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