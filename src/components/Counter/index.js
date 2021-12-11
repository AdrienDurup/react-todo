import React from 'react';

export default class Counter extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { count, children } = this.props;
    return <div className="todo-counter">{count + ' ' + children}</div>
  }
}
