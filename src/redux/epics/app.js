import { mergeMap, tap, map } from 'rxjs/operators'
import { from, concat, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { Ajax } from '../../helpers'

const get$ = ( url, actionType ) => (
  from(
    Ajax({
      url,
      method: 'GET'
    })
    .then( res => {
      if ( actionType ) {
        return { type: actionType, payload: { url, content: res } }
      } else {
        return { type: `get > ${ url }`, payload: { url, content: res } }
      }
    })
    .catch( err => {
      return {
        type: 'GET_ERROR',
        payload: err
      }
    })
  )
)

const APP_INIT = action$ => action$.pipe(
  ofType( 'APP_INIT' ),
  /* mergeMap( () => (
    concat(
      get$( 'https://reqres.in/api/users?page=2' ), // get a json from external api
      get$( '/favicon.ico' ), // get a resource file from localhost
      of({ type: 'APP_READY' })
    )
  )) */
  map( action => ({
    type: "GAMES_PRELOAD_RESOURCES",
    payload: action.payload
  }))
)

const APP_LINK = ( action$, store ) => action$.pipe(
  ofType( 'APP_LINK' ),
  tap( action => {
    if ( typeof action.payload.callback === 'function' ) {
      action.payload.callback() 
    }
  }),
  mergeMap( action => {
    if ( store.value.spy.get( 'recording' ) ) {
      return concat(
        of({
          type: 'SPY_ADD_USER_EVENT',
          payload: { 
            event: 'action', 
            actionType: 'APP_CHANGE_ROUTE', 
            actionPayload: action.payload.url, 
            callback: action.payload.callback 
          }
        }),
        of({ type: 'APP_CHANGE_ROUTE', payload: action.payload.url })
      )
    } else {
      return of({ type: 'APP_CHANGE_ROUTE', payload: action.payload.url })
    }
  })
)

export default {
  APP_INIT,
  APP_LINK
}
