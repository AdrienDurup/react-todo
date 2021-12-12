import React from 'react';
// import PropTypes

export default class ListItem extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  handleCheckbox = (e) => {
    const { checkTask, isChecked, id } = this.props;
    /* we update view */
    e.target.checked = !isChecked;
    console.log(e.target.checked);
    /* we execute checkTask in ToDo comp, toggling isChecked */
    checkTask(!isChecked, id);
  }

  render() {
    const { newTask, isChecked } = this.props;
    console.log('OK', newTask);
    return (
      <li className={isChecked ? 'todo-item todo-item--checked' : 'todo-item'}>
        <input type="checkbox" className="todo-item__checkbox" checked={isChecked} onChange={this.handleCheckbox} />{newTask}
      </li>
    )
  }
}
