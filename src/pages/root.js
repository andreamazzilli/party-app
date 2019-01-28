import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import { Button } from '../components/buttons'

class PageRoot extends Component {
  _onClickLink = e => {
    const url = e.target.getAttribute('url')
    this.props.fire( 'APP_LINK', { url, callback: () => { this.props.history.push( url ) } } )
  }
  render() {
    return (
      <div className="page page--root h-100 d-flex flex-column justify-content-center align-items-center flex-wrap">
        <Button onClick={ this._onClickLink } url="/games/dontlaugh" color="#56CCF2" classes="w-50 h-50">
          DON'T<br/>LAUGH
        </Button>
        <Button onClick={ this._onClickLink } url="/games/speedygonzales" color="#F2C94C" classes="w-50 h-50">
          SPEEDY<br/>GONZALES
        </Button>
        <Button onClick={ this._onClickLink } url="/games/blowmeup" color="#BB6BD9" classes="w-50 h-50">
          BLOW<br/>ME UP
        </Button>
        <Button onClick={ this._onClickLink } url="/games/figaro" color="#EB5757" classes="w-50 h-50">
          FIGARO
        </Button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    app: state.app
  }
}

const mapDispatch = (dispatch) => {
  return {
      fire: (action, payload) => {
        dispatch(actions(action, payload))
      }
  }
}
export default connect( mapState, mapDispatch )( PageRoot )

