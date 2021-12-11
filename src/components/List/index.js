import React from 'react';
// import PropTypes

import ListItem from '../ListItem';

export default class List extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  render() {
    const { tasks, checkTask } = this.props;
    console.log(tasks);
    return (
      <ul>
        {tasks.map((el) => (
          <ListItem {...el} checkTask={checkTask} />
        ))}
      </ul>
    )
  }
}
