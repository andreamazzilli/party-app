import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  serverUrl: 'http://localhost:5000'
})

const setServerUrl = ( state, payload ) => (
  state
  .set( 'serverUrl', payload )
)

export default ( state = initialState, action ) => {
  switch( action.type ){
    case "API_SET_SERVER_URL":
      return setServerUrl( state, action.payload )
    default:
      return state
  }
}
