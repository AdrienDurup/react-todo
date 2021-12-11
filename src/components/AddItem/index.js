/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

export default class AddItem extends React.Component {
  reset = '';
  constructor(props) {
    super(props);
  }

  // componentDidUpdate() {
  //   console.log("update");
  //   thes.
  //   const { clearField } = this.props;
  //   clearField();
  // }

  render() {
    const { addTask, fieldContent } = this.props;
    return (
      <form onSubmit={addTask}>
        <input type="text" placeholder="add a task" name="newTaskContent" />
      </form>
    );
  }
}

// AddItem.propTypes={
// };
