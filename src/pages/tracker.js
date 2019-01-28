import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import { ButtonSuccess, ButtonDanger } from '../components/buttons'

class PageTracker extends Component {
  _onClickRecord = () => {
    if ( !this.props.recording ) {
      this.props.fire( 'SPY_START_RECORDING' )
    } else {
      this.props.fire( 'SPY_STOP_RECORDING' )
    }
  }
  _onClickPlay = () => {
    if ( !this.props.playing ) {
      this.props.fire( 'SPY_START_PLAYING',this.props.timeline )
    } else {
      this.props.fire( 'SPY_STOP_PLAYING' )
    }
  }
  render() {
    return (
      <div className="page page--root h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 ">
              <div className="d-flex flex-column justify-content-center flex-wrap">
                <p className="text-center">
                  From this page you can record<br/>
                  and preview every user action!
                </p>
                {
                  this.props.recording
                  ? <ButtonDanger onClick={ this._onClickRecord }>Stop recording</ButtonDanger>
                  : <ButtonDanger onClick={ this._onClickRecord }>Start recording</ButtonDanger>
                }
                <br/>
                {
                  this.props.playing
                  ? <ButtonSuccess onClick={ this._onClickPlay }>Stop playing</ButtonSuccess>
                  : <ButtonSuccess onClick={ this._onClickPlay }>Start playing</ButtonSuccess>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    app: state.app,
    recording: state.spy.get('recording'),
    playing: state.spy.get('playing'),
    timeline: state.spy.get('timeline')
  }
}

const mapDispatch = (dispatch) => {
  return {
      fire: (action, payload) => {
        dispatch(actions(action, payload))
      }
  }
}
export default connect( mapState, mapDispatch )( PageTracker )

