import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from './redux/actions'

class App extends Component {
  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center p-5">
        <button className="btn btn-primary">primary</button>
        <button className="btn btn-warning">warning</button>
        <button className="btn btn-danger">danger</button>
        <button className="btn btn-success">success</button>
        <button className="btn btn">default</button>
        <button className="btn btn-link">link</button>
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
export default connect(mapState, mapDispatch)(App)

