/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

export default class AddItem extends React.Component {
  reset = '';
  // constructor(props) {
  //   super(props);
  // }

  componentDidUpdate() {
    // const { clearField } = this.props;
    // clearField();
    console.log("AddItemODM did update");
  }

  clearFieldAndAddTask = (e) => {
    e.preventDefault();
    /* execute addTask on ToDo Component */
    const { addTask } = this.props;
    addTask(e);
    /* reset input */
    const form = e.target;
    const input = form.querySelector('input');
    input.value = '';
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.clearFieldAndAddTask}>
        <input type="text" placeholder="add a task" />
      </form>
    );
  }
}

// AddItem.propTypes={
// };
