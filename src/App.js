import React, { Component } from 'react';
import Clock from './components/Clock';
import DateBlock from './components/Date';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      size: this.calculateSize()
    };
  }

  calculateSize() {
    console.log(document.body.clientWidth);
    console.log(document.body.clientHeight);
    return (
      Math.min(document.body.clientWidth, document.body.clientHeight) * 3 / 4
    );
  }

  updateSize() {
    this.setState({ size: this.calculateSize() });
  }

  componentWillMount() {
    this.updateSize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize.bind(this));
  }

  render() {
    return (
      <div className="App">
        <Clock size={this.state.size} spacing={30} thickness={15} />
        <DateBlock weekdayColor="#FF9800" dateColor="#FFFFFF" />
      </div>
    );
  }
}

export default App;
