import React from 'react';

// классовые компоненты - это старый подход, 
// сейчас рекомендуется использовать функциональные компоненты и хуки
class ClassCounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      value: ''
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  
  increment() {
    this.setState({
      likes: this.state.likes + 1,
      value: this.state.value + this.state.likes
    })
  }

  decrement() {
    this.setState({
      likes: this.state.likes - 1,
      value: this.state.value + this.state.likes
    })
  }

  setValue(val) {
    this.setState({
      value: this.state.value + val
    })
  }

  render() {
    return (
      <>
        <h1>{this.state.likes}</h1>
        <h1>{this.state.value}</h1>
        <input 
          type="text" 
          value={this.state.value} 
          onChange={event => this.setValue(event.target.value)} // двустороннее связывание
        />
        <button onClick={this.increment}>++</button>
        <button onClick={this.decrement}>--</button>
      </>
    );
  }
}

export default ClassCounter;
