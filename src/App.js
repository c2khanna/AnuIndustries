import React, { Component } from 'react';
import './App.css';
var baseUrl = "https://www.anapioficeandfire.com/api/characters/?name="

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Whose info do you want?',
      requestFailed: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    var url = baseUrl + event.target.value;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          data: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  render() {
    if (this.state.data && Object.keys(this.state.data).length === 0) {
      return (
        <div>
          <label>
            Name:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <p>Continue typing</p>
        </div>
      )
    }
    else if (this.state.data && Object.keys(this.state.data).length !== 0){
      return(
        <div>
          <label>
            Name:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <p>{this.state.data[0].name}</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <label>
            Name:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
        </div>
      )
    }
  }
}

export default App;
