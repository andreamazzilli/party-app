import { mergeMap } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { ofType } from 'redux-observable'

const USER_LOGGED_IN = action$ => action$.pipe(
  ofType( 'USER_LOGGED_IN' ),
  mergeMap( action => (
    concat(
      of( { type: 'USER_SET_EMAIL', payload: action.payload.payload } ),
      of( { type: 'USER_SET_TOKEN', payload: action.payload } )
    )
  ))
)

export default {
  USER_LOGGED_IN
}
