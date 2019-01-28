import { from } from 'rxjs'

export const format = (input) => {
  return `format: ${input}`
}

export const isIE = () => {
  return  navigator.userAgent.indexOf( "MSIE" ) !== -1 ||
          navigator.userAgent.indexOf( "Windows" ) !== -1
}

export const Ajax = payload => {
  const { url, method, headers, body } = payload
  return new Promise( ( resolve, reject ) => {
    const xhr = new XMLHttpRequest()
    xhr.open( method, url, true )
    if ( headers ) {
      Object.keys( headers ).forEach( key => {
        xhr.setRequestHeader( key, headers[ key ] )
      } )
    }
    xhr.onload = function () {
      if ( this.status >= 200 && this.status < 300 ) {
        resolve( xhr.response )
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        })
      }
    }
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      })
    }
    xhr.send( JSON.stringify( body ) )
  })
}

export const get$ = payload => {
  const { url, actions } = payload
  return from(
    Ajax({
      url,
      method: 'GET'
    })
    .then( res => {
      res = JSON.parse( res )
      if ( res.status === 'success' ) {
        return { type: actions.success, payload: { payload: actions.success.payload, res } }
      } else {
        return { type: actions.error, payload: { url, content: res } }
      }
    })
    .catch( err => {
      return {
        type: 'GET_ERROR',
        payload: err
      }
    })
  )
}

export const post$ = payload => {
  const { url, body, actions } = payload
  return from(
    Ajax({
      url,
      method: 'POST',
      body,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then( res => {
      res = JSON.parse( res )
      if ( res.status === 'success' ) {
        return { type: actions.success.type, payload: { payload: actions.success.payload, res } }
      } else {
        return { type: actions.error, payload: { url, content: res } }
      }
    })
    .catch( err => {
      return {
        type: 'POST_ERROR',
        payload: err
      }
    })
  )
}