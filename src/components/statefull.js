import React, { Component } from 'react'

class StateFull extends Component {

  constructor(props) {
    super(props)
    this.state = {
      a: 0
    }
  }

  componentDidMount() {
    this.setState({ a: 1 })
  }

  render() {
    return ( 
      <div>
        <p>state.a = {this.state.a}</p>
      </div>
    )
  }
}

export default StateFull