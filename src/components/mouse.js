import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import { withRouter } from "react-router-dom"

class Mouse extends Component {
  render() {
    const { left, top, event } = this.props.mouse
    return ( 
      <div className={`mouse ${ event ? 'mouse--' + event : '' }`} style={{ left, top }}/>
    )
  }
}

const mapState = state => {
  return {
      app: state.app,
      mouse: state.mouse.toJS()
  }
}

const mapDispatch = dispatch => {
  return {
      fire: ( action, payload ) => {
          dispatch( actions( action, payload ) )
      }
  }
}
export default connect( mapState, mapDispatch )( withRouter( Mouse ) )

