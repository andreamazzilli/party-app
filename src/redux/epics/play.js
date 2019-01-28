import { map, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import * as audio from '../../helpers/play'

const PLAY_SONG = ( action$, store ) => action$.pipe(
  ofType( 'PLAY_SONG' ),
  map( action => {
    const currentSong = store.value.play.get('playing')
    if ( currentSong ) {
      audio.stopSong( currentSong )
    }
    if ( currentSong !== action.payload ) {
      audio.playSong( action.payload )
      return {
        type: "PLAY_SONG_SET_CURRENT",
        payload: action.payload
      }
    } else {
      return {
        type: "PLAY_SONG_SET_CURRENT",
        payload: ''
      }
    }
  })
)

export default {
  PLAY_SONG
}
