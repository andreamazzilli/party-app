import { Howl, Howler } from 'howler'
Howler.volume(1)

export const songs = {}

export const preloadSong = ( song, callback ) => {
  if ( !songs[ song ] ) {
    songs[ song ] = new Howl({ src: [ song ] })
    songs[ song ].once('load', callback )
  }
}
export const playSong = name => {
  songs[ name ].play()
}
export const stopSong = name => {
  songs[ name ].stop()
}