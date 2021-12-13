import React from 'react';
import PropTypes from 'prop-types';
import AddItem from '../AddItem';
import Counter from '../Counter';
import List from '../List';

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    console.log('ToDo constructor');
    this.state = {
      tasks: [],
      count: 0,
      fieldContent: '',
    };
  }

  componentDidUpdate() {
    console.log("ToDo update");
  }

  setMainState = (val) => {
    this.setState(val);
    console.log(this.state.fieldContent);
  }

  addTask = (e) => {
    e.preventDefault();
    /* we get input and tasks array from state */
    const { fieldContent, tasks } = this.state;
    /* define new state, setting id to current tasks array length */
    const newTask = {
      isChecked: false,
      newTask: fieldContent,
      id: tasks.length,
    };
    /* we copy the array and we add a new entry in array */
    const newTasksArray = [newTask, ...tasks];

    /* and we send task array to state */
    this.setState(() => ({ tasks: newTasksArray }));
    /* we update count */
    this.count();
    /* we sort ? */
  }

  count = () => {
    const { tasks } = this.state;
    /* we count pending tasks (not checked) */
    const count = tasks.filter((el) => el.isChecked === false).length;
    this.setState({ count });
  }

  checkTask = (isCheckedUpdated, id) => {
    const { tasks } = this.state;
    /* we copy tasks array */
    const newTasksArray = tasks.slice();
    /* we get task, grab its index */
    let index;
    const elem = tasks.find((el, i) => {
      if (el.id === id) {
        index = i;
        return true;
      };
      return false;
    });
    /* we modify task */
    elem.isChecked = isCheckedUpdated;
    console.log(elem);
    /* we replace task in array at task position in array */
    newTasksArray.splice(index, 1, elem);

    /* set state with new array */
    this.setState(() => ({ tasks: newTasksArray }));
    /* we update count */
    this.count();
    /*  */
  }

  render() {
    const { count, tasks, fieldContent } = this.state;
    return (
      <>
        <AddItem addTask={this.addTask} fieldContent={fieldContent} setMainState={this.setMainState} />
        <Counter count={count}>task(s) pending</Counter>
        <List tasks={tasks} checkTask={this.checkTask} />
      </>
    );
  }
}

ToDo.propTypes = PropTypes.shape({
  count: PropTypes.number.isRequired,
  fieldContent: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    {
      isChecked: PropTypes.bool.isRequired,
      newTask: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    },
  ).isRequired,
}).isRequired;
