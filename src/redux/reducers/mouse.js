import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  left: 0,
  top: 0,
  event: null
})

const setPosition = ( state, payload ) => {
  const { left, top } = payload
  return state
  .set( 'left', left ).set( 'top', top )
}
const setClick = state => {
  return state
  .set( 'event', 'click' )
}
const reset = state => {
  return state
  .set( 'event', null )
}

export default ( state = initialState, action ) => {
  switch( action.type ){
    case "MOUSE_SET_POSITION":
      return setPosition( state, action.payload )
    case "MOUSE_SET_CLICK":
      return setClick( state )
    case "MOUSE_RESET":
      return reset( state )
    default:
      return state
  }
}
