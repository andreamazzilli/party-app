import { map, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import * as audio from '../../helpers/play'

const GAMES_PRELOAD_RESOURCES = ( action$, store ) => action$.pipe(
  ofType( 'GAMES_PRELOAD_RESOURCES' ),
  tap( action => {
    const host = window.location.href.replace('/index.html','')
    return store.value.games.toJS().map( el => {
      return el.songs.map( song => {
        audio.preloadSong( host + song.url, () => { action.payload.dispatch( {
          type: 'PLAY_SONG_PRELOAD_COMPLETE',
          payload: host + song.url
        }) } )
        return song.url
      })
    })
  }),
  map( res => {
    return {
      type: "GAMES_PRELOAD_RESOURCES_DONE"
    }
  })
)

export default {
  GAMES_PRELOAD_RESOURCES
}
