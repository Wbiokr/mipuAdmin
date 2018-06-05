import {Provider} from 'react-redux';
import Index from './route/app';
import Login from './Login'
import store from './redux/';


import './normalize.styl'

let App=Login;

sessionStorage&&!!sessionStorage.loginInfor&&(
  ()=>{
    App=Index
  }
)()


const render=()=>{
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#root')
  )
}

render()

let unsubscribe=store.subscribe(()=>{
  render()
});
unsubscribe();