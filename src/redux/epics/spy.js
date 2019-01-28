import { map, mergeMap, switchMap, throttleTime, takeUntil, delay } from 'rxjs/operators'
import { fromEvent, interval, of, concat } from 'rxjs'
import { ofType } from 'redux-observable'

const SPY_WATCH_MOUSE_MOVE = ( action$, store ) => action$.pipe(
  ofType( 'SPY_WATCH_MOUSE_MOVE' ),
  switchMap( () => (
    fromEvent( document, 'mousemove' )
      .pipe(
        takeUntil( action$.ofType( 'SPY_WATCH_STOP' ) )
      )
  )),
  throttleTime( store.value.spy.get( 'delay' ) ),
  map( e => ({
    type: 'SPY_ADD_USER_EVENT', 
    payload: {
      event: 'move',
      x: e.pageX,
      y: e.pageY
    }
  }))
)

const SPY_WATCH_MOUSE_CLICK = action$ => action$.pipe(
  ofType( 'SPY_WATCH_MOUSE_CLICK' ),
  switchMap( () => (
    fromEvent( document, 'click' )
      .pipe(
        takeUntil( action$.ofType( 'SPY_WATCH_STOP' ) )
      )
  )),
  map( e => ({
    type: 'SPY_ADD_USER_EVENT', 
    payload: {
      event: 'click',
      x: e.pageX,
      y: e.pageY
    }
  }))
)

const SPY_WATCH_SCREEN_SIZE = ( action$, store ) => action$.pipe(
  ofType( 'SPY_WATCH_SCREEN_SIZE' ),
  switchMap( () => (
    fromEvent( window, 'resize' )
      .pipe(
        takeUntil( action$.ofType( 'SPY_WATCH_STOP' ) )
      )
  )),
  throttleTime( store.value.spy.get( 'delay' ) ),
  map( () => ({
    type: 'SPY_ADD_USER_EVENT', 
    payload: {
      event: 'resize',
      w: window.innerWidth,
      h: window.innerHeight
    }
  }))
)

const SPY_START_PLAYING = ( action$, store ) => action$.pipe(
  ofType( 'SPY_START_PLAYING' ),
  switchMap( () => (
    interval( store.value.spy.get( 'delay' ) )
      .pipe(
        takeUntil( action$.ofType( 'SPY_STOP_PLAYING' ) )
      )
  )),
  mergeMap( () => {
    const time = store.value.spy.get( 'playerTime' )
    const index = store.value.spy.get( 'timelineCursor' )
    const nextEvent = store.value.spy.get( 'timeline' ).toJS()[ index ]
    if ( !nextEvent ) {
      return concat(
        of({ type: 'SPY_STOP_PLAYING' }),
        of({ type: 'SPY_RESET_PLAYER' })
      )
    } else {
      if ( time >= nextEvent.time ) {
        return concat(
          of({ type: 'SPY_PREVIEW_EVENT', payload: nextEvent }),
          of({ type: 'SPY_INCREASE_TIMELINE_CURSOR' })
        )
      } else {
        return of({
          type: 'SPY_INCREASE_PLAYER_TIME',
          payload: store.value.spy.get( 'delay' )
        })
      }
    }
  })
)

const SPY_PREVIEW_EVENT = ( action$, store ) => action$.pipe(
  ofType( 'SPY_PREVIEW_EVENT' ),
  map( action => {
    switch( action.payload.event ) {
      case"move":
        return { 
          type: 'MOUSE_SET_POSITION',
          payload: {
            left: action.payload.x,
            top: action.payload.y,
          }
        }
      case"click":
        return { 
          type: 'MOUSE_SET_CLICK'
        }
      case"action":
        if ( typeof action.payload.callback === 'function' ) {
          setTimeout( action.payload.callback, store.value.spy.get( 'delay' ) + 150 )
        }
        return {
          type: action.payload.actionType,
          payload: action.payload.actionPayload 
        }
      default:
        return { type: '' }
    }
    
  })
)

const MOUSE_SET_CLICK = action$ => action$.pipe(
  ofType( 'MOUSE_SET_CLICK' ),
  delay( 50 ),
  map( () => {
    return { type: 'MOUSE_RESET' }
    })
  )

const SPY_START_RECORDING = action$ => action$.pipe(
  ofType( 'SPY_START_RECORDING' ),
  mergeMap( () => (
    concat(
      of({ type: 'SPY_WATCH_MOUSE_MOVE' }),
      of({ type: 'SPY_WATCH_MOUSE_CLICK' }),
      of({ type: 'SPY_WATCH_SCREEN_SIZE' })
    )
  ))
)

const SPY_STOP_RECORDING = action$ => action$.pipe(
  ofType( 'SPY_STOP_RECORDING' ),
  map( () => (
    { type: 'SPY_WATCH_STOP' }
  ))
)

export default {
  SPY_WATCH_MOUSE_MOVE,
  SPY_WATCH_SCREEN_SIZE,
  SPY_WATCH_MOUSE_CLICK,
  SPY_START_PLAYING,
  SPY_START_RECORDING,
  SPY_STOP_RECORDING,
  SPY_PREVIEW_EVENT,
  MOUSE_SET_CLICK
}
