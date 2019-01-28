import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  preloadedSongs: {},
  playing: ''
})

const songPreloadComplete = ( state, song ) => {
  const preloadedSongs = state.get( 'preloadedSongs' ).set( song, true )
  return state.set( 'preloadedSongs', preloadedSongs )
}
const songSetCurrent = ( state, song ) => {
  return state.set( 'playing', song )
}

export default ( state = initialState, action ) => {
  switch( action.type ){
    case "PLAY_SONG_PRELOAD_COMPLETE":
      return songPreloadComplete( state, action.payload )
    case "PLAY_SONG_SET_CURRENT":
      return songSetCurrent( state, action.payload )
    default:
      return state
  }
}
