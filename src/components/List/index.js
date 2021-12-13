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
      if (a.isChecked === b.isChecked){// if same checked status
        if(a.isFav === b.isFav)return a.id - b.id; // if same fav status, sort ASC
        if (a.isFav && !b.isFav) return -1;// if a is fav and b is not, a and b keep position
        if (!a.isFav && b.isFav) return 1;// if b is fav and a is not, swap a and b
      }; 
      if (a.isChecked && !b.isChecked) return 1;// if b is unchecked, swap with a
      if (!a.isChecked && b.isChecked) return -1;// if a is unchecked, a and b keep position
    });
    console.timeEnd('test');
    return tmpTasks;
  }

  render() {
    const { tasks, setTask } = this.props;
    const test=[...tasks];
    console.log(test);
    const orderedTasks = this.sortTasks(tasks);
    console.log("rendering list", orderedTasks);
    return (
      <ul className="todo-list">
        {orderedTasks.map((el) => (
          <ListItem {...el} key={el.id} setTask={setTask} />
        ))}
      </ul>
    )
  }
}

List.propTypes = PropTypes.shape({
  checkTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
}).isRequired;
