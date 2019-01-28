import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import reducers from '../reducers'
import epics from '../epics'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import * as audio from '../../helpers/play'

/* const spy = store => next => action => {
  if ( action.type === 'APP_INIT') {
    console.log(store.getState())
    store.dispatch({ type: 'test' })
  } 
  let result = next(action)
  console.log('next state', store.getState())
  return result
} */

const newEpics = Object.keys(epics).map(i => epics[i])
const epicsCompined = combineEpics(...newEpics)
const epicMiddleware = createEpicMiddleware()
var store

if (process.env.NODE_ENV === 'production') {
  store = createStore(
    reducers, 
    applyMiddleware( logger, epicMiddleware )
  )
} else {
  store = createStore(
    reducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware( logger, epicMiddleware )
  )
}
epicMiddleware.run(epicsCompined)

store.dispatch({type: 'APP_INIT', payload: store })

export default store
