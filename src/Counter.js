import React from 'react';

const COUNT_STEP = 1;

export default class Counter extends React.Component {
  static protoTypes = {};

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
    this.setState((prevState, props) => ({
      value: prevState.value + COUNT_STEP
    }), () => {
      this.timeout = setTimeout(this.handleTimeoutEvent.bind(this), 1000);
    });
  }

  render() {
    return (
      <div>
        <p> This is a counter: {this.state.value} </p>
      </div>
    );
  }
}
