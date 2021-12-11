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

  addTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input');
    const newTaskContent = input.value;

    /* we get tasks array from state */
    const { tasks } = this.state;
    /* define new state, setting id to current tasks array length */
    const newTask = {
      isChecked: false,
      newTask: newTaskContent,
      id: tasks.length,
    };
    /* we add a new entry in array */
    tasks.push(newTask);
    /* and we send task array to state */
    this.setState(() => ({ tasks }));
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
    /* we get task and modify it */
    const el = tasks.find((el) => el.id === id);
    el.isChecked = isCheckedUpdated;
    /* we replace element in array (at index el.id, one element, with modified) */
    tasks.splice(el.id, 1, el);
    /* set state with new array */
    this.setState(() => ({ tasks }));
    /* we update count */
    this.count();
  }

  render() {
    const { count, tasks, fieldContent } = this.state;
    return (
      <>
        <AddItem value="" addTask={this.addTask} fieldContent={fieldContent} />
        <Counter count={count}>task(s) pending</Counter>
        <List tasks={tasks} checkTask={this.checkTask} />
      </>
    );
  }
}

ToDo.propTypes = PropTypes.shape({
  count: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(
    {
      isChecked: PropTypes.bool.isRequired,
      newTask: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    },
  ).isRequired,
}).isRequired;
