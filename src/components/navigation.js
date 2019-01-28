import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import { withRouter } from "react-router-dom"

const NavigationLink = ({ url, onClick, children }) => (
  <div url={ url } className="navigation__link btn btn-link p-2 d-flex justify-content-center align-items-center" onClick={ onClick }>{ children }</div>
)
class Navigation extends Component {
  _onClickLink = e => {
    const url = e.target.getAttribute('url')
    this.props.fire( 'APP_LINK', { url, callback: () => { this.props.history.push( url ) } } )
  }
  render() {
    return ( 
      <div className="navigation d-flex align-items-center justify-content-center">
        <NavigationLink onClick={ this._onClickLink } url="/">home</NavigationLink>
      </div>
    )
  }
}

const mapState = state => {
  return {
      app: state.app
  }
}

const mapDispatch = dispatch => {
  return {
      fire: ( action, payload ) => {
          dispatch( actions( action, payload ) )
      }
  }
}
export default connect( mapState, mapDispatch )( withRouter( Navigation ) )

