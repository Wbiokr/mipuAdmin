import {
  AnimatedSwitch,
  AnimatedRoute,
  spring
} from 'react-router-transition';

// import NavBar from './Nav';
import cxs from 'cxs'
import Routes from './Routes'

import { connect } from 'react-redux'

import { _login, _logout, _editPass,_getAllEnable } from '../redux/actions/index'
import Update from '../screens/login/editPassword'

import {
  Route,
  HashRouter,
} from 'react-router-dom';

const { Layout, Menu, Icon, Switch, Dropdown } = antd;
const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;

class LayoutApp extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline',
    theme: 'dark',
    update:false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout style={styles.wrapper}>
        <Header theme='dark' style={styles.header}>
          <section className={left}>
            <span className={title}>米铺管理后台</span>
            <Icon
              className={icon}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{ color: '#fff' }}
            />
            <Switch onChange={this.changeMode} className={[icon, sth]} />
            <Icon
              className={[home, icon]}
              type='home'
              onClick={this.toHome}
              style={{ color: '#fff' }}
            />
          </section>
          <section className={[right]}>
            <Dropdown overlay={
              <Menu >
                <Menu.Item key="1" onClick={this.logout}>修改密码</Menu.Item>
                <Menu.Item key="2" onClick={this.props._logout}>退出登录</Menu.Item>
              </Menu>
            }>
              <span className="ant-dropdown-link" href="#">
                <Icon type="github" />&nbsp;&nbsp;&nbsp;{this.props.information.realName} <Icon type="down" />
              </span>
            </Dropdown>
          </section>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Menu
              style={{ width: '100%' }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode={this.state.mode}
              theme={this.state.theme}
            >
              <Menu.Item key="1">
                
                <a href="#/"><Icon type="home" />首页</a>
              </Menu.Item>
              <SubMenu key="sub1" title={<span><Icon type="setting" /><span>用户资料</span></span>}>
                <Menu.Item key="2"><a href="#/user">用户查询</a></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>借款列表</span></span>}>
                <Menu.Item key="3"><a href="#/loan">借款列表</a></Menu.Item>
              </SubMenu>
              {
                // <SubMenu key="sub3" title={<span><Icon type="setting" /><span>权限管理</span></span>}>
                //   <Menu.Item key="4"><a href="#/power/roleList/list">后台角色</a></Menu.Item>
                //   <Menu.Item key="5"><a href="#/power/roleGroup/group">权限组管理</a></Menu.Item>
                //   <Menu.Item key="6"><a href="#/power/powerItems">权限管理</a></Menu.Item>
                // </SubMenu>
              }
            </Menu>
          </Sider>
          <Content>
            
            {
              this.state.update?<Update cancel={()=>{
                this.setState({update:false})
              }}/>:<HashRouter basename='/'>
              <div>
                {
                  Routes.map((item, index) => (
                    <Route path={item.path} exact={item.exact} component={item.component} key={index} />
                  ))
                }
              </div>
            </HashRouter>
            }
          </Content>
          
        </Layout>
      </Layout>
    )
  }
  
  componentDidMount() {
    sessionStorage && sessionStorage.loginInfor && (()=>{
      
      this.props._login(JSON.parse(sessionStorage.loginInfor).infor)
      this.props._getAllEnable(JSON.parse(sessionStorage.loginInfor).infor.id)
    })()
  }
  changeMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    });
  }
  toHome() {
    location.href = '#/'
  }
  logout=()=>{
    this.setState({
      update:true
    })
  }
};



const mapStateToProps = (state) => (
  {
    information: state.information.infor
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    _login(payload) {
      _login(dispatch, payload)
    },
    _logout(){
      _logout(dispatch)
    },
    _getAllEnable(pid){
      _getAllEnable(dispatch,pid)
    }

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(LayoutApp)

const styles = {
  wrapper: {
    'min-height': '100%'
  },
  header: {
    padding: '0 0',
    display: 'flex',

  }
}
const icon = cxs({
  'font-size': '20px',
  ':hover': {
    color: '#1890ff!important',
    transform: 'scale(1.1)',
  }
})
const home = cxs({
  'margin-left': '40px'
})
const sth = cxs({
  'margin-left': '30px',
  'color': '#fff',
  background: '#666',
  'margin-top': '-5px',
  '.ant-switch-checked': {
    background: '#1890ff'
  }
})
const title = cxs({
  color: '#dedede',
  opacity: '0.8',
  fontSize: '16px',
  fontFamily: 'Microsofy Yahei',
  marginTop: '-6px',
  padding: '0 20px'
})
const left = cxs({
  flex: '1',
  height: '100%',
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
})
const right = cxs({
  flex: '1',
  // display:'flex',
  // alignItems:'center',
  // justifyContent:'right',
  textAlign: 'right',
  paddingRight: '50px',

  ' span': {
    color: '#fff',
    ':hover': {
      color: 'lightblue'
    },
  }
})