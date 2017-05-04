import React from 'react';

const COUNT_STEP = 10;

export default class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  componentDidMount() {
    this.timeout = setTimeout(this.handleTimeoutEvent.bind(this), 1000);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  handleTimeoutEvent() {
    this.setState({value: this.state.value + COUNT_STEP}, () => {
      this.timeout = setTimeout(this.handleTimeoutEvent.bind(this), 1000);
    });
  }

  render() {
    return (
      <div>
        <p> This is a counter1: {this.state.value} </p>
      </div>
    );
  }
}
