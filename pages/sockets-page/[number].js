import React, { Component } from 'react'
import io from 'socket.io-client'
import routingWrapper from "../../components/routingWrapper"
import ChatOne from "../../components/sockets-test.js"
import ChatTwo from "../../components/sockets-test-2.js"

class WebSocketsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        socket: null,
    };
  }

  componentDidMount() {
    // connect to WS server and listen event
    const socket = io('http://localhost:3001', { transports: ["websocket"] })
    this.setState({ socket })
  }

  // close socket connection
  componentWillUnmount() {
    this.state.socket.close()
  }

  render() {
    const { number } = this.props.router.query

    if (number == 1)
      return <ChatOne {...this.props} socket={this.state.socket} />
    else
      return <ChatTwo {...this.props} socket={this.state.socket} />
  }
}

export default routingWrapper(WebSocketsPage);