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
      isFav: false,
      tasks: [],
      count: 0,
      fieldContent: '',
    };
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.setState({ tasks });
  }

  componentDidUpdate() {
    console.log("ToDo update");
  }

  setMainState = (val) => {
    console.log(val);
    this.setState(val);
  }


  addTask = (e) => {
    e.preventDefault();
    /* we get input and tasks array from state */
    const { fieldContent, tasks } = this.state;
    if (!fieldContent) return;
    /* define new state, setting id to current tasks array length */
    const newTask = {
      isChecked: false,
      isFav: false,
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

  setTask = (id, obj) => {
    const { tasks } = this.state;

    console.time('test');
    /*  */
    const newTasksArray = tasks.map((el) => {
      if (el.id === id) {/* if element is the one we want modify */
        /* we modify element for each property of argument object "obj" */
        for (const key in obj) {
          el[key] = obj[key];
        };
      }
      return el;/* return element */
    });
    console.timeEnd('test');

    /* set state with new array */
    this.setState(() => ({ tasks: newTasksArray }));

    /* we update count */
    this.count();
    /*  */
  }

  sortTasks = () => {
    const tmpTasks = [...this.state.tasks];
    tmpTasks.sort((a, b) => {
      if (a.isChecked === b.isChecked) {// if same checked status
        if (a.isFav === b.isFav) return a.id - b.id; // if same fav status, sort ASC
        if (a.isFav && !b.isFav) return -1;// if a is fav and b is not, a and b keep position
        if (!a.isFav && b.isFav) return 1;// if b is fav and a is not, swap a and b
      };
      if (a.isChecked && !b.isChecked) return 1;// if b is unchecked, swap with a
      if (!a.isChecked && b.isChecked) return -1;// if a is unchecked, a and b keep position
    });
    return tmpTasks;
  }

  render() {
    const { count, fieldContent } = this.state;
    return (
      <>
        <AddItem addTask={this.addTask} fieldContent={fieldContent} setMainState={this.setMainState} />
        <Counter count={count}>task(s) pending</Counter>
        <List tasks={this.sortTasks()} setTask={this.setTask} />
      </>
    );
  }
}

ToDo.propTypes = PropTypes.shape({
  count: PropTypes.number.isRequired,
  fieldContent: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    {
      isFav: PropTypes.bool.isRequired,
      isChecked: PropTypes.bool.isRequired,
      newTask: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    },
  ).isRequired,
}).isRequired;
