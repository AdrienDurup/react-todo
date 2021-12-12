import React from 'react';
import { PropTypes } from 'prop-types';

import ListItem from '../ListItem';

export default class List extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  sortTasks = (tasks) => {
    console.time('test');
    const tmpTasks = tasks.slice();
    tmpTasks.sort((a, b) => {
      if (a.isChecked === b.isChecked) return a.id - b.id; // if same checked status, sort ASC
      if (a.isChecked && !b.isChecked) return 1;// if b is unchecked, swap with a
      if (!a.isChecked && b.isChecked) return -1;// if a is unchecked, a and b keep position
    });
    console.timeEnd('test');
    return tmpTasks;
  }

  render() {
    const { tasks, checkTask } = this.props;
    const orderedTasks = this.sortTasks(tasks);
    console.log("rendering list", orderedTasks);
    return (
      <ul className="todo-list">
        {orderedTasks.map((el) => (
          <ListItem {...el} checkTask={checkTask} key={el.id} />
        ))}
      </ul>
    )
  }
}

List.propTypes = PropTypes.shape({
  checkTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
}).isRequired;
