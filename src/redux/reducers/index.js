import { combineReducers } from 'redux'
import app from './app'
import user from './user'
import api from './api'
import spy from './spy'
import mouse from './mouse'
import play from './play'
import games from './games'

const reducers = combineReducers({
  app,
  user,
  api,
  spy,
  mouse,
  play,
  games
})

export default reducers
