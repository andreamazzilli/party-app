import { map, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import * as audio from '../../helpers/play'

const GAMES_PRELOAD_RESOURCES = ( action$, store ) => action$.pipe(
  ofType( 'GAMES_PRELOAD_RESOURCES' ),
  tap( action => {
    let path = window.location.pathname
    path === '/' ? path = '' : path = path
    console.log( path )
    return store.value.games.toJS().map( el => {
      return el.songs.map( song => {
        console.log( song.url )
        audio.preloadSong( path + song.url, () => { action.payload.dispatch( {
          type: 'PLAY_SONG_PRELOAD_COMPLETE',
          payload: path + song.url
        }) } )
        return path + song.url
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
