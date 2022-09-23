import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <pre>state = {JSON.stringify(this.state, undefined, '  ')}</pre>
      </div>
    );
  }
  componentDidMount() {
    fetch('/test').then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({res});
    }).catch((err) => {
      this.setState({err});
    });
  }
}

export default App;
