import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  email: null,
  token: null
})

const setToken = ( state, payload ) => (
  state.set( 'token', payload.res.token )
)
const setEmail = ( state, payload ) => (
  state.set( 'email', payload )
)
const loggedOut = state => (
  state.set( 'email', null ).set( 'token', null )
)

export default ( state = initialState, action ) => {
  switch( action.type ){
    case "USER_SET_TOKEN":
      return setToken( state, action.payload )
    case "USER_SET_EMAIL":
      return setEmail( state, action.payload )
    case "USER_LOGGED_OUT":
      return loggedOut( state )
    default:
      return state
  }
}
