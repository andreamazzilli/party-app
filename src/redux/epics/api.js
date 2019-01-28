import { switchMap, takeUntil } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { get$, post$ } from '../../helpers'

const API_GET = action$ => action$.pipe(
  ofType( 'API_GET' ),
  switchMap( action => (
    get$({
      url: action.payload.url,
      actions: action.payload.actions
    })
    .pipe(
      takeUntil( action$.ofType( 'API_STOP_ALL' ) )
    )
  ))
)

const API_POST = action$ => action$.pipe(
  ofType( 'API_POST' ),
  switchMap( action => (
    post$({
      url: action.payload.url,
      body: action.payload.body,
      actions: action.payload.actions
    })
    .pipe(
      takeUntil( action$.ofType( 'API_STOP_ALL' ) )
    )
  ))
)

export default {
  API_GET,
  API_POST
}
