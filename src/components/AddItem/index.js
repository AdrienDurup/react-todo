/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

export default class AddItem extends React.Component {
  reset = '';

  componentDidUpdate() {
    // const { clearField } = this.props;
    // clearField();
    console.log("AddItemODM did update");
  }

  updateValInState = (e) => {
    const { setMainState } = this.props;
    setMainState({
      fieldContent: e.target.value,
    });
  }

  clearFieldAndAddTask = (e) => {
    e.preventDefault();
    /* execute addTask on ToDo Component */
    const { addTask } = this.props;
    addTask(e);
    /* reset input */
    const { setMainState } = this.props;
    setMainState({
      fieldContent: '',
    });
  }

  render() {
    const { fieldContent } = this.props;
    return (
      <form className="todo-form" onSubmit={this.clearFieldAndAddTask}>
        <input type="text" placeholder="add a task" onChange={this.updateValInState} value={fieldContent} />
      </form>
    );
  }
}

AddItem.propTypes = {
  fieldContent: PropTypes.string.isRequired,
};
