import React from 'react';
import { PropTypes } from 'prop-types';

import ListItem from '../ListItem';

export default class List extends React.Component {
  componentDidUpdate() {
    console.log('list update');
    const { tasks } = this.props;
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  render() {
    const { tasks, setTask } = this.props;
    return (
      <ul className="todo-list">
        {tasks.map((el) => (
          <ListItem {...el} key={el.id} setTask={setTask} />
        ))}
      </ul>
    );
  }
}

List.propTypes = PropTypes.shape({
  checkTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
}).isRequired;
