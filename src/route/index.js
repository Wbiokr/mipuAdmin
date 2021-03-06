import {
  AnimatedSwitch,
  AnimatedRoute,
  spring
} from 'react-router-transition';

import NavBar from './Nav';
import cxs from 'cxs'
import Routes from './Routes'


import {
  Route,
  HashRouter,
} from 'react-router-dom';


export default class Router extends React.Component {
  render() {
    return (
      <HashRouter basename='/'>
        <Route render={({ location }) => (
          <div className={rule} >
            <AnimatedSwitch
              className={`content ${content}`}
              atEnter={{
                offset: 100,
                opc:0,
              }}
              atLeave={{
                offset: glide(-100),
                opc:0,
              }}
              atActive={{
                offset: glide(0),
                opc:1,
              }}
              runOnMount={location.pathname === '/'}
              mapStyles={styles => ({
                transform: `translateX(${styles.offset}%) `,
              })}
            >
                {
                  Routes.map((item,index)=>(
                    <Route path={item.path} exact={item.exact} component={item.component} key={index} />
                  ))
                }
            </AnimatedSwitch>
            <AnimatedRoute
              className={`navigator ${header}`}
              path='/:any'
              component={NavBar}
              atEnter={{ offset: -100 }}
              atLeave={{ offset: -150 }}
              atActive={{ offset: 0 }}
              mapStyles={(styles) => {
                return {
                  transform: `translateY(${styles.offset}%)`
                }
              }}
            />
          
          </div>
        )} />
      </HashRouter>
    )
  }
  
}


function glide(val) {
  return spring(
    val,
    {
      stiffness: 174,
      damping: 24
    }
  )
}



const rule = cxs({
  height: '100%',
  width: '100%',
})

const content = cxs({
  height: '100%',
  width: '100%',
  ' >div': {
    position: 'fixed',
    // zIndex: 1,
    height: ' calc( 100% - 0px )',
    width: '100%',
    top: 0,
    left: 0,
    ' >div':{
      paddingTop:'70px',
    }
  }
})

const header = cxs({
  // height: '100%',
  // width: '100%',
  ' >div': {
    position: 'fixed',
    // zIndex: 100,
    // height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  }
})
