import React, { Component } from 'react';
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

  // this.clearField
  // componentDidUpdate() {
  //   this.setState({ fieldContent: '' });
  // }

  addTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    console.log(data['newTaskContent']);
    const { newTaskContent } = data;
    console.log('newTaskContent', newTaskContent);
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
    /* we count entries */
    const count = tasks.length;
    /* and we send task array to state */
    this.setState(() => ({ tasks, count }));
  }

  checkTask = (e) => {
    const isChecked = e.target.value;
    this.setState(() => ({ isChecked }));
  }

  render() {
    const { count, tasks,fieldContent } = this.state;
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
