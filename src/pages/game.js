import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import { Button } from '../components/buttons'

class Game extends Component {
  _playSong = song => {
    this.props.fire( 'PLAY_SONG', song )
  }
  render() {
    const { preloadedSongs } = this.props
    const game = this.props.match.params.game
    let color
    let songs = []
    this.props.games.toJS().forEach( el => {
      if ( el.id === game ) {
        color = el.color
        songs = el.songs
      }
    })
    const totalSongs = songs.length
    return (
      <div className="page page--root h-100 d-flex flex-column justify-content-center align-items-center flex-wrap">
        <div className="h-100 w-50">
          
        </div>
        <div className="h-100 w-50 d-flex flex-column justify-content-center align-items-center">
          {
            songs.map( el => {
              if ( preloadedSongs[ el.url ] ) {
                return (
                  <Button key={ el.name } onClick={ () => { this._playSong( el.url ) } } color={ color } classes={`w-100 h-${ 100 / totalSongs }`}>
                    { el.name }
                  </Button>
                )
              } else {
                return (
                  <Button key={ el.name } color="grey" classes={`w-100 h-${ 100 / totalSongs }`}>
                    loading...
                  </Button>
                )
              }
            })
          }
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    app: state.app,
    games: state.games,
    preloadedSongs: state.play.get( 'preloadedSongs' ).toJS()
  }
}

const mapDispatch = (dispatch) => {
  return {
      fire: (action, payload) => {
        dispatch(actions(action, payload))
      }
  }
}
export default connect( mapState, mapDispatch )( Game )

