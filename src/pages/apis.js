import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../redux/actions'
import { ButtonSuccess, ButtonDanger } from '../components/buttons'

class PageApis extends Component {
  constructor(){
    super()
    this.state = {
      email: 'mazzilli.andrea@gmail.com',
      password: '1234567890',
      serverLoginUrl: 'http://localhost:5000/user/login'
    }
  }
  _onChange = e => {
    const key = e.currentTarget.getAttribute( 'id' )
    const value = e.currentTarget.value
    const state = {}
    state[ key ] = value
    this.setState( state )
  }
  _login = e => {
    this.props.fire( 'API_POST', { 
      url: this.state.serverLoginUrl,
      body: { 
        email: this.state.email, 
        password: this.state.password
      },
      actions: {
        while: { type: '', payload: '' },
        error: { type: '', payload: '' },
        success: { type: 'USER_LOGGED_IN', payload: this.state.email }
      }
    })
  }
  _onCancelAllGetApi = () => {
    this.props.fire( 'API_STOP_ALL' )
  }
  render() {
    return (
      <div className="page page--info h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 ">
              <div className="d-flex flex-column justify-content-center flex-wrap">
                <input id="email" className="form-control" onChange={ this._onChange } type="email" value={ this.state.email } />
                <input id="password" className="form-control" onChange={ this._onChange } type="password" value={ this.state.password } />
                <input id="serverLoginUrl" className="form-control" onChange={ this._onChange } type="text" value={ this.state.serverLoginUrl } />
                <ButtonSuccess onClick={ this._login }>
                  login
                </ButtonSuccess><br/>
                <ButtonDanger onClick={ this._onCancelAllGetApi }>
                  stop all get api
                </ButtonDanger>
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
export default connect( mapState, mapDispatch )( PageApis )

