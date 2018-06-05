import {
  combineReducers
} from 'redux';

import information from './information'
import home from './home'
import user from './user'
import record from './record'
import bank from './bank'
import loanDetail from './loanDetail'
import loanList from './loanList';
import roleList from './roleList'
import powerGroup from './powerGroup'
import status from './status'
import menu from './menu'

export default combineReducers({
  information,
  home,
  user,
  record,
  bank,
  loanDetail,
  loanList,
  roleList,
  powerGroup,
  status,
  menu,
})