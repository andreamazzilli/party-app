import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  status: null,
  route: '/',
  auth: false
})

const ready = state => (
  state
  .set( 'status', 'ready' )
)
const changeRoute = ( state, url ) => (
  state
  .set( 'route', url )
)
const setAuth = ( state, payload ) => (
  state
  .set( 'auth', payload )
)

export default ( state = initialState, action ) => {
  switch( action.type ){
    case "APP_CHANGE_ROUTE":
      return changeRoute( state, action.payload )
    case "APP_READY":
      return ready( state )
    case "APP_SET_AUTH":
      return setAuth( state, action.payload )
    default:
      return state
  }
}
