import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg';
import './App.css';

class App extends Component {
  goNext = () => {
    this.props.history.push('/next')
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.goNext}>Next</button>
        <Link to='/next'>GO</Link>
      </div>
    );
  }
}

export default App
