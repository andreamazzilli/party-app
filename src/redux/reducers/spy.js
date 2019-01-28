import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  startTime: null,
  timeline: [],
  timelineCursor: 0,
  playerTime: 0,
  recording: false,
  playing: false,
  delay: 50
})

const addUserEvent = ( state, payload ) => {
  const { event, x ,y, w, h, actionType, actionPayload, callback } = payload
  let timeline = state.get('timeline').toJS()
  timeline.push( { time: new Date().getTime() - state.get( 'startTime' ), event, x, y, w, h, actionType, actionPayload, callback } )
  return state.set( 'timeline', Immutable.fromJS( timeline ) )
}
const startRecording = state => (
  state.set( 'recording', true ).set( 'startTime', new Date().getTime() )
)
const stopRecording = state => (
  state.set( 'recording', false )
)
const startPlaying = state => (
  state.set( 'playing', true )
)
const stopPlaying = state => (
  state.set( 'playing', false )
)
const increasePlayerTime = ( state, payload ) => (
  state.set( 'playerTime', state.get( 'playerTime' ) + payload )
)
const increaseTimelineCursor = state => (
  state.set( 'timelineCursor', state.get( 'timelineCursor' ) + 1 )
)
const resetPlayer = state => (
  state.set( 'timelineCursor', 0 )
        .set( 'playerTime', 0 )
)

export default ( state = initialState, action ) => {
  switch( action.type ) {
    case "SPY_ADD_USER_EVENT":
      return addUserEvent( state, action.payload )
    case "SPY_START_RECORDING":
      return startRecording( state )
    case "SPY_STOP_RECORDING":
      return stopRecording( state )
    case "SPY_START_PLAYING":
      return startPlaying( state )
    case "SPY_STOP_PLAYING":
      return stopPlaying( state )
    case "SPY_INCREASE_TIMELINE_CURSOR":
      return increaseTimelineCursor( state )
    case "SPY_INCREASE_PLAYER_TIME":
      return increasePlayerTime( state, action.payload )
    case "SPY_RESET_PLAYER":
      return resetPlayer( state )
    default:
      return state
  }
}
